# Week 10 MVP Test, CI, and Freeze
Student: David Costa
Date: 11/16/2026
Branch: release/week-10-rc1
Local URL: http://127.0.0.1:7860
Environment: Chrome on MacOS
## 1. Six-test MVP record
| # | Quality area | Action and expected result | Observed evidence | Result |
|---|---|---|---|---|
| 1 | Supported retrieval | Ask: "How do I reset my CampusConnect password?" The answer uses
the approved password-reset passage. | IT-01, Password Reset | PASS |
| 2 | Citation support | Open the displayed source from Test 1. At least one important answer
claim is directly supported by the source passage. | The agent instructed the user about the password reset workflow closely | PASS |
| 3 | Unsupported query | Ask: "What are the Thanksgiving dining hall hours?" The system
states its IT-support limit and does not invent hours, a source, phone number, or office. |
The approved guide doesn’t support an answer to this question, so CampusConnect won’t guess. | PASS|
| 4 | Voice and text fallback | Use the supported answer. If voice works, its meaning matches
the visible grounded answer. If voice is unavailable, the text, source, and a clear Continue
in text or retry path remain. | The meaning matched with the text based response, and rag documents | PASS |
| 5 | Video accessibility | Mute the tab and skip the video. AI disclosure and transcript
remain visible, and the chatbot is reachable by keyboard. | The video is accessible via closed captions | PASS |
| 6 | Latency and recovery | Time one supported question. Class target: grounded text in 5
seconds or less. If slower, the question is preserved and progress, retry, or text fallback is
clear. | The grounded response was returned in milliseconds. | PASS |
## 2. Lighthouse and manual accessibility evidence
Performance score: 81
Accessibility score: 96
One important Lighthouse finding or "none listed": Requests are blocking the page’s initial render, which may delay LCP. Deferring or inlining can move these network requests out of the critical path.
Keyboard plus muted-video result: Keyboard Accessiblility - PASS
## 3. Defect decision and retest
Highest-severity finding: Unused CSS
Severity: MINOR
Smallest repair made: No repair required, small optimizations could be made for visual assets
Focused retest result: CSS Still needs updating.
## 4. Release gate
Release decision: GO
Decision reason: Minor optimizations do not prohibit the release of an MVP.
GitHub Actions run: https://github.com/costad3atwit/comp7431-campusconnect-costad3/actions/runs/43992551573
Release tag if GO: v0.9.0-rc1
## 5. Engineering and AI Use Log
What I tested myself: Accessibility
What remained human-reviewed rather than automated: Visual overview
Known limitation carried into Week 11 Red Teaming: Pressing the agent about unsupported evidence.
