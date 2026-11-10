import { createFileRoute } from "@tanstack/react-router";

import { TextQuestionCard } from "@/components/campus/TextQuestionCard";
import { VideoCard } from "@/components/campus/VideoCard";
import { VoiceCard } from "@/components/campus/VoiceCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CampusConnect Multimodal Help — IT support by text, voice, or video" },
      {
        name: "description",
        content:
          "Ask approved campus IT questions by text or voice, watch a short AI-presenter orientation, and reach a human when the guide can't help.",
      },
      { property: "og:title", content: "CampusConnect Multimodal Help" },
      {
        property: "og:description",
        content: "Approved campus IT help by text, voice, or video — with a human fallback.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-card focus:px-4 focus:py-2 focus:font-semibold focus:text-foreground"
      >
        Skip to main content
      </a>

      <header className="cc-hero-band">
        <div className="mx-auto max-w-3xl px-5 pb-16 pt-12 sm:pt-16">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] opacity-90">CampusConnect · IT Support</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">CampusConnect Multimodal Help</h1>
          <p className="mt-3 max-w-xl text-lg opacity-95">
            Get approved help with passwords, secure campus Wi-Fi, and the IT Service Desk.
          </p>
        </div>
      </header>

      <main id="main" className="mx-auto -mt-8 max-w-3xl space-y-6 px-5 pb-16">
        <TextQuestionCard />
        <VoiceCard />
        <VideoCard />

        <aside role="note" className="rounded-lg border-2 border-brass bg-notice p-5 text-notice-foreground">
          <p className="font-semibold">
            If voice or video is unavailable, type your question. Unsupported questions are referred to a human.
          </p>
        </aside>

        <footer className="pt-2 text-sm text-muted-foreground">
          Classroom prototype using synthetic guide content — not real university policy. Do not share passwords,
          recovery codes, or student records.
        </footer>
      </main>
    </div>
  );
}
