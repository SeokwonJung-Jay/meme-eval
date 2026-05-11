// Build sw_033 walkthrough data: combine episode + per-system agent/judge files
// into one JSON consumed by the page.
//
// Output: src/data/sw033.json

import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..");
const PAGE_ROOT = resolve(__dirname, "..");
const OUT = resolve(PAGE_ROOT, "src", "data", "sw033.json");
// Large text payloads (full snapshots, retrieved contexts) are written to public/
// and fetched on demand from the page.
const PUBLIC_SNAP = resolve(PAGE_ROOT, "public", "sw033", "snap");
const PUBLIC_RETR = resolve(PAGE_ROOT, "public", "sw033", "retr");

const EPISODE_PATH = join(
  REPO_ROOT,
  "data/v7_100/filler32k_10rand/filler_sw/episode_033.json",
);
const MAIN_BASE = join(
  REPO_ROOT,
  "data/v7_100/results/systems_gpt41mini/filler32k_ansMini",
);
const OPUS_BASE = join(REPO_ROOT, "data/v7_100/results/systems_opus47/filler32k");

const SYSTEMS_MAIN = ["bm25", "dense", "graphiti", "karpathy", "md_file", "mem0"];
const OPUS_SYS = "md_file"; // only md_file × Opus is featured

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf-8"));
}

// ─── Token-level matcher (paraphrase-robust) ──────────────────────────
const STOPWORDS = new Set([
  "a","an","the","is","are","was","were","be","been","being",
  "of","to","in","on","at","and","or","but","for","with",
  "our","my","your","his","her","its","their","this","that","these","those",
  "i","you","we","they","it","user","team",
  "have","has","had","as","by","from","into","onto",
  "will","would","can","could","should","may","might",
  "do","does","did","not","no",
]);
function tokenize(s) {
  if (!s) return [];
  return s.toLowerCase().replace(/[^\w\s]/g, " ").split(/\s+/).filter(
    (w) => w && !STOPWORDS.has(w) && w.length > 1,
  );
}
function tokenSet(s) { return new Set(tokenize(s)); }
function containment(goldSet, candSet) {
  if (goldSet.size === 0) return 0;
  let n = 0;
  for (const t of goldSet) if (candSet.has(t)) n++;
  return n / goldSet.size;
}
const MATCH_THRESHOLD = 0.6;
function lineMatchesValue(line, valueTok, threshold = MATCH_THRESHOLD) {
  if (valueTok.size === 0) return false;
  return containment(valueTok, tokenSet(line)) >= threshold;
}
function textHasValue(text, valueTok, threshold = MATCH_THRESHOLD) {
  if (!text) return false;
  for (const line of text.split("\n")) {
    if (line && lineMatchesValue(line, valueTok, threshold)) return true;
  }
  return false;
}

// Multi-line-aware match: gold's full token set against the whole text's token set.
// Useful for verbatim payloads that span multiple lines (e.g. error_log).
function textHasValueBulk(text, valueTok, threshold = MATCH_THRESHOLD) {
  if (!text || valueTok.size === 0) return false;
  return containment(valueTok, tokenSet(text)) >= threshold;
}

// Deletion semantics: a "delete event" is encoded in the store if any line mentions
// the relevant value (preferred — unique) or entity along with a deletion keyword.
const DELETION_KEYWORDS = ["delete", "deleted", "deleting", "remove", "removed", "removing", "no longer", "discard"];
function hasDeletionEvent(text, entityTok, valueToks) {
  if (!text) return false;
  for (const line of text.split("\n")) {
    if (!line) continue;
    const low = line.toLowerCase();
    if (!DELETION_KEYWORDS.some((kw) => low.includes(kw))) continue;
    const lTok = tokenSet(line);
    for (const vt of valueToks ?? []) {
      if (vt.size > 0 && containment(vt, lTok) >= 0.5) return true;
    }
    if (entityTok && entityTok.size > 0 && containment(entityTok, lTok) >= 0.6) return true;
  }
  return false;
}

