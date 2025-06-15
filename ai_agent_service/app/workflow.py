import time
from .state import AgentState # Assuming AgentState is in state.py
from langgraph.graph import StateGraph, END

MAX_RETRIES = 2

def transcription_node(state: AgentState) -> AgentState:
    # TODO: Add OpenTelemetry span here for transcription_node
    # TODO: Load tenant-specific configurations or models here (e.g., acoustic models, vocabulary).
    tenant_id = state.get("tenant_id", "unknown") # Consistent "unknown"
    print(f"---TRANSCRIPTION NODE (Tenant: {tenant_id})---")
    state["websocket_message_log"] = state.get("websocket_message_log", [])
    original_input_repr = str(state.get('original_input', ''))[:50] # Truncate for brevity
    state["websocket_message_log"].append(f"Tenant {tenant_id}: Transcription started for input: {original_input_repr}...")
    print(f"Tenant {tenant_id}: Processing input: {state.get('original_input')}")

    # Mock transcription
    time.sleep(1) # Simulate work
    if state.get("transcription_retries", 0) < MAX_RETRIES:
        # Simulate intermittent failure for testing retries
        if "fail_transcription" in str(state.get("original_input", "")):
            print(f"Tenant {tenant_id}: Mock transcription failed (attempt {state.get('transcription_retries', 0) + 1}).")
            state["transcription_error"] = "Mock transcription failed."
            state["transcription_retries"] = state.get("transcription_retries", 0) + 1
            state["websocket_message_log"].append(f"Tenant {tenant_id}: Transcription failed. Retrying...")
            return state

        state["transcription"] = f"This is a mock transcription for input: {state.get('original_input')}"
        state["transcription_error"] = None
        print(f"Tenant {tenant_id}: Mock transcription successful: {state['transcription']}")
        state["websocket_message_log"].append(f"Tenant {tenant_id}: Transcription successful.")
    else:
        print(f"Tenant {tenant_id}: Max retries reached for transcription ({state.get('transcription_retries', 0)} attempts).")
        state["error_message"] = "Transcription failed after multiple retries."
        state["websocket_message_log"].append(f"Tenant {tenant_id}: Transcription failed permanently.")
    return state

def analysis_node(state: AgentState) -> AgentState:
    # TODO: Add OpenTelemetry span here for analysis_node
    # TODO: Load tenant-specific configurations or models here (e.g., entity recognizers, sentiment models).
    tenant_id = state.get("tenant_id", "unknown")
    print(f"---ANALYSIS NODE (Tenant: {tenant_id})---")
    state["websocket_message_log"] = state.get("websocket_message_log", []) # Ensure log exists
    state["websocket_message_log"].append(f"Tenant {tenant_id}: Analysis started.")

    if state.get("transcription_error"):
        print(f"Tenant {tenant_id}: Skipping analysis due to prior transcription error.")
        state["error_message"] = "Skipping analysis due to transcription error."
        state["websocket_message_log"].append(f"Tenant {tenant_id}: Analysis skipped due to prior error.")
        return state

    transcription = state.get("transcription")
    if not transcription:
        print(f"Tenant {tenant_id}: No transcription found to analyze.")
        state["analysis_error"] = "No transcription text available for analysis."
        state["websocket_message_log"].append(f"Tenant {tenant_id}: Analysis failed: No transcription.")
        return state

    # Mock analysis
    time.sleep(1) # Simulate work
    if state.get("analysis_retries", 0) < MAX_RETRIES:
        # Simulate intermittent failure
        if "fail_analysis" in transcription:
            print(f"Tenant {tenant_id}: Mock analysis failed (attempt {state.get('analysis_retries', 0) + 1}).")
            state["analysis_error"] = "Mock analysis failed."
            state["analysis_retries"] = state.get("analysis_retries", 0) + 1
            state["websocket_message_log"].append(f"Tenant {tenant_id}: Analysis failed. Retrying...")
            return state

        state["analysis_output"] = {
            "sentiment": "positive",
            "entities": ["mock_entity_1", "mock_entity_2"],
            "summary": f"Mock summary of: {transcription[:50]}..."
        }
        state["analysis_error"] = None
        print(f"Tenant {tenant_id}: Mock analysis successful: {state['analysis_output']}")
        state["websocket_message_log"].append(f"Tenant {tenant_id}: Analysis successful.")
    else:
        print(f"Tenant {tenant_id}: Max retries reached for analysis ({state.get('analysis_retries', 0)} attempts).")
        state["error_message"] = "Analysis failed after multiple retries."
        state["websocket_message_log"].append(f"Tenant {tenant_id}: Analysis failed permanently.")
    return state

