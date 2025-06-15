# AI Agent Service

This service orchestrates AI agent workflows using LangGraph and FastAPI. It's designed to handle tasks like transcription, analysis, and ticket creation as part of the AI Work Buddy application.

Currently, the core logic within the workflow nodes (transcription, analysis, ticket creation) is mocked for development and testing purposes.

## Prerequisites

*   Python 3.9+
*   Pip (Python package installer)

## Setup

1.  **Clone the repository (if applicable) and navigate to this directory:**
    ```bash
    cd path/to/ai_agent_service
    ```

2.  **Create and activate a virtual environment:**
    *   On macOS and Linux:
        ```bash
        python3 -m venv .venv
        source .venv/bin/activate
        ```
    *   On Windows:
        ```bash
        python -m venv .venv
        .venv\Scripts\activate
        ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

## Running the Service

To run the FastAPI application:

```bash
uvicorn main:app --reload --port 8000
```

The service will be available at `http://127.0.0.1:8000`.
You can access the OpenAPI documentation at `http://127.0.0.1:8000/docs`.

## Endpoints

### `POST /invoke_workflow`

Invokes the AI agent workflow.

**Request Body (JSON):**

*   `original_input` (any): The input for the workflow (e.g., a string of text to be "transcribed").
*   `tenant_id` (string, optional): The ID of the tenant. Defaults to "default_tenant".
*   `initial_state_override` (object, optional): A dictionary to override any initial state fields in the `AgentState`.

**Example `curl` command:**

```bash
curl -X POST "http://127.0.0.1:8000/invoke_workflow" \
-H "Content-Type: application/json" \
-d '{
    "original_input": "Hello, this is a test message.",
    "tenant_id": "tenant_123"
}'
```

**Example successful response:**
```json
{
    "final_state": {
        "original_input": "Hello, this is a test message.",
        "tenant_id": "tenant_123",
        "transcription": "This is a mock transcription for input: Hello, this is a test message.",
        // ... other state fields ...
        "ticket_id": "TICKET_tenant_123_167...",
        "is_successful": true,
        "websocket_message_log": [
            "Tenant tenant_123: Transcription started for input: Hello, this is a test message....",
            "Tenant tenant_123: Transcription successful.",
            "Tenant tenant_123: Analysis started.",
            "Tenant tenant_123: Analysis successful.",
            "Tenant tenant_123: Ticket creation started.",
            "Tenant tenant_123: Ticket TICKET_tenant_123_167... created successfully."
        ]
    },
    "websocket_messages_sent": [
        // ... same as websocket_message_log above ...
    ]
}
```

## Workflow Overview

The current workflow consists of the following mock stages:

1.  **Transcription Node:** Takes the `original_input` and produces a mock transcription.
2.  **Analysis Node:** Takes the transcription and produces mock analysis results (sentiment, entities).
3.  **Ticket Creation Node:** Takes the analysis and creates a mock ticket ID.

The workflow includes retry logic for each node. If a node "fails" (simulated), it will be retried up to `MAX_RETRIES` (currently 2) times before the workflow proceeds to an error handling state.

## Testing Retries and Failures

You can test the retry and failure mechanisms by including specific keywords in the `original_input` or by manipulating the `initial_state_override`.

*   **To simulate transcription failure:** Include `"fail_transcription"` in the `original_input` string.
    ```bash
    curl -X POST "http://127.0.0.1:8000/invoke_workflow" \
    -H "Content-Type: application/json" \
    -d '{
        "original_input": "This input will fail_transcription.",
        "tenant_id": "tenant_retry_test"
    }'
    ```
*   **To simulate analysis failure:** Ensure transcription succeeds, then include `"fail_analysis"` in the (mocked) transcription result. This is harder to trigger directly via `original_input` with current mocks but can be forced by overriding state if needed, or by modifying the mock transcription node to pass a specific string.
    A simpler way with current mocks: if `original_input` contains `"... fail_analysis ..."` it will be part of the transcription and trigger the failure.
    ```bash
    curl -X POST "http://127.0.0.1:8000/invoke_workflow" \
    -H "Content-Type: application/json" \
    -d '{
        "original_input": "This input is fine but will fail_analysis later.",
        "tenant_id": "tenant_retry_test"
    }'
    ```
*   **To simulate ticket creation failure:** Ensure analysis succeeds, then include `"fail_ticket"` in the (mocked) analysis summary.
    Similar to analysis, if `original_input` contains `"... fail_ticket ..."` it might propagate to the summary and trigger the failure.
    ```bash
    curl -X POST "http://127.0.0.1:8000/invoke_workflow" \
    -H "Content-Type: application/json" \
    -d '{
        "original_input": "This input is fine, analysis fine, but will fail_ticket creation.",
        "tenant_id": "tenant_retry_test"
    }'
    ```

Check the console logs of the FastAPI service and the `websocket_message_log` in the response to observe retry attempts and error messages.
