from typing import TypedDict, Optional, List, Dict, Any

class AgentState(TypedDict):
    '''
    Represents the state of our AI agent workflow.
    '''
    original_input: Optional[Any] = None # Could be audio path, raw text, etc.
    tenant_id: Optional[str] = None

    transcription: Optional[str] = None
    transcription_error: Optional[str] = None
    transcription_retries: int = 0

    analysis_output: Optional[Dict[str, Any]] = None # e.g., {'sentiment': 'positive', 'entities': []}
    analysis_error: Optional[str] = None
    analysis_retries: int = 0

    ticket_id: Optional[str] = None
    ticket_creation_error: Optional[str] = None
    ticket_creation_retries: int = 0

    error_message: Optional[str] = None # General error message for the workflow
    is_successful: bool = False
    websocket_message_log: List[str] = [] # Log of messages sent via WebSocket
