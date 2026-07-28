from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from sqlalchemy.orm import Session
from typing import Dict, List, Optional

from app.db.session import get_db
from app.models.chat import ChatMessage, ChatSession
from app.schemas.chat import ChatResponse
from app.services.llm import analyze_image, chat_answer

router = APIRouter(prefix="", tags=["chat"])


def _serialize_history(messages: List[ChatMessage]) -> List[Dict[str, str]]:
    return [{"role": message.role, "content": message.content} for message in messages]


@router.get("/health")
def health():
    return {"status": "ok"}


@router.post("/chat", response_model=ChatResponse)
async def chat(
    message: str = Form(...),
    session_id: Optional[str] = Form(None),
    plant_type: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
):
    if session_id:
        session = db.get(ChatSession, session_id)
        if session is None:
            raise HTTPException(status_code=404, detail="Session not found")
        if plant_type and not session.plant_type:
            session.plant_type = plant_type
    else:
        session = ChatSession(plant_type=plant_type)
        db.add(session)
        db.flush()

    user_message = ChatMessage(
        session_id=session.id,
        role="user",
        content=message,
    )
    db.add(user_message)
    db.flush()

    messages = (
        db.query(ChatMessage)
        .filter(ChatMessage.session_id == session.id)
        .order_by(ChatMessage.created_at.asc(), ChatMessage.id.asc())
        .all()
    )
    history = _serialize_history(messages[:-1])

    image_analysis = None
    if image is not None:
        image_bytes = await image.read()
        if image_bytes:
            image_analysis = analyze_image(image_bytes)

    answer = chat_answer(message, plant_type=session.plant_type, history=history)
    if image_analysis:
        answer = f"{answer}\n\nPhân tích ảnh sơ bộ:\n{image_analysis}"

    assistant_message = ChatMessage(
        session_id=session.id,
        role="assistant",
        content=answer,
        image_url=None,
    )
    db.add(assistant_message)
    db.commit()

    return ChatResponse(
        session_id=session.id,
        answer=answer,
        plant_type=session.plant_type,
        image_analysis=image_analysis,
    )
