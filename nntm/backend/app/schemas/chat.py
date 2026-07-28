from typing import Optional
from typing import List

from pydantic import BaseModel, Field


class ChatResponse(BaseModel):
    session_id: str
    answer: str
    plant_type: Optional[str] = None
    image_analysis: Optional[str] = None


class HistoryItem(BaseModel):
    role: str
    content: str


class ChatSessionState(BaseModel):
    session_id: str
    plant_type: Optional[str] = None
    history: List[HistoryItem] = Field(default_factory=list)