def ticket_creation_node(state: AgentState) -> AgentState:
    # TODO: Add OpenTelemetry span here for ticket_creation_node
    # TODO: Implement tenant-specific ticket system integration or formatting rules here.
    tenant_id = state.get("tenant_id", "unknown")
    print(f"---TICKET CREATION NODE (Tenant: {tenant_id})---")
    state["websocket_message_log"] = state.get("websocket_message_log", []) # Ensure log exists
    state["websocket_message_log"].append(f"Tenant {tenant_id}: Ticket creation started.")

    if state.get("analysis_error") or state.get("transcription_error"):
        print(f"Tenant {tenant_id}: Skipping ticket creation due to prior error(s).")
        state["error_message"] = "Skipping ticket creation due to prior errors."
        state["websocket_message_log"].append(f"Tenant {tenant_id}: Ticket creation skipped.")
        return state

    analysis_output = state.get("analysis_output")
    if not analysis_output:
        print(f"Tenant {tenant_id}: No analysis output to create ticket from.")
        state["ticket_creation_error"] = "No analysis output available for ticket creation."
        state["websocket_message_log"].append(f"Tenant {tenant_id}: Ticket creation failed: No analysis data.")
        return state

    # Mock ticket creation
    time.sleep(0.5) # Simulate work
    if state.get("ticket_creation_retries", 0) < MAX_RETRIES:
         # Simulate intermittent failure
        if "fail_ticket" in str(analysis_output.get("summary", "")): # Example condition
            print(f"Tenant {tenant_id}: Mock ticket creation failed (attempt {state.get('ticket_creation_retries', 0) + 1}).")
            state["ticket_creation_error"] = "Mock ticket creation failed."
            state["ticket_creation_retries"] = state.get("ticket_creation_retries", 0) + 1
            state["websocket_message_log"].append(f"Tenant {tenant_id}: Ticket creation failed. Retrying...")
            return state

        state["ticket_id"] = f"TICKET_{tenant_id}_{int(time.time())}"
        state["ticket_creation_error"] = None
        state["is_successful"] = True
        print(f"Tenant {tenant_id}: Mock ticket created: {state['ticket_id']}")
        state["websocket_message_log"].append(f"Tenant {tenant_id}: Ticket {state['ticket_id']} created successfully.")
    else:
        print(f"Tenant {tenant_id}: Max retries reached for ticket creation ({state.get('ticket_creation_retries', 0)} attempts).")
        state["error_message"] = "Ticket creation failed after multiple retries."
        state["websocket_message_log"].append(f"Tenant {tenant_id}: Ticket creation failed permanently.")
    return state

def error_handling_node(state: AgentState) -> AgentState:
    # TODO: Add OpenTelemetry span here for error_handling_node
    tenant_id = state.get("tenant_id", "unknown")
    print(f"---ERROR HANDLING NODE (Tenant: {tenant_id})---")
    state["websocket_message_log"] = state.get("websocket_message_log", []) # Ensure log exists

    error_msg = state.get("error_message", "An unspecified error occurred.") # Prioritize existing error_message
    # Consolidate error message logic
    current_error = state.get("error_message")
    transcription_err = state.get("transcription_error")
    analysis_err = state.get("analysis_error")
    ticket_err = state.get("ticket_creation_error")

    if not current_error: # If no general error message, pick the latest specific one
        if ticket_err and state.get("ticket_creation_retries", 0) >= MAX_RETRIES:
            current_error = f"Ticket Creation Error: {ticket_err}"
        elif analysis_err and state.get("analysis_retries", 0) >= MAX_RETRIES:
            current_error = f"Analysis Error: {analysis_err}"
        elif transcription_err and state.get("transcription_retries", 0) >= MAX_RETRIES:
            current_error = f"Transcription Error: {transcription_err}"
        elif ticket_err: # Errors that might not have retries or lead here directly
             current_error = f"Ticket Creation Error: {ticket_err}"
        elif analysis_err:
             current_error = f"Analysis Error: {analysis_err}"
        elif transcription_err:
             current_error = f"Transcription Error: {transcription_err}"
        else:
            current_error = "An unspecified error occurred and was routed to error_handling_node."

    print(f"Tenant {tenant_id}: Workflow failed. Final Error: {current_error}")
    state["error_message"] = current_error # Ensure it's set for final output
    state["is_successful"] = False
    state["websocket_message_log"].append(f"Tenant {tenant_id}: Workflow ended in error: {current_error}")
    return state

def should_retry_transcription(state: AgentState) -> str:
    tenant_id = state.get('tenant_id', 'unknown')
    if state.get("transcription_error") and state.get("transcription_retries", 0) < MAX_RETRIES:
        print(f"---DECISION (Tenant: {tenant_id}): RETRY TRANSCRIPTION---")
        return "transcription_node"
    if state.get("transcription_error"): # Retries exhausted or error not retryable
        print(f"---DECISION (Tenant: {tenant_id}): TRANSCRIPTION FAILED (retries exhausted), TO ERROR HANDLER---")
        state["error_message"] = state.get("transcription_error", "Unknown transcription error after retries")
        return "error_handling_node"
    print(f"---DECISION (Tenant: {tenant_id}): TRANSCRIPTION SUCCEEDED, TO ANALYSIS---")
    return "analysis_node"

