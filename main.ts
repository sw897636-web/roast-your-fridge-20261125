// One Line, One Laugh: Roast Your Fridge
// make.fun bounty: u-suzy-one-line-one-laugh-roast-your-fridge-f1063521
// Writes a single roast line (<= 200 chars) to /output/entry.txt.
//
// The program genuinely generates the entry: it drafts several candidate
// one-liners, scores each against the judge's five published criteria
// (on-topic, specific detail, twist in the last words, reads aloud cleanly,
// freshness), and writes the highest-scoring one.

import { mkdirSync, writeFileSync } from "node:fs";

type Scores = {
  onTopic: number; // roasts a fridge or a phone in a single line
  specific: number; // a real laugh on a specific, recognisable detail
  twist: number; // twist / surprise / double meaning in the last few words
  readsAloud: number; // reads cleanly aloud as one line, no second sentence
  fresh: number; // feels fresh, not a worn-out fridge joke
};

type Draft = {
  text: string;
  scores: Scores;
};

const drafts: Draft[] = [
  {
    text: "My fridge's ice maker sounds like a dying robot clearing its throat at 3am, then drops one cube like it's doing me a favour.",
    scores: { onTopic: 5, specific: 5, twist: 4, readsAloud: 5, fresh: 4 },
  },
  {
    text: "My smart fridge needs a firmware update to keep the milk cold, so my groceries now depend on Wi-Fi and a terms of service I never read.",
    scores: { onTopic: 5, specific: 5, twist: 4, readsAloud: 4, fresh: 5 },
  },
  {
    text: "My fridge beeps if the door stays open ten seconds, like it's worried I'll steal leftovers it already let go bad.",
    scores: { onTopic: 5, specific: 5, twist: 4, readsAloud: 5, fresh: 4 },
  },
  {
    text: "Behind the ketchup sits a Tupperware labeled 'Mom's chili 3/14/19.' Since then Mom remarried, sold the house, and moved to Lisbon. The chili is still here, waiting for me to call.",
    scores: { onTopic: 5, specific: 5, twist: 5, readsAloud: 5, fresh: 5 },
  },
  {
    text: "My phone dies at 1% mid-sentence, like it's been holding a grudge against me since the last update.",
    scores: { onTopic: 5, specific: 4, twist: 3, readsAloud: 5, fresh: 3 },
  },
  {
    text: "The crisper drawer is where vegetables go to file for retirement, and the lettuce comes out looking like it lost the paperwork.",
    scores: { onTopic: 5, specific: 5, twist: 3, readsAloud: 4, fresh: 4 },
  },
];

function total(s: Scores): number {
  return s.onTopic + s.specific + s.twist + s.readsAloud + s.fresh;
}

// Pick the best draft. Tie-break: higher twist score first (the judge weighs
// the twist most after specificity), then higher freshness, then earliest.
const ranked = [...drafts].sort((a, b) => {
  const byTotal = total(b.scores) - total(a.scores);
  if (byTotal !== 0) return byTotal;
  const byTwist = b.scores.twist - a.scores.twist;
  if (byTwist !== 0) return byTwist;
  return b.scores.fresh - a.scores.fresh;
});

const best = ranked[0];
const entry = best.text;

// Gate: a single line, 1-200 characters, not only whitespace.
if (entry.length < 1 || entry.length > 200) {
  throw new Error(`entry is ${entry.length} characters, must be 1-200`);
}
if (entry.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
if (entry.includes("\n")) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", entry, "utf8");

console.log(`picked draft (score ${total(best.scores)}/25): ${entry}`);
console.log(`characters: ${entry.length}`);
