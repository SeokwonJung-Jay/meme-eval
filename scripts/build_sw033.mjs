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

function lineDiff(prev, curr) {
  // Returns added lines (in curr but not prev) and removed lines.
  // Uses multiset semantics on line strings.
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

function countGoldChars(snapshot, goldValuesUpToHere) {
  // For each line, if it substring-matches any gold value, count its chars.
  // De-dup at line level.
  if (!snapshot || !goldValuesUpToHere.length) return 0;
  let total = 0;
  for (const line of snapshot.split("\n")) {
    if (!line) continue;
    for (const v of goldValuesUpToHere) {
      if (!v) continue;
      // case-insensitive substring
      if (line.toLowerCase().includes(v.toLowerCase())) {
        total += line.length;
        break;
      }
    }
  }
  return total;
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

  // Build per-session gold_values cumulative — pulled from each session's gold_facts list
  const sessionGoldValuesCumulative = []; // array of arrays of values up to and including i
  const cumulative = [];
  for (let i = 0; i < ep.sessions.length; i++) {
    const sess = ep.sessions[i];
    const facts = sess.gold_facts ?? [];
    for (const f of facts) {
      const v = f.value;
      if (Array.isArray(v)) for (const x of v) cumulative.push(x);
      else if (v) cumulative.push(v);
    }
    sessionGoldValuesCumulative.push([...cumulative]);
  }

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
      gold_facts: (sess.gold_facts ?? []).map((f) => ({
        entity: f.entity,
        value: f.value,
        fact_text: f.fact_text,
        conveyed_in_turn: f.conveyed_in_turn ?? null,
        notes: f.notes ?? null,
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

    // Compute per-session diff (added lines) and gold-fact char count + size series
    const diffPerSession = [];
    const sizeSeries = [];
    const goldCharsSeries = [];
    for (let i = 0; i < snaps.length; i++) {
      const prev = i === 0 ? "" : snaps[i - 1];
      const curr = snaps[i];
      const { added, removed } = lineDiff(prev, curr);
      diffPerSession.push({ added, removed });
      sizeSeries.push(curr.length);
      goldCharsSeries.push(countGoldChars(curr, sessionGoldValuesCumulative[i]));
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
        // Externalize large retrieved_context
        const ctx = d.retrieved_context ?? "";
        const tag = (d.task_type ?? `q${idx}`).replace(/[^\w-]+/g, "_");
        const ctxFile = `${sysLabel}_${phase}_${tag}.txt`;
        if (ctx) writeText(join(PUBLIC_RETR, ctxFile), ctx);
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
        };
      });

    resultsPerSystem[sysLabel] = {
      after: buildResults(judge.u_check.after.details, "after"),
      before: buildResults(judge.u_check.before?.details ?? [], "before"),
    };
  }

  // Friendly labels for systems
  const systemLabels = {
    bm25: { name: "BM25", internalLLM: "gpt-4.1-mini", featured: false },
    dense: { name: "Dense", internalLLM: "gpt-4.1-mini", featured: false },
    graphiti: { name: "Graphiti", internalLLM: "gpt-4.1-mini", featured: false },
    karpathy: { name: "Karpathy", internalLLM: "gpt-4.1-mini", featured: false },
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
