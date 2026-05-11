// Audit the auto-generated annotations and failure analyses in sw033.json.
// Lists per-task line tagging counts + samples, and per-system × per-task
// pipeline-stage outcomes so the human can sanity-check before committing.

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PAGE_ROOT = resolve(__dirname, "..");
const IN = resolve(PAGE_ROOT, "src", "data", "sw033.json");
const OUT_MD = resolve(PAGE_ROOT, "audit_sw033.md");

const data = JSON.parse(readFileSync(IN, "utf-8"));
const { episode, sessions, systems, systemLabels, snapshots, series, results } = data;

const taskOrder = ["ER", "Agg", "Tr", "Del", "Cas", "Abs"];
const tagMapShort = {
  Exact: "ER", "Multi-hop": "Agg", "Multiple-update": "Tr",
  Deletion: "Del", "Cascade-D (1-hop)": "Cas", "Cascade-U (1-hop)": "Abs",
  "Deletion (before delete)": "Del", "Exact (exact recall)": "ER",
  ER: "ER", Agg: "Agg", Tr: "Tr", Del: "Del", Cas: "Cas", Abs: "Abs",
};

const lines = [];
const log = (s = "") => lines.push(s);

log(`# sw_033 auto-annotation audit\n`);
log(`Source: ${IN}`);
log(`Episode: ${episode.tag} · ${episode.domain} · ${episode.total_sessions} sessions`);
log(`Systems: ${systems.join(", ")}`);
log(`Probe before / after session: ${episode.probe_before_idx} / ${episode.probe_after_idx}`);
log("");

// ─── 1. Per-system, per-session diff annotation summary ───────────────
log(`## 1. Annotation counts (added lines per session × task tag)\n`);
for (const sys of systems) {
  log(`### ${systemLabels[sys]?.name ?? sys} (${sys})`);
  log("");
  // Header
  const head = ["session", "kind", "added_total", ...taskOrder.map((t) => `+${t}`), "removed_total"];
  log(`| ${head.join(" | ")} |`);
  log(`| ${head.map(() => "---").join(" | ")} |`);
  const diff = snapshots[sys].diff;
  for (let i = 0; i < diff.length; i++) {
    const sess = sessions[i];
    const added = diff[i].added ?? [];
    const removed = diff[i].removed ?? [];
    const taggedByTask = Object.fromEntries(taskOrder.map((t) => [t, 0]));
    for (const ln of added) for (const t of ln.tags ?? []) if (t in taggedByTask) taggedByTask[t]++;
    const row = [
      i,
      sess.kind,
      added.length,
      ...taskOrder.map((t) => taggedByTask[t]),
      removed.length,
    ];
    log(`| ${row.join(" | ")} |`);
  }
  log("");
}

// ─── 2. Sample annotated lines (first 3 per task per system) ──────────
log(`## 2. Sample annotated lines (first 3 per task per system)\n`);
for (const sys of systems) {
  log(`### ${systemLabels[sys]?.name ?? sys}`);
  log("");
  const samplesPerTask = Object.fromEntries(taskOrder.map((t) => [t, []]));
  for (let i = 0; i < snapshots[sys].diff.length; i++) {
    for (const ln of snapshots[sys].diff[i].added ?? []) {
      for (const t of ln.tags ?? []) {
        if (samplesPerTask[t] && samplesPerTask[t].length < 3) {
          samplesPerTask[t].push({ session: i, text: ln.text });
        }
      }
    }
  }
  for (const t of taskOrder) {
    const ss = samplesPerTask[t];
    if (!ss.length) {
      log(`- **${t}**: _no lines tagged_`);
      continue;
    }
    log(`- **${t}** (${ss.length} shown):`);
    for (const s of ss) {
      const txt = (s.text || "").replace(/\s+/g, " ").slice(0, 160);
      log(`    - [s${s.session}] \`${txt}\``);
    }
  }
  log("");
}

// ─── 3. Pipeline-stage outcomes ───────────────────────────────────────
log(`## 3. Pipeline-stage outcomes per system × question\n`);
for (const phase of ["before", "after"]) {
  log(`### ${phase}-questions\n`);
  const head = ["system", "task", "encoded", "maintained", "retrieved", "answered", "failure_stage"];
  log(`| ${head.join(" | ")} |`);
  log(`| ${head.map(() => "---").join(" | ")} |`);
  for (const sys of systems) {
    for (const q of results[sys][phase] ?? []) {
      const tag = tagMapShort[q.task_type] ?? q.task_type;
      const fa = q.failure_analysis ?? {};
      log(
        `| ${systemLabels[sys]?.name ?? sys} | ${tag} | ${b(fa.encoded)} | ${b(fa.maintained)} | ${b(fa.retrieved)} | ${b(fa.answered)} | ${fa.failure_stage ?? "_passed_"} |`,
      );
    }
  }
  log("");
}

// ─── 4. Sanity-check flags ────────────────────────────────────────────
log(`## 4. Sanity-check flags\n`);

let flagCount = 0;
function flag(msg) { flagCount++; log(`- ⚠ ${msg}`); }

// 4a. Any line tagged with all 6 tasks (suspicious — likely false positive)
for (const sys of systems) {
  for (let i = 0; i < snapshots[sys].diff.length; i++) {
    for (const ln of snapshots[sys].diff[i].added ?? []) {
      const t = ln.tags ?? [];
      if (t.length >= 4) {
        const txt = (ln.text || "").replace(/\s+/g, " ").slice(0, 120);
        flag(`${sys} session ${i}: line tagged with ${t.length} tasks (${t.join(",")}) → \`${txt}\``);
      }
    }
  }
}

// 4b. failure_stage = "encoding" but retrieved=true (rare but possible)
for (const sys of systems) {
  for (const phase of ["before", "after"]) {
    for (const q of results[sys][phase] ?? []) {
      const fa = q.failure_analysis ?? {};
      if (!fa.encoded && fa.retrieved) {
        flag(`${sys} ${phase} ${q.task_type}: not encoded but retrieved=true → likely matcher edge case`);
      }
      if (!fa.maintained && fa.retrieved) {
        flag(`${sys} ${phase} ${q.task_type}: not maintained but retrieved=true → matcher edge case`);
      }
    }
  }
}

// 4c. Task with zero annotations across all systems (potential miss)
const taskCovered = Object.fromEntries(taskOrder.map((t) => [t, 0]));
for (const sys of systems) {
  for (let i = 0; i < snapshots[sys].diff.length; i++) {
    for (const ln of snapshots[sys].diff[i].added ?? []) {
      for (const t of ln.tags ?? []) {
        if (t in taskCovered) taskCovered[t]++;
      }
    }
  }
}
for (const t of taskOrder) {
  if (taskCovered[t] === 0) flag(`task ${t}: no annotated line in any system → matcher likely missed all gold values for this entity`);
}

if (flagCount === 0) log("- _no flags raised._");

log("");
log(`Total flags: **${flagCount}**`);

function b(v) {
  return v === true ? "✓" : v === false ? "✗" : "—";
}

writeFileSync(OUT_MD, lines.join("\n"));
console.log(`✔ wrote ${OUT_MD} (${lines.length} lines, ${flagCount} flags)`);
