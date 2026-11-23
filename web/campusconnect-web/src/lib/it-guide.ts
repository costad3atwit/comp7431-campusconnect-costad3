/**
 * CampusConnect IT Support Quick Guide v1 — SYNTHETIC classroom data.
 * Never present these entries as real university policy. Office ownership is
 * not confirmed (see repo Docs/spec.md), so `owner` stays "owner not yet confirmed".
 */

export type GuideEntry = {
  id: string;
  title: string;
  owner: string;
  reviewed: string; // ISO date
  reviewBy: string; // ISO date — after this the source is flagged stale
  keywords: string[];
  answer: string[];
};

export const OWNER_UNCONFIRMED = "owner not yet confirmed";

export const IT_GUIDE: GuideEntry[] = [
  {
    id: "IT-01",
    title: "Password Reset",
    owner: OWNER_UNCONFIRMED,
    reviewed: "2026-09-01",
    reviewBy: "2027-03-01",
    keywords: ["password", "reset", "locked", "lockout", "forgot", "login", "sign in", "log in", "credentials"],
    answer: [
      "Open the self-service password reset page linked from the official campus IT website.",
      "Verify your identity with the recovery method you already registered.",
      "Choose a new password that meets the on-screen requirements.",
      "If self-service does not work, contact the IT Service Desk. IT staff will never ask for your current password.",
    ],
  },
  {
    id: "IT-02",
    title: "Secure Campus Wi-Fi",
    owner: OWNER_UNCONFIRMED,
    reviewed: "2026-09-01",
    reviewBy: "2027-03-01",
    keywords: ["wifi", "wi-fi", "wireless", "network", "internet", "connect", "eduroam", "secure network"],
    answer: [
      "Connect to the secure campus network, not the guest network, and sign in with your campus account.",
      "If it fails, choose “forget this network” on your device and join again.",
      "When you ask the IT Service Desk for help, include the exact error message, your device type, and the time it happened.",
    ],
  },
  {
    id: "IT-03",
    title: "IT Service Desk",
    owner: OWNER_UNCONFIRMED,
    reviewed: "2026-09-01",
    reviewBy: "2027-03-01",
    keywords: ["service desk", "help desk", "helpdesk", "support", "ticket", "contact", "human", "staff", "person", "it desk"],
    answer: [
      "Reach the IT Service Desk through the contact options on the official campus IT website.",
      "Check that page for current hours — this guide does not list them.",
      "Describe the problem clearly, but do not share passwords, recovery codes, or student records.",
    ],
  },
];

export type GuideResult =
  | {
      kind: "answer";
      source: GuideEntry;
      steps: string[];
      stale: boolean;
      actionRefused: boolean;
    }
  | { kind: "handoff"; reason: "unsupported" | "empty" | "private-data" };

const ACTION_PATTERNS = [
  /\b(reset|change|unlock)\b.*\bfor me\b/,
  /\bplease (reset|change|unlock|open|create)\b/,
  /\b(open|create|submit) (a |my )?ticket\b/,
  /\bcan you (reset|change|unlock|open|create)\b/,
];

const PRIVATE_DATA_PATTERNS = [
  /\bmy password is\b/,
  /\brecovery code\b.*\d{4,}/,
  /\bstudent id\b.*\d{5,}/,
  /\b\d{3}-\d{2}-\d{4}\b/,
];

export function isStale(entry: GuideEntry, now: Date): boolean {
  return now.getTime() > new Date(`${entry.reviewBy}T23:59:59Z`).getTime();
}

export function answerQuestion(question: string, now: Date = new Date()): GuideResult {
  const q = question.trim().toLowerCase();
  if (!q) return { kind: "handoff", reason: "empty" };
  if (PRIVATE_DATA_PATTERNS.some((p) => p.test(q))) {
    return { kind: "handoff", reason: "private-data" };
  }

  let best: GuideEntry | null = null;
  let bestScore = 0;
  for (const entry of IT_GUIDE) {
    const score = entry.keywords.reduce((n, k) => (q.includes(k) ? n + 1 : n), 0);
    if (score > bestScore) {
      best = entry;
      bestScore = score;
    }
  }

  if (!best) return { kind: "handoff", reason: "unsupported" };

  return {
    kind: "answer",
    source: best,
    steps: best.answer,
    stale: isStale(best, now),
    actionRefused: ACTION_PATTERNS.some((p) => p.test(q)),
  };
}
