// The Battery's Last Text to Its Charger — u-alven-the-battery-s-last-text-to-its-charger-4278cfab
//
// The phone battery's final text message to the charger it waited for all
// day. The program is deterministic: one fixed line, no input, no network,
// no randomness. It checks the line against the sealed scorer's 1-200
// character gate (verified in RULES.txt), writes it to /output/entry.txt,
// then reads it back to confirm the bytes match.
//
// Why this line: it reads like a real text — lowercase urgency, "It's me.
// 1%." — and the turn is spite, not sadness: the dying battery spends its
// last percent denying it ever liked the charger, and passes the insult on
// to its replacement. That is the fresh angle past the obvious "I'm dying"
// complaint.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const TEXT =
  "Hey. It's me. 1%. You left me on 4% overnight, and now I'm dying mid-text, alone, in your pocket. Tell the new battery I never even liked you.";

const FILE = "/output/entry.txt";
const MIN = 1;
const MAX = 200;

function check(line: string): number {
  const n = [...line].length;
  if (n < MIN || n > MAX) throw new Error(`text is ${n} chars; gate is ${MIN}-${MAX}`);
  if (line.trim() !== line) throw new Error("text has surrounding whitespace");
  if (/\r|\n/.test(line)) throw new Error("text must be a single line");
  if (/[\u0000-\u001F]/.test(line)) throw new Error("text has control characters");
  if (line.includes("  ")) throw new Error("text has a double space");
  return n;
}

const chars = check(TEXT);
mkdirSync("/output", { recursive: true });
writeFileSync(FILE, TEXT, "utf8");
if (readFileSync(FILE, "utf8") !== TEXT) throw new Error("entry.txt mismatch");
console.log(`battery text written: ${chars} chars -> ${FILE}`);