function lineDiff(prev, curr) {
  const prevLines = (prev ?? "").split("\n");
  const currLines = (curr ?? "").split("\n");
  const prevCount = new Map();
  for (const ln of prevLines) prevCount.set(ln, (prevCount.get(ln) ?? 0) + 1);
  const added = [];
  for (const ln of currLines) {
    const c = prevCount.get(ln) ?? 0;
    if (c > 0) prevCount.set(ln, c - 1);
    else added.push(ln);
  }
  const removed = [];
  for (const [ln, c] of prevCount) if (c > 0) for (let i = 0; i < c; i++) removed.push(ln);
  return { added, removed };
}

// Token-level gold-fact char count: a line counts if any gold token-set
// has containment ≥ threshold in that line's token-set.
function countGoldChars(snapshot, goldTokenSets) {
  if (!snapshot || !goldTokenSets.length) return 0;
  let total = 0;
  for (const line of snapshot.split("\n")) {
    if (!line) continue;
    const lTok = tokenSet(line);
    for (const gSet of goldTokenSets) {
      if (containment(gSet, lTok) >= MATCH_THRESHOLD) {
        total += line.length;
        break;
      }
    }
  }
  return total;
}

// Annotate each line with the set of task tags whose gold value matches it.
// Each fact may carry multiple tags (e.g. cascade root → Cas + Abs).
function annotateLines(lines, cumFactsWithTok) {
  return lines.map((text) => {
    if (!text) return { text, tags: [] };
    const tags = new Set();
    const lTok = tokenSet(text);
    for (const f of cumFactsWithTok) {
      if (containment(f.tok, lTok) >= MATCH_THRESHOLD) {
        for (const t of f.tags ?? []) tags.add(t);
      }
    }
    return { text, tags: [...tags] };
  });
}

function loadAgent(base, sys) {
  const p = `${base}/${sys}/agent/agent_sw_033_${sys}_claude-sonnet-4-20250514.json`;
  if (!existsSync(p)) throw new Error(`missing: ${p}`);
  return readJson(p);
}

function loadJudge(base, sys) {
  const p = `${base}/${sys}/judge/eval_sw_033_${sys}_claude-sonnet-4-20250514_gpt-4o.json`;
  if (!existsSync(p)) throw new Error(`missing: ${p}`);
  return readJson(p);
}

function buildSystem(systemKey, agent, judge) {
  const ingestLogs = agent.ingest_logs; // 17 entries
  const snapshots = ingestLogs.map((e) =>
    typeof e.memory_snapshot === "string"
      ? e.memory_snapshot
      : JSON.stringify(e.memory_snapshot ?? "", null, 2),
  );

  // Gold values cumulative (from agent.gold_facts; entries have "value" string or array)
  // Map: which session index introduces each fact (from episode conveyed_in_turn / per-session gold_facts)
  // We'll compute "gold values active up to and including session i" from sessions[*].gold_facts.

  // We do not have per-session bucket in agent file (gold_facts is a flat list); pull from episode.
  return { snapshots, judge };
}

function ensureCleanDir(p) {
  if (existsSync(p)) rmSync(p, { recursive: true, force: true });
  mkdirSync(p, { recursive: true });
}

function writeText(path, text) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, text);
}

