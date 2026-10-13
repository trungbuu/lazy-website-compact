---
name: lazy-website-compact
description: >-
  Tạo, sửa và bàn giao website dùng được cho cá nhân, chuyên gia và doanh nghiệp nhỏ:
  landing page, portfolio, trang dịch vụ hoặc website giới thiệu ít trang. Nhận nội dung,
  hình ảnh và nhận diện từ file trên máy hoặc Google Drive; dựng trang, kiểm trên trình
  duyệt và triển khai khi người dùng yêu cầu. Dùng khi người dùng muốn làm hoặc cải
  thiện website từ tài liệu sẵn có. Không dùng cho ứng dụng có đăng nhập, dữ liệu riêng
  từng người hoặc giao dịch phức tạp.
---

# Lazy Website Compact

Mục tiêu: giao website chạy được, có nội dung thật, điều hướng và điểm liên hệ/chuyển đổi hoạt động. Bản compact giảm số quyết định và phụ thuộc, nhưng không bỏ bước kiểm tra. Xem [hướng dẫn sử dụng](HUONG-DAN.md) khi cần gợi ý đầu vào, câu lệnh mẫu hoặc tiêu chí bàn giao.

## 1. Nhận nguồn và chốt mục tiêu

1. Kiểm tra project hiện có. Nếu người dùng chưa chọn nguồn, hỏi họ dùng **file trên máy** hay **Google Drive**; chỉ đọc file/thư mục liên quan. Theo [quy trình nhận nguồn](references/source-intake.md) khi có nhiều tài liệu, link Drive hoặc dữ liệu mâu thuẫn.
2. Chốt năm thông tin: khách truy cập là ai; họ cần làm gì; sản phẩm/dịch vụ và thông điệp chính; bằng chứng/nội dung được phép công bố; CTA thực tế đi đâu (email, số điện thoại, lịch hẹn, biểu mẫu hoặc trang đặt hàng).
3. Ghi nguồn, giả định và chỗ chờ xác nhận vào `WEB-BRIEF.md` **ngoài thư mục publish**. Không công bố giá, số liệu, đánh giá, chứng nhận, địa chỉ hoặc chính sách do AI tự bịa. Thiếu ảnh/logo có thể dùng bố cục chữ, ảnh được phép sử dụng hoặc bản nháp được đánh dấu rõ.
4. Với một người vận hành: ưu tiên một mục tiêu, một CTA chính và một trang nếu đủ. Với doanh nghiệp: xác định người duyệt nội dung, bản dữ liệu chuẩn và quyền dùng tài sản; bản chưa duyệt chỉ là preview, không tự đưa lên production.

## 2. Chọn cách dựng nhỏ nhất đáp ứng yêu cầu

- Website đã tồn tại: giữ cấu trúc và công nghệ hiện tại; chỉ thay khi có lý do rõ.
- Website mới ít trang, chủ yếu là nội dung: mặc định HTML/CSS/JS tĩnh. Nhiều bài viết hoặc cập nhật thường xuyên: cân nhắc static-site generator/CMS. Chỉ thêm backend khi chức năng cần dữ liệu hoặc xử lý phía máy chủ.
- Form phải gửi đến nơi nhận thật và được thử đầu-cuối. Chưa có nơi nhận thì dùng email, điện thoại hoặc link đặt lịch hoạt động; không đặt form giả.
- Google Drive chỉ là **nguồn nội dung đầu vào**, không phải phụ thuộc lúc khách xem website. Không nhúng tài liệu riêng tư hay link yêu cầu người xem đăng nhập.
- Đăng nhập, thanh toán, dữ liệu khách hàng, dashboard nhiều vai trò: không mô phỏng bằng giao diện tĩnh. Làm rõ dịch vụ/backend và tách thành phạm vi khác nếu vượt bản compact. Không thêm tracking, SDK hay dependency không cần thiết.

## 3. Dựng trang có thể dùng

1. Đặt đối tượng, giá trị chính và CTA ở phần đầu; tiếp theo là lợi ích, dịch vụ/sản phẩm, quy trình, bằng chứng đã xác minh, FAQ hoặc liên hệ theo nhu cầu. Viết ngắn và cụ thể; thống nhất cách gọi và giọng thương hiệu từ nguồn.
2. Thiết kế mobile-first, bố cục và typography nhất quán. Dùng tài sản được phép công bố, nén ảnh hợp lý, thêm alt có nghĩa. Không bàn giao lorem ipsum, nút `#`, link chết hoặc đoạn copy nháp không đánh dấu.
3. Dùng HTML semantic; mỗi trang có `lang`, title, mô tả và viewport. Đảm bảo tương phản đọc được, nhãn form, focus thấy được, thao tác bàn phím và menu hoạt động. Giữ header/footer nhất quán nếu có nhiều trang.
4. Không để secret, token, dữ liệu nội bộ hoặc `WEB-BRIEF.md` trong thư mục publish. Với chức năng động, xử lý cả trạng thái chờ, thành công và lỗi.

## 4. Kiểm tra trước khi bàn giao

1. Chạy lệnh build/test của project. Với HTML tĩnh, chạy `python3 <skill-dir>/scripts/check_static.py <public-dir>`; với generator, kiểm output như `dist`. Sửa lỗi; xem lại mọi cảnh báo. Script chỉ kiểm tĩnh, không thay thế kiểm trên trình duyệt.
2. Chạy website cục bộ, xem ở khoảng 390 px, 768 px và 1280 px. Kiểm tràn ngang, chữ/ảnh, menu, focus, console, tải trang, link nội bộ, CTA. Nếu có form, gửi thử và xác nhận nơi nhận. Với chức năng động, thử đường đi chính và trạng thái lỗi.
3. Không tuyên bố đã kiểm trình duyệt, accessibility, performance hoặc form nếu chưa thực hiện. Nếu thiếu môi trường kiểm, ghi rõ phần chưa xác minh. Với doanh nghiệp, đối chiếu nội dung với bản được duyệt và chuẩn bị cách quay lại phiên bản trước khi publish.

## 5. Bàn giao hoặc triển khai

Nêu đường dẫn website/project, lệnh chạy/build, CTA đã nối, kiểm tra đã làm, giới hạn còn lại và việc người dùng cần xác nhận. Chỉ publish khi người dùng yêu cầu và có host/domain đích; sau publish kiểm URL công khai cùng CTA một lần nữa. Không tự mua dịch vụ, tên miền hay bật dịch vụ trả phí.