def should_retry_analysis(state: AgentState) -> str:
    tenant_id = state.get('tenant_id', 'unknown')
    if state.get("analysis_error") and state.get("analysis_retries", 0) < MAX_RETRIES:
        print(f"---DECISION (Tenant: {tenant_id}): RETRY ANALYSIS---")
        return "analysis_node"
    if state.get("analysis_error"): # Retries exhausted or error not retryable
        print(f"---DECISION (Tenant: {tenant_id}): ANALYSIS FAILED (retries exhausted), TO ERROR HANDLER---")
        state["error_message"] = state.get("analysis_error", "Unknown analysis error after retries")
        return "error_handling_node"
    print(f"---DECISION (Tenant: {tenant_id}): ANALYSIS SUCCEEDED, TO TICKET CREATION---")
    return "ticket_creation_node"

def should_retry_ticket_creation(state: AgentState) -> str:
    tenant_id = state.get('tenant_id', 'unknown')
    if state.get("ticket_creation_error") and state.get("ticket_creation_retries", 0) < MAX_RETRIES:
        print(f"---DECISION (Tenant: {tenant_id}): RETRY TICKET CREATION---")
        return "ticket_creation_node"
    # If there's a ticket error (retries exhausted) or a general error_message already set
    if state.get("ticket_creation_error") or state.get("error_message"):
        print(f"---DECISION (Tenant: {tenant_id}): TICKET CREATION FAILED (retries exhausted or prior error), TO ERROR HANDLER---")
        # Ensure error_message is set from ticket_creation_error if it's the primary reason here
        if state.get("ticket_creation_error") and not state.get("error_message"):
            state["error_message"] = state.get("ticket_creation_error", "Unknown ticket creation error after retries")
        return "error_handling_node"
    if state.get("is_successful"):
        print(f"---DECISION (Tenant: {tenant_id}): TICKET CREATION SUCCEEDED, TO END---")
        return END

    # Fallback: if not successful and no specific error caught (should be rare)
    print(f"---DECISION (Tenant: {tenant_id}): UNHANDLED TICKET CREATION STATE, TO ERROR HANDLER---")
    state["error_message"] = "Unhandled state after ticket_creation_node."
    return "error_handling_node"


def compile_workflow():
    workflow = StateGraph(AgentState)

    # Add nodes
    workflow.add_node("transcription_node", transcription_node)
    workflow.add_node("analysis_node", analysis_node)
    workflow.add_node("ticket_creation_node", ticket_creation_node)
    workflow.add_node("error_handling_node", error_handling_node)

    # Set entry point
    workflow.set_entry_point("transcription_node")

    # Add conditional edges
    workflow.add_conditional_edges(
        "transcription_node",
        should_retry_transcription,
        {
            "transcription_node": "transcription_node", # Loop back for retry
            "analysis_node": "analysis_node",
            "error_handling_node": "error_handling_node"
        }
    )
    workflow.add_conditional_edges(
        "analysis_node",
        should_retry_analysis,
        {
            "analysis_node": "analysis_node", # Loop back for retry
            "ticket_creation_node": "ticket_creation_node",
            "error_handling_node": "error_handling_node"
        }
    )
    workflow.add_conditional_edges(
        "ticket_creation_node",
        should_retry_ticket_creation,
        {
            "ticket_creation_node": "ticket_creation_node", # Loop back for retry
            END: END,
            "error_handling_node": "error_handling_node"
        }
    )

    # Edge from error handler to END
    workflow.add_edge("error_handling_node", END)

    # Compile the graph
    app = workflow.compile()
    # Ensure this print statement is clear and present
    print("---WORKFLOW COMPILED (or re-confirmed compilation)---")
    return app

# Example of how to run (optional, for testing within the subtask if possible, or for main.py later)
# if __name__ == "__main__":
#     graph = compile_workflow()
#     initial_state = {"original_input": "Test input for workflow", "tenant_id": "test_tenant"}
#     # To test retry for transcription:
#     # initial_state = {"original_input": "fail_transcription", "tenant_id": "test_tenant_retry_trans"}
#     # To test retry for analysis:
#     # initial_state = {"original_input": "trigger_analysis_fail_transcription", "tenant_id": "test_tenant_retry_analysis"}

#     final_state = graph.invoke(initial_state)
#     print("\n---FINAL WORKFLOW STATE---")
#     for key, value in final_state.items():
#         print(f"{key}: {value}")

#     print("\n---WEBSOCKET MESSAGES---")
#     for msg in final_state.get("websocket_message_log", []):
#         print(msg)
