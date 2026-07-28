<h2 align="center">
    <a href="https://dainam.edu.vn/vi/khoa-cong-nghe-thong-tin">
        🎓 Faculty of Information Technology (DaiNam University)
    </a>
</h2>
 
<h2 align="center">
    ỨNG DỤNG AI CHATBOT HỖ TRỢ NGƯỜI DÂN CHĂM SÓC CÂY TRỒNG
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

Hệ thống **Plant Care Chatbot** là ứng dụng sử dụng Trí tuệ nhân tạo (AI) và Mô hình ngôn ngữ lớn (LLM) hỗ trợ người dân, nhà nông tự động tư vấn kĩ thuật trồng trọt, chẩn đoán sâu bệnh và đề xuất quy trình chăm sóc cây trồng theo thời gian thực.

Dự án được xây dựng bằng các công nghệ hiện đại:
- **FastAPI**: Cung cấp API backend xử lý logic, quản lý hội thoại và kết nối cơ sở dữ liệu.
- **React + Vite + Tailwind CSS**: Xây dựng giao diện Chatbot hiện đại, mượt mà và trực quan.
- **LLM / OpenAI / Ollama**: Mô hình trí tuệ nhân tạo tư vấn ngôn ngữ tự nhiên và phân tích hình ảnh bệnh cây trồng.
- **SQLite**: Lưu trữ lịch sử hội thoại, thông tin người dùng và dữ liệu tư vấn chăm sóc.
- **Docker & Docker Compose**: Đóng gói và triển khai ứng dụng dễ dàng.

---

# 2. Công nghệ sử dụng

- **Backend**: Python 3.8+, FastAPI, Uvicorn, SQLAlchemy
- **Frontend**: React, Vite, Tailwind CSS
- **AI Engine**: OpenAI API (GPT-4o) / Ollama Local (LLaMA, Llava)
- **Database**: SQLite3
- **Containerization**: Docker, Docker Compose

---

# 3. Hình ảnh giao diện ứng dụng

## 1. Giao diện Chatbot tư vấn chăm sóc cây trồng

![Giao diện chính Chatbot](https://raw.githubusercontent.com/user-attachments/assets/image_fcc0f7.png)

*Giao diện nhắn tin trực quan, hỗ trợ người dùng tương tác tư vấn kĩ thuật trồng trọt*

---

## 2. Phân tích ảnh và tư vấn sâu bệnh cây trồng

![Phân tích sâu bệnh qua hình ảnh](https://raw.githubusercontent.com/user-attachments/assets/image_fcb5f6.png)

*AI phân tích hình ảnh lá/cây bệnh do người dùng gửi lên và đưa ra hướng điều trị*

---

# 4. Hướng dẫn cài đặt và sử dụng

### Cách 1: Chạy bằng Docker Compose (Nhanh nhất)

Tại thư mục gốc của dự án, chạy lệnh:
```bash
docker-compose up --build
