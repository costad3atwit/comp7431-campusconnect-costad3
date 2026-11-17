import { useId, useState, type FormEvent } from "react";

import { answerQuestion, type GuideResult } from "@/lib/it-guide";

export const QUESTION_INPUT_ID = "cc-question-input";

const EXAMPLES = [
  "How do I reset my CampusConnect password?",
  "Where can I get help with secure campus Wi-Fi?",
  "How do I contact the IT Service Desk?",
];

export function TextQuestionCard() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState<GuideResult | null>(null);
  const [asked, setAsked] = useState("");
  const hintId = useId();

  function submit(e: FormEvent) {
    e.preventDefault();
    const q = question.trim();
    if (!q) return;
    setAsked(q);
    setResult(answerQuestion(q));
  }

  return (
    <section aria-labelledby="text-qa-heading" className="cc-card cc-card-primary p-6 sm:p-8">
      <p className="cc-eyebrow">Primary path · Text</p>
      <h2 id="text-qa-heading" className="mt-2 text-2xl font-bold sm:text-3xl">
        Type your IT question
      </h2>
      <p className="mt-2 text-muted-foreground">
        Answers come only from the approved CampusConnect IT Support Quick Guide, with the source shown.
      </p>

      <form onSubmit={submit} className="mt-6 space-y-3">
        <label htmlFor={QUESTION_INPUT_ID} className="block font-semibold">
          Your question
        </label>
        <textarea
          id={QUESTION_INPUT_ID}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              e.currentTarget.form?.requestSubmit();
            }
          }}
          aria-describedby={hintId}
          rows={3}
          maxLength={500}
          placeholder="e.g. How do I reset my password?"
          className="w-full resize-y rounded-md border-2 border-input bg-card px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary"
        />
        <p id={hintId} className="text-sm text-muted-foreground">
          Press Enter to ask. Do not include passwords, recovery codes, or student records.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" className="cc-btn cc-btn-primary" disabled={!question.trim()}>
            Ask CampusConnect
          </button>
          <span className="text-sm text-muted-foreground">Try:</span>
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => setQuestion(ex)}
              className="rounded-full border border-border bg-muted px-3 py-1 text-sm text-foreground hover:bg-secondary"
            >
              {ex}
            </button>
          ))}
        </div>
      </form>

      <div aria-live="polite" className="mt-6">
        {result && <ResultPanel asked={asked} result={result} />}
      </div>
    </section>
  );
}

function ResultPanel({ asked, result }: { asked: string; result: GuideResult }) {
  if (result.kind === "handoff") {
    const message =
      result.reason === "private-data"
        ? "Please don’t share passwords, recovery codes, or other private information here. Remove it and ask again, or contact the IT Service Desk directly."
        : "The approved guide doesn’t support an answer to this question, so CampusConnect won’t guess.";
    return (
      <div className="rounded-lg border-2 border-brass bg-notice p-5 text-notice-foreground">
        <p className="text-sm font-semibold">You asked: “{asked}”</p>
        <p className="mt-2">{message}</p>
        <p className="mt-2 font-semibold">
          Referred to a human: contact the IT Service Desk through the official campus IT website.
        </p>
      </div>
    );
  }

  const { source, steps, stale, actionRefused } = result;
  return (
    <article className="rounded-lg border border-border bg-muted p-5">
      <p className="text-sm font-semibold text-muted-foreground">You asked: “{asked}”</p>
      {actionRefused && (
        <p className="mt-3 font-semibold">
          CampusConnect can explain the steps, but it cannot change your account, reset a password, or open a ticket
          for you.
        </p>
      )}
      <ol className="mt-3 list-decimal space-y-1.5 pl-5">
        {steps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
      {stale && (
        <p className="mt-3 rounded-md bg-notice px-3 py-2 text-sm font-semibold text-notice-foreground">
          This source is past its review date. Confirm with the IT Service Desk before acting.
        </p>
      )}
      <dl className="mt-4 grid gap-x-4 gap-y-1 border-t border-border pt-3 text-sm sm:grid-cols-[auto_1fr]">
        <dt className="font-semibold">Source</dt>
        <dd>
          {source.id}, {source.title}
        </dd>
        <dt className="font-semibold">Owner</dt>
        <dd>{source.owner}</dd>
        <dt className="font-semibold">Reviewed</dt>
        <dd>{source.reviewed}</dd>
      </dl>
    </article>
  );
}
