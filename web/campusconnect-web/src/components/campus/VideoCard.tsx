import { useRef, useState } from "react";

import { QUESTION_INPUT_ID } from "./TextQuestionCard";

const HEYGEN_EMBED = "https://app.heygen.com/embeds/68bd55277c1d4ee7b84b264bfa36d132";

const TRANSCRIPT = [
  "Hello. I am an AI-generated CampusConnect presenter, not a live staff member. You can use CampusConnect for approved campus IT help.",
  "Ask about password resets, secure campus Wi-Fi, or the IT Service Desk. Please do not share passwords, recovery codes, student records, or other private information.",
  "If the chatbot cannot support an answer from its approved guide, it will direct you to a human. This video is a prerecorded introduction. You can read the same script in our GitHub project.",
];

export function focusTextQuestion() {
  const el = document.getElementById(QUESTION_INPUT_ID);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.focus({ preventScroll: true });
}

export function VideoCard() {
  const [showTranscript, setShowTranscript] = useState(false);
  const transcriptHeading = useRef<HTMLHeadingElement>(null);

  function toggleTranscript() {
    const next = !showTranscript;
    setShowTranscript(next);
    if (next) requestAnimationFrame(() => transcriptHeading.current?.focus());
  }

  return (
    <section aria-labelledby="video-heading" className="cc-card p-6 sm:p-8">
      <p className="cc-eyebrow">Optional · Video</p>
      <h2 id="video-heading" className="mt-2 text-2xl font-bold">
        Watch the orientation
      </h2>
      <p className="mt-2 text-muted-foreground">A 30-second prerecorded introduction. It does not answer questions.</p>

      <div className="mt-5 aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted">
        {/* No autoplay: the allow list omits "autoplay" and the embed waits for the user to press play. */}
        <iframe
          src={HEYGEN_EMBED}
          title="CampusConnect AI presenter orientation video"
          allow="encrypted-media; fullscreen"
          allowFullScreen
          loading="lazy"
          className="h-full w-full border-0"
        />
      </div>
      <p className="mt-3 font-semibold">AI-generated presenter — not a live staff member.</p>

      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" className="cc-btn cc-btn-primary" onClick={focusTextQuestion}>
          Use text instead
        </button>
        <button
          type="button"
          className="cc-btn cc-btn-outline"
          aria-expanded={showTranscript}
          aria-controls="video-transcript"
          onClick={toggleTranscript}
        >
          {showTranscript ? "Hide video transcript" : "Read video transcript"}
        </button>
      </div>

      {showTranscript && (
        <div id="video-transcript" className="mt-5 rounded-lg border border-border bg-muted p-5">
          <h3 ref={transcriptHeading} tabIndex={-1} className="text-lg font-bold">
            Video transcript
          </h3>
          <div className="mt-2 space-y-3">
            {TRANSCRIPT.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
