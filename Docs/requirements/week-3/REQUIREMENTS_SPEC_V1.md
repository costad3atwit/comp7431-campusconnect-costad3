# CampusConnect Requirements Specification v1
Status: Draft — Week 3
Student: David Costa
Branch: docs/week-3-requirements-ai
## 1. Problem statement
Students who need IT Support information need a reliable way to find the correct
next step because the current experience may be scattered, difficult to search, or
hard to verify as current.
## 2. Evidence carried forward from Week 2
- E-01: Elena said "cannot see downstream results"
- E-02: Elena said "this ticket is too vague. I should route it again."
- A-01: Users don't check the FAQ before contacting IT Support 
## 3. One user journey inside the MVP
A student asks one typed IT Support question. CampusConnect searches only approved
IT Support material, returns a short answer with a visible source, or says the
available sources do not support an answer.
## 4. Four requirements
- FR-01 — The system shall accept one typed IT Support question.
- GR-01 — Every factual answer shall identify the approved source used.
- SF-01 — If approved sources are insufficient, the system shall not invent an
answer and shall provide a helpful IT Support next step.
- NFR-01 — A keyboard user shall be able to submit a question and read the result.
## 5. MVP boundary
IN: one typed question, approved IT Support material, one grounded answer, visible
source, safe failure, and helpful next step.
OUT: password resets, ticket creation, personal student records, voice, automatic
actions, and answers from unapproved material.
## 6. AI critique and human decision
- ChatGPT suggestion: 
  - SF-01 — Safe failure
“Insufficient” and “helpful IT Support next step” are not operationally defined, so the requirement is difficult to test consistently.
This matters because safe failure is a core MVP behavior, but different testers could reasonably expect different outcomes.
Smallest testable revision: define one observable fallback condition and require the response to contain a specific approved IT Support next-step element.
- Claude suggestion: 
  - Section 2 (Evidence carried forward) and its links to FR-01, GR-01, SF-01, and NFR-01
None of the four requirements traces to an evidence ID. The evidence that exists does not clearly support the student problem in Section 1. EVIDENCE: E-01 and E-02 are Elena's statements about downstream results and re-routing a vague ticket. INFERENCE: these read like a staff-side ticket-handling perspective, not a student trying to find an answer, and ticket handling sits near the OUT-of-scope "ticket creation." EVIDENCE: A-01 is labeled with an "A" but is written as a fact about users.
Without a trace, a reviewer cannot tell which requirements come from Week 2 discovery and which are unvalidated design choices. That breaks the source-of-truth rule, and it makes your Section 6 "My reason" hard to justify with evidence. ASSUMPTION: if A-01 is false, the "helpful next step" in SF-01 may point students to the FAQ they already checked.
Add a "Traces to" field to each requirement and relabel A-01 explicitly as an ASSUMPTION with a validation note. For example: "SF-01, Traces to: E-02 (vague requests need a clearer next step), A-01 (ASSUMPTION, unvalidated)." Mark any requirement with no evidence as "ASSUMPTION, no Week 2 evidence." Pass check: every requirement ID lists at least one E- or A- ID, and no assumption is worded as a fact.
- My decision: Accepted / Revised / Rejected
- My reason: <EXPLAIN USING WEEK 2 EVIDENCE, SCOPE, OR TESTABILITY>
