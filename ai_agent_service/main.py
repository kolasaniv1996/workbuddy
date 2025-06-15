from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, Any, Dict

from app.state import AgentState
from app.workflow import compile_workflow

# Initialize FastAPI app
app = FastAPI(
    title="AI Agent Service",
    description="Service for orchestrating AI agent workflows using LangGraph.",
    version="0.1.0",
)

# Compile the LangGraph workflow on startup
try:
    langgraph_app = compile_workflow()
        # This print is in workflow.py's compile_workflow, logging it once is enough.
        # print("LangGraph workflow compiled successfully.") # Covered by compile_workflow internal log
except Exception as e:
        # TODO: Use a proper logger here for production
        print(f"CRITICAL: Error compiling LangGraph workflow on startup: {e}")
    # Depending on the desired behavior, you might want to prevent FastAPI from starting
    # or allow it to start with a non-functional workflow endpoint.
    langgraph_app = None # Or a dummy app that returns errors

class WorkflowRequest(BaseModel):
    original_input: Any
    tenant_id: Optional[str] = "default_tenant" # Example default
    initial_state_override: Optional[Dict[str, Any]] = None # For more complex initializations

class WorkflowResponse(BaseModel):
    final_state: Dict[str, Any]
    websocket_messages_sent: list[str] # New field
    # You might want to be more specific about what the response contains
    # For example:
    # ticket_id: Optional[str]
    # status: str
    # error_message: Optional[str]
    # websocket_log: List[str]


@app.on_event("startup")
async def startup_event():
    if langgraph_app is None:
            # TODO: Use a proper logger here for production
            print("WARNING: LangGraph App is None. Workflow endpoint will likely not function.")
        else:
            print("INFO: LangGraph App compiled and available.")
    # You could add other startup logic here, like connecting to DB, Redis, etc.
        print("INFO: FastAPI application startup sequence complete.")

@app.post("/invoke_workflow", response_model=WorkflowResponse)
async def invoke_workflow_endpoint(request: WorkflowRequest):
    '''
    Invokes the AI agent workflow with the given input.
    '''
    if langgraph_app is None:
            # TODO: Use a proper logger here for production
            print(f"ERROR: Invocation attempt for tenant {request.tenant_id} but workflow engine not available.")
            raise HTTPException(status_code=503, detail="Workflow engine not available. Please check server logs.")

    # TODO: Implement actual tenant isolation and validation based on tenant_id.
    # This might involve checking if the tenant_id is valid, exists in a database,
    # and ensuring that data access within the workflow is appropriately scoped.
    initial_state: AgentState = {
        "original_input": request.original_input,
        "tenant_id": request.tenant_id, # tenant_id is set here
        "transcription": None,
        "transcription_error": None,
        "transcription_retries": 0,
        "analysis_output": None,
        "analysis_error": None,
        "analysis_retries": 0,
        "ticket_id": None,
        "ticket_creation_error": None,
        "ticket_creation_retries": 0,
        "error_message": None,
        "is_successful": False,
        "websocket_message_log": []
    }

    if request.initial_state_override:
        # Carefully update initial_state with overrides.
        # Consider validation or specific logic for what can be overridden.
        for key, value in request.initial_state_override.items():
            if key in initial_state: # type: ignore
                initial_state[key] = value # type: ignore
            else:
                # Optionally raise an error or log a warning for unknown keys
                    # Optionally raise an error or log a warning for unknown keys
                    print(f"WARNING: Unknown key '{key}' in initial_state_override for tenant {request.tenant_id}.")


        print(f"INFO: Invoking workflow for tenant: {request.tenant_id}, input type: {type(request.original_input).__name__}, input: {request.original_input}")
        # TODO: Add OpenTelemetry span here for the entire workflow invocation
    try:
        # LangGraph's .invoke() is synchronous by default.
        # For long-running tasks, you'd typically run this in a background thread/task.
        # from fastapi import BackgroundTasks
        # async def run_workflow_background(initial_state_dict):
        #     final_state = langgraph_app.invoke(initial_state_dict)
        #     # Here you would typically store the result or send a notification,
        #     # as you can't directly return it from a background task to the client.
        #     print(f"Background workflow completed for tenant {initial_state_dict.get('tenant_id')}")
        #
        # background_tasks.add_task(run_workflow_background, dict(initial_state))
        # return {"message": "Workflow started in background."}
        #
        # For this iteration, we'll keep it synchronous for simplicity.
        final_state = langgraph_app.invoke(dict(initial_state)) # Ensure it's a dict if AgentState is a TypedDict
            success_status = final_state.get('is_successful', False)
            print(f"INFO: Workflow completed for tenant: {request.tenant_id}. Success: {success_status}")
            if not success_status:
                print(f"INFO: Workflow for tenant {request.tenant_id} ended with error: {final_state.get('error_message')}")

    except Exception as e:
            # TODO: Log exception details with a proper logger (e.g., stack trace)
            print(f"ERROR: Error invoking workflow for tenant {request.tenant_id}: {e}")
        raise HTTPException(status_code=500, detail=f"Workflow invocation error: {str(e)}")

    # Consider what parts of the final_state to return
    # Returning the entire state might be too verbose or expose internal details.

    print(f"INFO: Tenant {request.tenant_id}: Workflow final state: {final_state}")

    # TODO: Implement actual WebSocket message dispatch here.
    # For example, iterate through final_state.get('websocket_message_log', [])
    # and send messages to the appropriate tenant-specific WebSocket connection or channel.
    # E.g., websocket_manager.send_to_tenant(request.tenant_id, message)
    # For now, these messages are returned as part of the final_state in the response.

    return WorkflowResponse(
        final_state=dict(final_state), # type: ignore
        websocket_messages_sent=final_state.get("websocket_message_log", []) # type: ignore
    )

# To run this app (from the root of ai_agent_service directory):
# uvicorn main:app --reload