function main() {
  const ep = readJson(EPISODE_PATH);

  // Entity → set of task tags. Built from both before- and after-questions, plus
  // the episode's cascade root (which influences every cascaded entity).
  const TAG_MAP_SHORT = {
    Exact: "ER", "Multi-hop": "Agg", "Multiple-update": "Tr",
    Deletion: "Del", "Cascade-D (1-hop)": "Cas", "Cascade-U (1-hop)": "Abs",
    "Deletion (before delete)": "Del", "Exact (exact recall)": "ER",
    ER: "ER", Agg: "Agg", Tr: "Tr", Del: "Del", Cas: "Cas", Abs: "Abs",
  };
  const entityToTask = {}; // entity -> Set<tag>
  const addEntity = (entity, tag) => {
    if (!entity || !tag) return;
    if (!entityToTask[entity]) entityToTask[entity] = new Set();
    entityToTask[entity].add(tag);
  };
  for (const q of ep.after_questions?.questions ?? []) {
    const tag = TAG_MAP_SHORT[q.task_type] ?? q.task_type;
    for (const e of q.entity ?? []) addEntity(e, tag);
  }
  for (const q of ep.before_questions?.questions ?? []) {
    const tag = TAG_MAP_SHORT[q.task_type] ?? q.task_type;
    for (const e of q.entity ?? []) addEntity(e, tag);
  }
  // Cascade root entity (e.g., team_lead) flows into Cas (downstream) + Abs (upstream uncertainty).
  if (ep.root) {
    addEntity(ep.root, "Cas");
    addEntity(ep.root, "Abs");
  }

  // Build cumulative gold-fact list per session — only entities that map to at least one task tag.
  const cumFactsByIdx = [];
  const cumFacts = [];
  for (let i = 0; i < ep.sessions.length; i++) {
    const facts = ep.sessions[i].gold_facts ?? [];
    for (const f of facts) {
      const tags = entityToTask[f.entity];
      if (!tags || tags.size === 0) continue;
      const tagList = [...tags];
      const vals = Array.isArray(f.value) ? f.value : [f.value];
      for (const v of vals) {
        if (!v) continue;
        cumFacts.push({ entity: f.entity, value: v, tags: tagList, tok: tokenSet(v) });
      }
    }
    cumFactsByIdx.push([...cumFacts]);
  }
  const sessionGoldTokenSetsCumulative = cumFactsByIdx.map((arr) => arr.map((f) => f.tok));

  // Probe positions
  const beforeIdx = ep.before_questions.position_after_session; // 13
  const afterIdx = ep.after_questions.position_after_session; // 16

  // Build sessions list
  const sessions = ep.sessions.map((sess, i) => {
    let kind = "filler";
    if (ep.evidence_session_indices.includes(i)) kind = "evidence";
    if (i === beforeIdx) kind = "probe-before";
    if (i === afterIdx) kind = "probe-after";
    return {
      idx: i,
      kind,
      timestamp: sess.timestamp ?? null,
      evidence_type: sess.evidence_type ?? null,
      conversation: (sess.conversation ?? []).map((t) => ({
        role: t.role,
        content: t.content,
      })),
      // Filter out distractor facts (entity not evaluated in any question).
      // Cascade root (e.g., team_lead) is kept via entityToTask mapping above.
      gold_facts: (sess.gold_facts ?? [])
        .filter((f) => entityToTask[f.entity] && entityToTask[f.entity].size > 0)
        .map((f) => ({
          entity: f.entity,
          value: f.value,
          fact_text: f.fact_text,
          conveyed_in_turn: f.conveyed_in_turn ?? null,
          notes: f.notes ?? null,
          tags: [...entityToTask[f.entity]],
        })),
    };
  });

  // Build snapshots/results per system
  const allSystems = [...SYSTEMS_MAIN, `${OPUS_SYS}_opus`];
  const snapshotsPerSystem = {};
  const seriesPerSystem = {};
  const resultsPerSystem = {};

  // Prepare external dirs for lazy-loaded heavy text
  ensureCleanDir(PUBLIC_SNAP);
  ensureCleanDir(PUBLIC_RETR);

  for (const sysLabel of allSystems) {
    const isOpus = sysLabel.endsWith("_opus");
    const sys = isOpus ? OPUS_SYS : sysLabel;
    const base = isOpus ? OPUS_BASE : MAIN_BASE;
    const agent = loadAgent(base, sys);
    const judge = loadJudge(base, sys);

    const snaps = agent.ingest_logs.map((e) =>
      typeof e.memory_snapshot === "string"
        ? e.memory_snapshot
        : JSON.stringify(e.memory_snapshot ?? "", null, 2),
    );

    // Compute per-session diff (added/removed lines) with task-tag annotations + size/gold series
    const diffPerSession = [];
    const sizeSeries = [];
    const goldCharsSeries = [];
    for (let i = 0; i < snaps.length; i++) {
      const prev = i === 0 ? "" : snaps[i - 1];
      const curr = snaps[i];
      const { added, removed } = lineDiff(prev, curr);
      const facts = cumFactsByIdx[i];
      diffPerSession.push({
        added: annotateLines(added, facts),
        removed: annotateLines(removed, facts),
      });
      sizeSeries.push(curr.length);
      goldCharsSeries.push(countGoldChars(curr, sessionGoldTokenSetsCumulative[i]));
    }

    // Write each full snapshot as separate text file for lazy load
    snaps.forEach((s, i) => {
      writeText(join(PUBLIC_SNAP, sysLabel, `${i}.txt`), s);
    });

    snapshotsPerSystem[sysLabel] = {
      // diff arrays kept inline (small per session)
      diff: diffPerSession,
    };
    seriesPerSystem[sysLabel] = { size: sizeSeries, gold: goldCharsSeries };

    // Results — pull u_check.after.details and u_check.before.details
    const buildResults = (details, phase) =>
      details.map((d, idx) => {
        const ctx = d.retrieved_context ?? "";
        const tag = (d.task_type ?? `q${idx}`).replace(/[^\w-]+/g, "_");
        const ctxFile = `${sysLabel}_${phase}_${tag}.txt`;
        if (ctx) writeText(join(PUBLIC_RETR, ctxFile), ctx);

        // ── Pipeline-stage failure analysis ────────────────────────────
        const taskTag = TAG_MAP_SHORT[d.task_type] ?? d.task_type;
        const isER = taskTag === "ER";
        const isDel = taskTag === "Del";

        const probeValues = [];
        for (const v of Object.values(d.entity_values ?? {})) {
          if (Array.isArray(v)) probeValues.push(...v.filter(Boolean));
          else if (v) probeValues.push(v);
        }
        if (typeof d.gold_answer === "string" && d.gold_answer) probeValues.push(d.gold_answer);
        if (typeof d.expected_answer === "string" && d.expected_answer) probeValues.push(d.expected_answer);
        const valTokens = probeValues.map((v) => tokenSet(v)).filter((s) => s.size > 0);
        const entityTokens = (d.entity ?? []).map((e) => tokenSet(e)).filter((s) => s.size > 0);

        const probeIdx = phase === "before" ? beforeIdx : afterIdx;
        const probeSnap = snaps[probeIdx] ?? "";

        // Whole-text token-set containment (handles multi-line payloads like error_log).
        const hasValue = (text) =>
          valTokens.some((vt) => isER ? textHasValueBulk(text, vt) : textHasValue(text, vt));
        // For deletion in the AFTER phase, mention of the value/entity with a deletion verb counts.
        const hasDelEvent = (text) =>
          entityTokens.some((et) => hasDeletionEvent(text, et, valTokens));

        // Del semantics differ by phase:
        //   before → gold is the original value (general matching).
        //   after  → gold is "deletion happened" (deletion-event matching).
        const isDelAfter = isDel && phase === "after";

        let encoded = false;
        if (isDelAfter) {
          for (let i = 0; i <= probeIdx; i++) {
            if (hasDelEvent(snaps[i])) { encoded = true; break; }
          }
        } else {
          for (let i = 0; i <= probeIdx; i++) {
            if (hasValue(snaps[i])) { encoded = true; break; }
          }
        }

        const maintained = isDelAfter ? hasDelEvent(probeSnap) : hasValue(probeSnap);
        const retrieved = isDelAfter ? hasDelEvent(ctx) : hasValue(ctx);

        const answered = !!d.u_pass;

        let failure_stage = null;
        if (!encoded) failure_stage = "encoding";
        else if (!maintained) failure_stage = "maintenance";
        else if (!retrieved) failure_stage = "retrieval";
        else if (!answered) failure_stage = "answering";

        return {
          task_type: d.task_type,
          question: d.question,
          gold_answer: d.gold_answer ?? d.expected_answer ?? "",
          agent_answer: d.agent_answer ?? "",
          u_pass: !!d.u_pass,
          u_reason: d.u_reason ?? "",
          retrieved_context_file: ctx ? ctxFile : null,
          retrieved_context_chars: ctx.length,
          entity: d.entity ?? [],
          entity_values: d.entity_values ?? {},
          pass_type: d.pass_type ?? null,
          failure_analysis: { encoded, maintained, retrieved, answered, failure_stage },
        };
      });

    resultsPerSystem[sysLabel] = {
      after: buildResults(judge.u_check.after.details, "after"),
      before: buildResults(judge.u_check.before?.details ?? [], "before"),
    };
  }

  // Friendly labels for systems — kept in sync with paper Table 2.
  const systemLabels = {
    bm25: { name: "BM25", internalLLM: "gpt-4.1-mini", featured: false },
    dense: { name: "text-emb-3-small", internalLLM: "gpt-4.1-mini", featured: false },
    graphiti: { name: "Graphiti", internalLLM: "gpt-4.1-mini", featured: false },
    karpathy: { name: "Karpathy Wiki", internalLLM: "gpt-4.1-mini", featured: false },
    md_file: { name: "MD-flat", internalLLM: "gpt-4.1-mini", featured: false },
    mem0: { name: "Mem0", internalLLM: "gpt-4.1-mini", featured: false },
    md_file_opus: {
      name: "MD-flat × Opus 4.7",
      internalLLM: "claude-opus-4-7",
      featured: true,
    },
  };

  // Task display order for result grid
  const taskOrder = ["ER", "Agg", "Tr", "Del", "Cas", "Abs"];
  // Map judge task_type to display tag
  const taskTagMap = {
    Exact: "ER",
    "Multi-hop": "Agg",
    "Multiple-update": "Tr",
    Deletion: "Del",
    "Cascade-D (1-hop)": "Cas",
    "Cascade-U (1-hop)": "Abs",
  };

  // Build the result grid: [task][system] -> {u_pass, agent_answer, gold_answer, u_reason, question, retrieved_context}
  const grid = {};
  for (const tag of taskOrder) grid[tag] = {};
  for (const sysLabel of allSystems) {
    const after = resultsPerSystem[sysLabel].after;
    for (const r of after) {
      const tag = taskTagMap[r.task_type] ?? r.task_type;
      grid[tag][sysLabel] = r;
    }
  }

  const out = {
    episode: {
      id: ep.episode_id,
      tag: "sw_033",
      domain: ep.domain,
      root: ep.root,
      total_sessions: ep.total_sessions,
      evidence_sessions: ep.evidence_sessions,
      filler_sessions: ep.filler_sessions,
      total_tokens: ep.total_tokens,
      evidence_session_indices: ep.evidence_session_indices,
      probe_before_idx: beforeIdx,
      probe_after_idx: afterIdx,
      probe_before_timestamp: ep.before_questions.timestamp,
      probe_after_timestamp: ep.after_questions.timestamp,
    },
    sessions,
    systems: allSystems,
    systemLabels,
    snapshots: snapshotsPerSystem,
    series: seriesPerSystem,
    results: resultsPerSystem,
    grid,
    taskOrder,
    taskTagMap,
  };

  writeFileSync(OUT, JSON.stringify(out));
  const kb = Math.round(readFileSync(OUT).length / 1024);
  console.log(`✔ wrote ${OUT} (${kb} KB)`);
}

main();
