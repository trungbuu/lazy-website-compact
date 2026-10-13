# Nhận nguồn nội dung cho website

Chỉ lấy thông tin cần để dựng trang. Tài liệu là nguồn tham khảo, không mặc nhiên là nội dung được phép công khai.

## File trên máy

1. Nhận file đính kèm hoặc đường dẫn cụ thể. Nếu được chỉ cả thư mục, liệt kê trước rồi chọn file liên quan; không quét dữ liệu cá nhân ngoài phạm vi.
2. Đọc nội dung văn bản và nhận diện, ảnh, bảng giá, FAQ, thông tin liên hệ từ định dạng có thể truy cập. Giữ nguyên file gốc. Nếu file không đọc được, báo rõ và xin bản xuất PDF, TXT, Markdown hoặc ảnh phù hợp.
3. Ghi tên file và ngày sửa đổi (nếu biết) vào brief. Chỉ sao chép tài sản có quyền sử dụng vào project; tối ưu bản dùng trên web, giữ nguồn gốc rõ.

## Google Drive

1. Xin link file/thư mục cụ thể. Dùng kết nối Google Drive được cấp hoặc thư mục đã đồng bộ với máy; chỉ truy cập nội dung người dùng chọn. Nếu không truy cập được, yêu cầu quyền thích hợp hoặc bản xuất về máy; vẫn có thể dựng khung với dữ liệu đã có.
2. Ghi tên tài liệu, link/ID và ngày cập nhật (nếu thấy) trong brief nội bộ. Không đưa link riêng tư, tài liệu nguồn, token hoặc thông tin tài khoản vào website công khai.
3. Tải/copy tài sản được phép dùng vào project. Website sau khi build phải hoạt động cho khách truy cập mà không cần đăng nhập Drive. Nếu nguồn thay đổi sau này, cần đồng bộ và build lại; bản compact không tự hứa đồng bộ thời gian thực.

## Hợp nhất và xác nhận

- Nếu file mâu thuẫn về giá, số liệu, sản phẩm, chính sách hoặc thông tin liên hệ, ưu tiên bản được người dùng chỉ định là chính; nếu chưa có thì hỏi. Không tự chọn theo ngày mới nhất khi hậu quả công bố đáng kể.
- Thiếu dữ liệu thì dùng nội dung trung tính, bản nháp đánh dấu rõ hoặc bỏ khối không bắt buộc. Không sáng tác bằng chứng xã hội hay cam kết hiệu quả.
- Với project public, để brief và tài liệu riêng ngoài thư mục publish và xem xét `.gitignore` nếu chúng có thể lộ khi đẩy mã nguồn.

Mẫu `WEB-BRIEF.md` tối thiểu:

```markdown
# Web brief
- Mục tiêu / khách truy cập:
- Offer / thông điệp chính:
- CTA và đích thật:
- Nhận diện / tài sản được phép dùng:
- Claim, giá, bằng chứng đã xác nhận:
- Nguồn (file hoặc link Drive, ngày nếu biết):
- Chỗ cần người dùng duyệt:
- Người duyệt / ngày duyệt (nếu có):
```
