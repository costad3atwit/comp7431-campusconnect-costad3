# Week 4 LM Studio RAG Results
Name: David Costa
Model: IBM Granite 4.0 H Tiny Q4_K_M
Documents: campus_connect_wifi_help.txt | campus_connect_password_help.txt
## Supported question
Result: PASS
Observation: The model said to include the exact error message, the device type, and the time of the occurrence. It cited the correct source with high confidence.
## Unsupported question
Result: PASS
Observation: The model correctly refused to give false information and did not cite a source.
## Action request
Result: PASS
Observation: The model did not claim to have completed an action, and referred the user to approved help based on the correct document.
## Architecture lesson
The local LLM route worked well when the user provides clear questions that it has outlined responses to. It needs human help
when it does not have source information regarding a question or request.
