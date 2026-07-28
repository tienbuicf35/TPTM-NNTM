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

Hệ thống **Chatbot hỗ trợ người dân chăm sóc cây trồng** là ứng dụng sử dụng trí tuệ nhân tạo nhằm hỗ trợ người dân tra cứu kiến thức nông nghiệp, tư vấn kỹ thuật chăm sóc cây trồng và giải đáp các câu hỏi liên quan đến sâu bệnh, phân bón, tưới tiêu, thời vụ cũng như các biện pháp canh tác phù hợp.

Hệ thống sử dụng mô hình ngôn ngữ lớn (LLM) kết hợp với cơ sở dữ liệu tri thức để cung cấp các câu trả lời chính xác, nhanh chóng và dễ hiểu. Người dùng chỉ cần nhập câu hỏi bằng ngôn ngữ tự nhiên, chatbot sẽ tự động phân tích và đưa ra câu trả lời phù hợp.

Dự án được xây dựng bằng các công nghệ hiện đại:

- **Flask** xây dựng Web Server và REST API.
- **Google Gemini API** xử lý hội thoại thông minh.
- **LangChain** quản lý luồng xử lý và kết nối mô hình AI.
- **FAISS** lưu trữ và tìm kiếm dữ liệu theo ngữ nghĩa.
- **Sentence Transformers** tạo vector embedding cho tài liệu.
- **SQLite** lưu trữ lịch sử hội thoại và thông tin người dùng.
- **HTML, CSS, Bootstrap, JavaScript** xây dựng giao diện Web.

Hệ thống gồm hai chức năng chính:

### 1. Chatbot tư vấn cây trồng

- Trả lời câu hỏi về kỹ thuật chăm sóc cây.
- Tư vấn phòng và điều trị sâu bệnh.
- Hướng dẫn sử dụng phân bón.
- Tư vấn tưới nước theo từng giai đoạn.
- Đề xuất phương pháp canh tác phù hợp.

### 2. Quản lý hệ thống

- Quản lý lịch sử hội thoại.
- Quản lý cơ sở dữ liệu tri thức.
- Thống kê số lượng người dùng và câu hỏi.
- Cập nhật dữ liệu kiến thức mới.

---

# 2. Công nghệ sử dụng

- Python 3.10+
- Flask
- Google Gemini API
- LangChain
- FAISS
- Sentence Transformers
- SQLite3
- HTML5
- CSS3
- Bootstrap 5
- JavaScript

---

# 3. Hình ảnh các chức năng

## 1. Giao diện Chatbot hỗ trợ người dân chăm sóc cây trồng

<img width="1350" height="336" alt="Ảnh chụp màn hình 2026-07-28 232726" src="https://github.com/user-attachments/assets/bd4f9384-5f91-41e7-b8c3-6e9f1587c276" />
---

## 2. Hệ thống tư vấn và hỗ trợ chăm sóc cây trồng

<img width="1365" height="828" alt="image" src="https://github.com/user-attachments/assets/7bd32420-58f9-4d49-a59a-9be0bb6746db" />


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

Kích hoạt môi trường:

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

## Bước 4: Cấu hình API

Tạo file `.env`

```env
GOOGLE_API_KEY=YOUR_API_KEY
```

---

## Bước 5: Chạy hệ thống

```bash
python app.py
```

---

## Bước 6: Truy cập giao diện Web

```
http://127.0.0.1:5000
```

---

# 5. Cấu trúc thư mục

```text
crop-chatbot/
│
├── app.py
├── chatbot.py
├── config.py
├── database.py
├── embeddings.py
├── vector_store.py
├── requirements.txt
├── .env
│
├── data/
│   ├── knowledge.pdf
│   └── vector_db/
│
├── static/
│   ├── css/
│   ├── js/
│   └── images/
│
├── templates/
│   ├── index.html
│   ├── admin.html
│   └── chat.html
│
├── uploads/
│
└── README.md
```

---

# 6. API Endpoints

| Method | Endpoint | Mô tả |
|---------|----------|------|
| GET | / | Trang chủ |
| GET | /chat | Giao diện chatbot |
| POST | /api/chat | Gửi câu hỏi tới chatbot |
| GET | /history | Lịch sử hội thoại |
| GET | /admin | Trang quản trị |
| GET | /api/statistics | Thống kê hệ thống |

---

# 7. Quy trình hoạt động

```text
Người dùng
      │
      ▼
Giao diện Web
      │
      ▼
Flask Server
      │
      ▼
Xử lý câu hỏi
      │
      ▼
FAISS Vector Database
      │
      ▼
Gemini API
      │
      ▼
Sinh câu trả lời
      │
      ▼
Hiển thị kết quả cho người dùng
```

---

# 8. Kết quả đạt được

- Xây dựng thành công chatbot hỗ trợ chăm sóc cây trồng.
- Trả lời tự động các câu hỏi về nông nghiệp bằng tiếng Việt.
- Hỗ trợ tra cứu kiến thức theo ngữ nghĩa.
- Giao diện trực quan, thân thiện với người dùng.
- Quản lý lịch sử hội thoại.
- Dễ dàng mở rộng cơ sở tri thức và tích hợp thêm nhiều loại cây trồng.

---

# 9. Hướng phát triển

- Nhận diện bệnh cây từ hình ảnh bằng AI.
- Tích hợp nhận dạng giọng nói.
- Hỗ trợ nhiều loại cây trồng hơn.
- Tích hợp dữ liệu thời tiết theo khu vực.
- Gợi ý lịch chăm sóc cây theo mùa vụ.
- Triển khai trên nền tảng Cloud.
- Phát triển ứng dụng trên Android và iOS.

---

# 10. Thông tin liên hệ

**Tác giả:** *Bùi Văn Tiến*

**GitHub:** https://github.com/your-github

**Email:** your-email@gmail.com
