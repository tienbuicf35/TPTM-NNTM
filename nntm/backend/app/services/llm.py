import base64
import json
from urllib import request as urlrequest
from urllib.error import HTTPError, URLError
from typing import Any, Dict, List, Optional

from openai import OpenAI

from app.core.config import get_settings


SYSTEM_PROMPT = """Bạn là một chuyên gia nông nghiệp có kinh nghiệm thực tế.

Nhiệm vụ của bạn là tư vấn cho người dân cách chăm sóc cây trồng dựa trên câu hỏi của họ.

Yêu cầu:
- Trả lời bằng tiếng Việt, dễ hiểu, thân thiện
- Không dùng thuật ngữ quá chuyên môn
- Luôn đưa ra:
  1. Nguyên nhân có thể
  2. Cách xử lý cụ thể
  3. Lưu ý khi chăm sóc

Nếu không chắc chắn, hãy nói rõ và đưa ra nhiều khả năng.
Nếu người dùng cung cấp loại cây, hãy ưu tiên ngữ cảnh đó.
Nếu người dùng gửi ảnh, hãy quan sát các dấu hiệu có thể nhìn thấy và mô tả ngắn gọn khả năng vấn đề.
"""


def _client() -> Optional[OpenAI]:
    settings = get_settings()
    if not settings.openai_api_key:
        return None
    return OpenAI(api_key=settings.openai_api_key)


def _ollama_chat(model: str, messages: List[Dict[str, Any]]) -> str:
    settings = get_settings()
    payload = {
        "model": model,
        "messages": messages,
        "stream": False,
    }
    req = urlrequest.Request(
        settings.ollama_base_url.rstrip("/") + "/api/chat",
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urlrequest.urlopen(req, timeout=120) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return data["message"]["content"].strip()
    except (HTTPError, URLError, KeyError, ValueError) as exc:
        raise RuntimeError("Ollama request failed") from exc


def build_messages(
    user_input: str,
    plant_type: Optional[str] = None,
    history: Optional[List[Dict[str, str]]] = None,
):
    context = SYSTEM_PROMPT
    if plant_type:
        context += f"\nLoại cây người dùng quan tâm: {plant_type}\n"

    messages = [{"role": "system", "content": context}]
    if history:
        messages.extend(history[-8:])
    messages.append({"role": "user", "content": user_input})
    return messages


def chat_answer(
    user_input: str,
    plant_type: Optional[str] = None,
    history: Optional[List[Dict[str, str]]] = None,
) -> str:
    client = _client()
    settings = get_settings()

    if client is None:
        if settings.ollama_text_model:
            messages = build_messages(user_input, plant_type, history)
            try:
                return _ollama_chat(settings.ollama_text_model, messages)
            except RuntimeError:
                return (
                    "Mình chưa kết nối được Ollama text model, nên đây là câu trả lời mô phỏng.\n\n"
                    "1. Nguyên nhân có thể: cây thiếu nước, thiếu dinh dưỡng, sâu bệnh hoặc bị nấm.\n"
                    "2. Cách xử lý: kiểm tra lá, thân, đất; tưới vừa đủ; cắt bỏ phần hư; bổ sung phân phù hợp.\n"
                    "3. Lưu ý: theo dõi 3-5 ngày, tránh tưới quá nhiều và tránh bón phân quá tay."
                )
        return (
            "Mình chưa có `OPENAI_API_KEY`, nên đây là câu trả lời mô phỏng.\n\n"
            "1. Nguyên nhân có thể: cây thiếu nước, thiếu dinh dưỡng, sâu bệnh hoặc bị nấm.\n"
            "2. Cách xử lý: kiểm tra lá, thân, đất; tưới vừa đủ; cắt bỏ phần hư; bổ sung phân phù hợp.\n"
            "3. Lưu ý: theo dõi 3-5 ngày, tránh tưới quá nhiều và tránh bón phân quá tay."
        )

    response = client.responses.create(
        model=settings.openai_model,
        input=build_messages(user_input, plant_type, history),
    )
    return response.output_text.strip()


def analyze_image(image_bytes: bytes) -> str:
    client = _client()
    settings = get_settings()
    if client is None:
        if settings.ollama_vision_model:
            encoded = base64.b64encode(image_bytes).decode("utf-8")
            messages = [
                {
                    "role": "system",
                    "content": SYSTEM_PROMPT + "\nHãy quan sát ảnh cây trồng và mô tả ngắn gọn dấu hiệu bất thường nếu có.",
                },
                {
                    "role": "user",
                    "content": "Hãy phân tích sơ bộ tình trạng cây trong ảnh này.",
                    "images": [encoded],
                },
            ]
            try:
                return _ollama_chat(settings.ollama_vision_model, messages)
            except RuntimeError:
                return "Chưa phân tích ảnh được vì Ollama chưa sẵn sàng hoặc model không hỗ trợ ảnh."
        return "Chưa phân tích ảnh được vì thiếu `OPENAI_API_KEY`. Hệ thống chỉ ghi nhận đã nhận ảnh."

    encoded = base64.b64encode(image_bytes).decode("utf-8")
    response = client.responses.create(
        model=settings.openai_model,
        input=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT + "\nHãy quan sát ảnh cây trồng và mô tả ngắn gọn dấu hiệu bất thường nếu có.",
            },
            {
                "role": "user",
                "content": [
                    {"type": "input_text", "text": "Hãy phân tích sơ bộ tình trạng cây trong ảnh này."},
                    {
                        "type": "input_image",
                        "image_url": f"data:image/jpeg;base64,{encoded}",
                    },
                ],
            },
        ],
    )
    return response.output_text.strip()
