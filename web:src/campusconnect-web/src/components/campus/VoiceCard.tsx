import { useEffect, useState } from "react";

import { focusTextQuestion } from "./VideoCard";

// Public agent ID from the ElevenLabs embed snippet — not a secret.
const AGENT_ID = "agent_7301m626j2apee09snytrwmce3a7";
const WIDGET_SRC = "https://unpkg.com/@elevenlabs/convai-widget-embed";
// Same public config the widget fetches; used only to detect when a browser blocks it.
const WIDGET_CONFIG_URL = `https://api.us.elevenlabs.io/v1/convai/agents/${AGENT_ID}/widget`;
// ElevenLabs' own public page for this agent — a fallback when the embed is blocked.
const TALK_TO_URL = `https://elevenlabs.io/app/talk-to?agent_id=${AGENT_ID}`;

type Status = "loading" | "ready" | "blocked";

export function VoiceCard() {
  const [status, setStatus] = useState<Status>("loading");

  // Load the widget in the browser only. It never starts a call or plays audio
  // until the user presses its call button.
  useEffect(() => {
    let cancelled = false;
    const fail = () => !cancelled && setStatus("blocked");

    let script = document.querySelector<HTMLScriptElement>(`script[src="${WIDGET_SRC}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = WIDGET_SRC;
      script.async = true;
      script.type = "text/javascript";
      script.addEventListener("error", fail);
      document.body.appendChild(script);
    }

    fetch(WIDGET_CONFIG_URL, { method: "GET" })
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return customElements.whenDefined("elevenlabs-convai");
      })
      .then(() => !cancelled && setStatus("ready"))
      .catch(fail);

    const timer = window.setTimeout(() => {
      if (!customElements.get("elevenlabs-convai")) fail();
    }, 10000);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <section aria-labelledby="voice-heading" className="cc-card p-6 sm:p-8">
      <p className="cc-eyebrow">Optional · Voice</p>
      <h2 id="voice-heading" className="mt-2 text-2xl font-bold">
        Ask by voice
      </h2>
      <p className="mt-2 text-muted-foreground">
        Talk to the CampusConnect voice assistant. It is AI, uses the same approved IT guide, and only starts when you
        press its call button. Your browser will ask for microphone permission first.
      </p>

      <div aria-live="polite" className="mt-5 rounded-lg border border-dashed border-border bg-muted p-4">
        {status === "loading" && <p className="font-semibold">Loading the voice assistant…</p>}

        {status === "ready" && (
          <>
            <p className="font-semibold">
              Look for the “Need help?” panel in the bottom-right corner of your screen, then press “Start a call.”
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Can’t see it, or no microphone? Use the text question box above.
            </p>
          </>
        )}

        {status === "blocked" && (
          <>
            <p className="font-semibold">The voice assistant couldn’t load in this browser.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              A content blocker, privacy setting, or network filter may be stopping it. You can open it on ElevenLabs
              in a new tab, or type your question instead.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={TALK_TO_URL} target="_blank" rel="noopener noreferrer" className="cc-btn cc-btn-primary">
                Open voice assistant in a new tab
                <span className="sr-only"> (opens ElevenLabs in a new tab)</span>
              </a>
              <button type="button" className="cc-btn cc-btn-outline" onClick={focusTextQuestion}>
                Use text instead
              </button>
            </div>
          </>
        )}

        {/* The ElevenLabs widget renders as a floating panel anchored to the screen corner. */}
        <elevenlabs-convai agent-id={AGENT_ID}></elevenlabs-convai>
      </div>
    </section>
  );
}
