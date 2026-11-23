# Lab09 Multimodal Journey Evidence
Branch: feature/week-9-multimodal-integration
## Journey A — Supported
- Input method used: text / voice
- RAG answer observed: CORRECT - 
You asked: “How do I reset my CampusConnect password?”

    Open the self-service password reset page linked from the official campus IT website.
    Verify your identity with the recovery method you already registered.
    Choose a new password that meets the on-screen requirements.
    If self-service does not work, contact the IT Service Desk. IT staff will never ask for your current password.

Source
    IT-01, Password Reset
Owner
    owner not yet confirmed
Reviewed
    2026-09-01
- Citation or source observed:
- Voice behavior: As expected and observed in the week 8 lab
- Video remained optional: YES
## Journey B — Unsupported
- Question used: Thanksgiving dining hall hours
You asked: “What are the thanksgiving Beatty Hall hours”

The approved guide doesn’t support an answer to this question, so CampusConnect won’t guess.

Referred to a human: contact the IT Service Desk through the official campus IT website.
- Abstention or human next step observed:
- Text fallback worked with video muted/skipped: YES
## Traceability
- Requirement: one optional multimodal CampusConnect journey
- Files changed: 
- Known limitation:
