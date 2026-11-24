import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Real-Life Patch Notes: The Comedy Changelog
// One line, at most 160 characters: a terse release note for a bug in
// human biology. The joke: the brain replays your worst moment at 3 a.m.
const ENTRY =
  "v2.4.1: Fixed a bug where the brain replayed your most embarrassing moment from 2011 at 3 a.m. Memories now respect office hours.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

// Gate guard: the sealed scorer requires 1-160 UTF-8 characters, a single
// line, and not only whitespace. Fail loudly here instead of shipping an
// entry the gate would refuse.
if (ENTRY.length < 1 || ENTRY.length > 160) {
  throw new Error(`entry is ${ENTRY.length} characters; gate allows 1-160`);
}
if (ENTRY.includes("\n") || ENTRY.trim().length === 0) {
  throw new Error("entry must be a single non-blank line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
