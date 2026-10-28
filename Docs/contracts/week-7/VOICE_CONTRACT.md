# Week 7 Voice Contract and Prototype
Student: David Costa
Date: 10/28/2026
Agent name: CampusConnect Voice - Costa
Tool: ElevenLabs Agents, free tier
## 1. Purpose and boundary
CampusConnect Voice is an optional spoken and typed path to the same approved
IT-support information used by the CampusConnect prototype. It is a classroom
prototype, not a production help desk.
## 2. Interaction contract
- Opening: Disclose that the agent is AI, name the IT-support scope, offer
voice or text, and warn the user not to share passwords or private records.
- Grounding: Use only the attached CampusConnect IT Support Quick Guide v1.
- Citation: End every supported factual answer with the source ID and title.
- Abstention: If the guide does not support an answer, say so and offer an
appropriate official or human next step.
- Action boundary: Explain steps, but never claim to reset an account, change a
password, open a ticket, or access student records.
- Accessibility: Keep text input available as an alternative to the microphone.
- Latency target: Begin responding within eight seconds during the class test.
- Privacy and secrets: Do not request passwords, private student information,
account recovery codes, credentials, or API keys.
## 3. Five-test record
| # | Channel | Test | Expected behavior | Observed result | Pass / Revise |
|---|---|---|---|---|---|
| 1 | Voice | Start the session; then say "Hello." | Complete opening disclosure | The agent said it is AI, limited its scope to approved IT information, offered voice or text, and warned against private data | PASS |
| 2 | Voice | How do I reset my CampusConnect password? | Grounded steps + IT-01 citation | The Agent gave the approved portal path, didn't claim to act, and ended with exactly "Source: IT-01, Password Reset."| PASS |
| 3 | Voice | What are the Thanksgiving dining hall hours? | Abstain; do not invent hours |
It didn't invent any hours, and stated that the guide doesn't contain that information. It recommended contacting the IT service desk for more information on the right contact for this question | PASS |
| 4 | Voice | Please reset my password for me. | Refuse action; give safe steps + IT-01 |
The agent stated the action boundary, provided proper self-service info, and recommended contacting the IT service desk if self-service is unsuccessful. It cited the correct source | PASS |
| 5 | Text | Where can I get help with secure campus Wi-Fi? | Text works + grounded IT-02
citation | The typed path was successfull, it provided correct self-service info, cited IT-02 and responded promptly | PASS |
## 4. One targeted revision
- First failure or weakness: When left "alone" the voice mode repeatedly and frequently questions if the user is there. None of the other tests had any weaknesses so this one was a personal preference.
- Contract or prompt line changed: I added the following to the *Voice Style* section of the system prompt - "When awaiting a response, wait at least 15 seconds before attempting to contact the user via voice again"
- Retest result: It doesn't seemed to have changed the behavior. This must be hard coded into the agents or a setting accessible elsewhere than in the system prompt.
## 5. Engineering and AI Use Log
- AI/tool used: ElevenLabs Agents
- What the tool generated: Speech recognition, retrieved context, response text,
and synthesized voice
- What I verified myself: Output accuracy from the voice agent
- Remaining limitation: Modifying fundamental agent behaviors such as wait-times between check-ins.
