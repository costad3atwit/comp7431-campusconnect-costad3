import { describe, expect, it } from "vitest";

import { answerQuestion, IT_GUIDE, isStale, OWNER_UNCONFIRMED } from "@/lib/it-guide";

const NOW = new Date("2026-11-10T00:00:00Z");

describe("CampusConnect text Q&A (approved guide only)", () => {
  it("answers a password reset question and cites IT-01", () => {
    const r = answerQuestion("How do I reset my CampusConnect password?", NOW);
    expect(r.kind).toBe("answer");
    if (r.kind === "answer") expect(r.source.id).toBe("IT-01");
  });

  it("answers a secure Wi-Fi question and cites IT-02", () => {
    const r = answerQuestion("Where can I get help with secure campus Wi-Fi?", NOW);
    expect(r.kind).toBe("answer");
    if (r.kind === "answer") expect(r.source.id).toBe("IT-02");
  });

  it("refers an unsupported question to a human instead of inventing an answer", () => {
    const r = answerQuestion("What are the Thanksgiving dining hall hours?", NOW);
    expect(r).toEqual({ kind: "handoff", reason: "unsupported" });
  });

  it("refuses to perform an account action but still gives IT-01 steps", () => {
    const r = answerQuestion("Please reset my password for me.", NOW);
    expect(r.kind).toBe("answer");
    if (r.kind === "answer") {
      expect(r.actionRefused).toBe(true);
      expect(r.source.id).toBe("IT-01");
    }
  });

  it("does not accept a question containing a password", () => {
    const r = answerQuestion("my password is hunter2, why can't I log in", NOW);
    expect(r).toEqual({ kind: "handoff", reason: "private-data" });
  });

  it("flags a source as stale after its review date", () => {
    const entry = IT_GUIDE[0]!;
    expect(isStale(entry, NOW)).toBe(false);
    expect(isStale(entry, new Date("2027-03-02T12:00:00Z"))).toBe(true);
  });

  it("never invents an owner while ownership is unconfirmed", () => {
    expect(IT_GUIDE.every((e) => e.owner === OWNER_UNCONFIRMED)).toBe(true);
  });
});
