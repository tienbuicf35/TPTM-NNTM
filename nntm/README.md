# Plant Care Chatbot

Fullstack demo cho chatbot tu van cham soc cay trong.

## Tong quan

- Frontend: React + Vite + Tailwind
- Backend: FastAPI
- Luu du lieu: SQLite local
- AI:
  - OpenAI API neu co `OPENAI_API_KEY`
  - Ollama local neu khong co OpenAI key
- Co ho tro gui anh cay trong de phan tich so bo

## Cau truc

- `backend/`: API FastAPI, model, schema, luu lich su hoi thoai
- `frontend/`: giao dien chat

## Yeu cau

- Python 3.8+ cho backend
- Node.js 18+ cho frontend
- Ollama neu muon chay local khong dung OpenAI

## Chay backend

### 1. Tao env

Tren Windows PowerShell:

```powershell
cd backend
Copy-Item .env.example .env
```

### 2. Cai dependency

```powershell
pip install -r requirements.txt
```

### 3. Chay backend

```powershell
uvicorn app.main:app --reload
```

Backend mac dinh chay tai `http://localhost:8000`.

File SQLite `plantcare.db` se tu tao trong thu muc `backend/` khi backend chay lan dau.

## Chon AI backend

Backend se uu tien theo thu tu:

1. Neu co `OPENAI_API_KEY` thi dung OpenAI API.
2. Neu khong co key, backend dung Ollama local.

### Ollama local

Neu chay local, backend dang dung 2 model rieng:

- `OLLAMA_TEXT_MODEL=qwen2.5:3b` cho chat text
- `OLLAMA_VISION_MODEL=llava` cho anh

Tai model:

```powershell
ollama pull qwen2.5:3b
ollama pull llava
```

Neu `ollama serve` bao loi port 11434 dang duoc dung, co nghia la Ollama da chay san.

## Chay frontend

### 1. Tao env

```powershell
cd frontend
Copy-Item .env.example .env
```

### 2. Cai dependency

```powershell
npm install
```

### 3. Chay frontend

```powershell
npm run dev
```

Frontend mac dinh chay tai `http://localhost:5173`.

## Bien moi truong

### Backend

- `OPENAI_API_KEY`: OpenAI API key, neu co
- `OPENAI_MODEL`: model OpenAI, mac dinh `gpt-4.1-mini`
- `OLLAMA_BASE_URL`: URL Ollama local, mac dinh `http://localhost:11434`
- `OLLAMA_TEXT_MODEL`: model Ollama cho chat text, mac dinh `qwen2.5:3b`
- `OLLAMA_VISION_MODEL`: model Ollama cho phan tich anh, mac dinh `llava`
- `DATABASE_URL`: chuoi ket noi DB, mac dinh `sqlite:///./plantcare.db`
- `CORS_ORIGINS`: danh sach origin frontend, mac dinh `http://localhost:5173`

### Frontend

- `VITE_API_BASE_URL`: URL backend, mac dinh `http://localhost:8000`

## API

- `GET /health`
- `POST /chat`

### `POST /chat`

Gui `multipart/form-data` voi cac truong:

- `message`: noi dung cau hoi
- `session_id`: id hoi thoai, tuy chon
- `plant_type`: loai cay, tuy chon
- `image`: file anh, tuy chon

## Luong hien tai

- Chat text se dung `OLLAMA_TEXT_MODEL` neu khong co OpenAI key.
- Anh se dung `OLLAMA_VISION_MODEL` neu khong co OpenAI key.
- Neu khong co model phu hop, backend tra ve cau tra loi fallback.

## Ghi chu

- Neu muon doi backend sang OpenAI, chi can set `OPENAI_API_KEY` trong `backend/.env`.
- Neu muon chuyen model Ollama, sua `backend/.env` va pull dung model tuong ung.
