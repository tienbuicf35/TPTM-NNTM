<h2 align="center">
    <a href="https://dainam.edu.vn/vi/khoa-cong-nghe-thong-tin">
    🎓 Faculty of Information Technology (DaiNam University)
    </a>
</h2>

<h2 align="center">
    🌱 XÂY DỰNG CHATBOT HỖ TRỢ NGƯỜI DÂN CHĂM SÓC CÂY TRỒNG
</h2>

<div align="center">
    <p align="center">
        <img alt="AIoTLab Logo" width="170" src="https://github.com/user-attachments/assets/711a2cd8-7eb4-4dae-9d90-12c0a0a208a2" />
        <img alt="AIoTLab Logo" width="180" src="https://github.com/user-attachments/assets/dc2ef2b8-9a70-4cfa-9b4b-f6c2f25f1660" />
        <img alt="DaiNam University Logo" width="200" src="https://github.com/user-attachments/assets/77fe0fd1-2e55-4032-be3c-b1a705a1b574" />
    </p>

[![AIoTLab](https://img.shields.io/badge/AIoTLab-green?style=for-the-badge)](https://www.facebook.com/DNUAIoTLab)
[![Faculty of Information Technology](https://img.shields.io/badge/Faculty%20of%20Information%20Technology-blue?style=for-the-badge)](https://dainam.edu.vn/vi/khoa-cong-nghe-thong-tin)
[![DaiNam University](https://img.shields.io/badge/DaiNam%20University-orange?style=for-the-badge)](https://dainam.edu.vn)

</div>

---

# 1. Giới thiệu hệ thống

Hệ thống **Chatbot hỗ trợ người dân chăm sóc cây trồng** là một ứng dụng ứng dụng trí tuệ nhân tạo (AI) nhằm hỗ trợ người dân tra cứu kiến thức nông nghiệp, tư vấn kỹ thuật chăm sóc cây trồng và giải đáp các câu hỏi liên quan đến sâu bệnh, phân bón, tưới tiêu cũng như các biện pháp canh tác.

Chatbot hoạt động theo thời gian thực, giúp người dùng tiếp cận thông tin nhanh chóng thông qua giao diện trò chuyện thân thiện trên nền tảng Web.

Dự án được xây dựng bằng các công nghệ hiện đại:

- **Flask** xây dựng Web Server và API.
- **OpenAI API / Gemini API** xử lý hội thoại thông minh.
- **FAISS** tìm kiếm ngữ nghĩa trong cơ sở tri thức.
- **Sentence Transformers** tạo vector embedding.
- **SQLite** lưu trữ dữ liệu người dùng và lịch sử hội thoại.
- **HTML/CSS/JavaScript** xây dựng giao diện Web Chatbot.

Hệ thống gồm hai chức năng chính:

### 1. Chatbot tư vấn chăm sóc cây trồng

- Trả lời các câu hỏi về kỹ thuật chăm sóc cây trồng.
- Tư vấn cách phòng và trị sâu bệnh.
- Hướng dẫn sử dụng phân bón và thuốc bảo vệ thực vật hợp lý.
- Đề xuất biện pháp chăm sóc theo từng giai đoạn sinh trưởng.

### 2. Quản trị hệ thống

- Quản lý lịch sử hội thoại.
- Quản lý cơ sở dữ liệu tri thức.
- Thống kê lượt truy cập và số lượng câu hỏi.
- Cập nhật dữ liệu kiến thức mới.

---

# 2. Công nghệ sử dụng

- Python 3.10+
- Flask
- OpenAI API / Gemini API
- FAISS
- Sentence Transformers
- SQLite3
- HTML
- CSS
- Bootstrap
- JavaScript

---

# 3. Hình ảnh các chức năng

## 1. Giao diện trang chủ Chatbot

*(Thêm hình giao diện chatbot tại đây)*

```
Ảnh: assets/home.png
```

*Giao diện trò chuyện giữa người dùng và chatbot.*

---

## 2. Chatbot tư vấn chăm sóc cây trồng

*(Thêm hình chatbot trả lời người dùng)*

```
Ảnh: assets/chat.png
```

*Chatbot trả lời các câu hỏi về chăm sóc cây trồng.*

---

## 3. Gợi ý biện pháp xử lý sâu bệnh

*(Thêm hình minh họa)*

```
Ảnh: assets/disease.png
```

*Hệ thống đưa ra nguyên nhân và biện pháp phòng trừ.*

---

## 4. Trang quản trị dữ liệu

*(Thêm hình dashboard quản trị)*

```
Ảnh: assets/admin.png
```

*Quản lý dữ liệu và thống kê hệ thống.*

---

# 4. Hướng dẫn cài đặt và sử dụng

## Bước 1: Clone project

```bash
git clone https://github.com/YourUsername/crop-chatbot.git

cd crop-chatbot
```

## Bước 2: Tạo môi trường ảo

```bash
python -m venv venv
```

Windows

```bash
venv\Scripts\activate
```

Linux/macOS

```bash
source venv/bin/activate
```

---

## Bước 3: Cài đặt thư viện

```bash
pip install -r requirements.txt
```

---

## Bước 4: Cấu hình API Key

Tạo file `.env`

```env
OPENAI_API_KEY=YOUR_API_KEY
```

Hoặc

```env
GOOGLE_API_KEY=YOUR_API_KEY
```

---

## Bước 5: Chạy chương trình

```bash
python app.py
```

---

## Bước 6: Truy cập giao diện Web

```
http://localhost:5000
```

---

# 5. Cấu trúc thư mục

```text
crop-chatbot/
│
├── app.py
├── config.py
├── chatbot.py
├── database.py
├── embeddings.py
├── vector_store.py
├── requirements.txt
├── .env
│
├── static/
│   ├── css/
│   ├── js/
│   └── images/
│
├── templates/
│   ├── index.html
│   ├── chat.html
│   └── admin.html
│
├── data/
│   ├── knowledge.pdf
│   └── vector_db/
│
├── uploads/
│
└── README.md
```

---

# 6. API Endpoints

| Method | Endpoint | Mô tả |
|---------|----------|-------|
| GET | / | Trang chủ |
| GET | /chat | Giao diện Chatbot |
| POST | /api/chat | Gửi câu hỏi |
| GET | /history | Lịch sử hội thoại |
| GET | /admin | Trang quản trị |
| GET | /api/statistics | Thống kê |

---

# 7. Quy trình hoạt động

```
Người dùng
      │
      ▼
Giao diện Web
      │
      ▼
Flask Server
      │
      ▼
Vector Database (FAISS)
      │
      ▼
Embedding Search
      │
      ▼
LLM (OpenAI/Gemini)
      │
      ▼
Sinh câu trả lời
      │
      ▼
Hiển thị cho người dùng
```

---

# 8. Kết quả đạt được

- Xây dựng chatbot hỗ trợ người dân chăm sóc cây trồng.
- Trả lời nhanh các câu hỏi về nông nghiệp.
- Hỗ trợ tra cứu kiến thức theo ngữ nghĩa.
- Giao diện trực quan, dễ sử dụng.
- Quản lý lịch sử hội thoại.
- Có khả năng mở rộng cơ sở dữ liệu tri thức.

---

# 9. Hướng phát triển

- Hỗ trợ nhận diện bệnh cây từ hình ảnh.
- Tích hợp giọng nói (Speech to Text).
- Hỗ trợ nhiều loại cây trồng hơn.
- Tích hợp dữ liệu thời tiết.
- Khuyến nghị lịch chăm sóc cây theo mùa vụ.
- Triển khai trên nền tảng Cloud.

---

# 10. Thông tin liên hệ

**Tác giả:** *Tên của bạn*

**GitHub:** https://github.com/your-github

**Email:** your-email@gmail.com
