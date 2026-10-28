# lazy-website-compact

Skill gọn để tạo, sửa và bàn giao website giới thiệu dùng được từ tài liệu trên máy hoặc Google Drive. Phù hợp với landing page, portfolio, trang dịch vụ, trang chia sẻ tài liệu và website doanh nghiệp nhỏ.

- [Xem landing page](https://trungbuu.github.io/lazy-website-compact/)
- [Tải ZIP từ GitHub](https://github.com/trungbuu/lazy-website-compact/archive/refs/heads/main.zip)

## Cài nhanh

```bash
git clone https://github.com/trungbuu/lazy-website-compact.git
```

Giữ nguyên cả thư mục rồi đặt vào đường dẫn skills mà môi trường agent của bạn hỗ trợ. Điểm vào là `SKILL.md`; hướng dẫn cho người dùng nằm ở `HUONG-DAN.md`.

## Cấu trúc

```text
lazy-website-compact/
├── SKILL.md
├── HUONG-DAN.md
├── references/source-intake.md
├── scripts/check_static.py
└── docs/index.html
```

## Dùng thử

```text
Dùng lazy-website-compact tạo một landing page cho dịch vụ của tôi.
Nguồn nội dung nằm tại [đường dẫn trên máy hoặc link Google Drive].
Khách mục tiêu là [đối tượng]. CTA thật là [email, số điện thoại hoặc URL].
Hãy dựng bản chạy được, kiểm trên mobile và desktop rồi báo phần còn cần tôi duyệt.
```

Kiểm một website HTML tĩnh:

```bash
python3 scripts/check_static.py <thu-muc-website-cong-khai>
```

## Landing page

Trang giới thiệu nằm tại `docs/index.html` và có thể phát hành trực tiếp bằng GitHub Pages. Form nhận tài liệu đã nối với Lead Magnet OS: hệ thống lưu họ tên, email, lĩnh vực cùng nguồn truy cập, gửi email chỉ chứa đường dẫn tài liệu và chỉ hiện đường dẫn trên trang sau khi đăng ký được ghi nhận thành công. Campaign này không tạo Google Docs hoặc link báo cáo riêng.
