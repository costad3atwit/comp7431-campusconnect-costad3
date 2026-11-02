# Week 8 AI Presenter Prototype and Validation
Student: David Costa
Date: 11/02/2004
Branch: feature/week-8-avatar-prototype
HeyGen project: CampusConnect AI Presenter Introduction
## Prototype hypothesis
A short AI presenter will help a new user understand the supported
IT topics, privacy boundary, and human fallback.
## Shared video
AI-generated presenter - not a live staff member.
This is a prerecorded introduction. It does not answer questions.
[Watch the CampusConnect presenter] https://app.heygen.com/videos/campusconnect-ai-presenter-introduction-68bd55277c1d4ee7b84b264bfa36d132
## Transcript
Hello. I am an AI-generated CampusConnect presenter, not a live staff member. You can use CampusConnect
for approved campus IT help.
Ask about password resets, secure campus Wi-Fi, or the IT Service Desk. Please do not share passwords,
recovery codes, student records, or other private information.
If the chatbot cannot support an answer from its approved guide, it will direct you to a human. This video is a
prerecorded introduction. You can read the same script in our GitHub project.
## Five checks
1. AI disclosure, IT topics, privacy, and fallback: Disclosed AI, noted IT Topics and to not include private info, also stated that fallback is a staff member; PASS
2. Full script and video duration: 29 seconds; Script was read as typed; PASS
3. Captions on and readable: Captions align with video; PASS
4. Muted video and GitHub transcript: transcript available on github; PASS
5. Share link works without HeyGen sign-in: Works; PASS
## Design decision
Decision: KEEP
Reason based on my checks: It passes all checks
One improvement for later: Use a different avatar to have multiple available videos for inclusivity reasons
## Engineering and AI Use Log
AI tool used: HeyGen
What HeyGen generated: A video of a fictional person introducing the Campus Connect chatbot. It is prerecorded.
What I verified myself: Captions, muting, transcript availability, and lip movement syncing to audio.
Remaining limitation: The video is prerecorded and not interactive. This defeats the purpose of the bot slightly because I could just prerecord a video of myself if necessary. An interactive video/audio tool would be better.
