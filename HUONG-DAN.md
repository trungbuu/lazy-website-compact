# Hướng dẫn sử dụng lazy-website-compact

Skill này giúp tạo hoặc sửa một website giới thiệu có thể dùng thực tế: mở được trên điện thoại và máy tính, có nội dung rõ, đường dẫn hoạt động và một cách liên hệ/đặt lịch/mua hàng thật. Phù hợp với landing page, portfolio, trang dịch vụ hoặc website doanh nghiệp nhỏ. Không thay thế dự án web-app có đăng nhập, thanh toán hoặc dữ liệu cá nhân phức tạp.

## 1. Chuẩn bị tối thiểu

Bạn chỉ cần cung cấp:

1. **Ai sẽ xem trang** và họ cần làm gì sau khi đọc.
2. **Bạn cung cấp gì**: dịch vụ/sản phẩm, điểm khác biệt, phạm vi hoặc các nội dung bắt buộc.
3. **Một đích liên hệ thật**: email, số điện thoại, URL lịch hẹn, biểu mẫu đang hoạt động hoặc URL đặt hàng.
4. **Nguồn tài liệu**: chọn file trên máy **hoặc** Google Drive. Có thể kết hợp cả hai nếu nói rõ file nào là bản chuẩn.

Logo, ảnh, màu thương hiệu, bảng giá, FAQ, bài giới thiệu, phản hồi khách hàng đã được phép sử dụng là dữ liệu bổ sung. Nếu chưa có, skill có thể dựng phiên bản thiên về chữ và đánh dấu nội dung cần xác nhận. Không cần chuẩn bị brief hoàn hảo.

## 2. Chọn nguồn nội dung

### Cách A — File trên máy

Đính kèm file hoặc gửi đường dẫn đến thư mục/file trong máy. Có thể dùng văn bản, PDF, ảnh và các file tài liệu mà môi trường làm việc đọc được. Nói rõ đâu là bản mới nhất nếu có nhiều phiên bản.

Ví dụ:

> Dùng lazy-website-compact để làm website một trang cho dịch vụ tư vấn của tôi. Nguồn ở `/duong-dan/thu-muc-tai-lieu/`, logo ở `/duong-dan/logo.png`. Khách chính là chủ doanh nghiệp nhỏ; CTA là `mailto:hello@example.com`. Hãy cho xem bản preview trước khi publish.

### Cách B — Google Drive

Gửi link **file hoặc thư mục cụ thể** và cho biết tài liệu nào là nguồn chính. Cần có kết nối Drive hoặc quyền đọc phù hợp. Nếu môi trường chưa truy cập được, hãy xuất tài liệu ra máy rồi dùng Cách A. File riêng tư trong Drive không được nhúng trực tiếp vào website cho khách xem.

Ví dụ:

> Dùng lazy-website-compact dựng website giới thiệu công ty từ thư mục Google Drive này: `[link thư mục]`. File `Company Profile` là nguồn chuẩn; ảnh trong thư mục `Approved Images` được phép công bố. CTA dẫn tới `https://example.com/booking`. Chỉ làm bản preview, chưa triển khai.

Không chia sẻ quyền chỉnh sửa toàn bộ Drive khi chỉ cần quyền đọc một file/thư mục. Tránh đưa mật khẩu, token hoặc dữ liệu khách hàng vào tài liệu nguồn.

## 3. Mẫu yêu cầu nhanh

Sao chép mẫu sau và thay phần trong ngoặc vuông:

```text
Hãy dùng skill lazy-website-compact tạo [website một trang / website 3–5 trang]
cho [tên thương hiệu, dịch vụ].
Khách mục tiêu: [ai]. Hành động chính: [liên hệ / đặt lịch / mua hàng].
Nguồn nội dung: [đường dẫn file trên máy hoặc link Google Drive cụ thể].
Nguồn chuẩn khi thông tin mâu thuẫn: [tên file, nếu có].
CTA thật: [email, số điện thoại hoặc URL].
Phong cách: [3–5 tính từ hoặc màu sắc, nếu có].
Ràng buộc: [nội dung không được công bố, host hiện tại, yêu cầu khác].
Hãy dựng bản chạy được, kiểm trên mobile và desktop, rồi báo phần đã kiểm
và phần còn cần tôi duyệt. [Chỉ preview / Có thể publish lên host đã nêu].
```

Nếu đã có website, gửi thêm đường dẫn project và chỉ rõ trang/khối cần sửa. Skill sẽ ưu tiên giữ công nghệ hiện tại.

## 4. Quy trình bạn sẽ thấy

1. **Nhận nguồn và chốt nội dung.** Skill lọc tài liệu liên quan, xác định đối tượng, thông điệp, CTA và đánh dấu dữ liệu chưa chắc chắn.
2. **Chọn cấu trúc.** Với site nội dung ít trang, thường dùng website tĩnh để dễ chạy và bàn giao. Nếu có nhiều bài viết hoặc yêu cầu cập nhật thường xuyên, có thể đề xuất cách quản lý nội dung phù hợp.
3. **Dựng bản chạy được.** Trang có bố cục, nội dung, ảnh được phép dùng, điều hướng và CTA thực tế. Không xem mockup là sản phẩm cuối.
4. **Kiểm tra.** Chạy build/kiểm link và tài sản, mở ở màn hình nhỏ và lớn, thử CTA; nếu có form thật thì thử gửi tới nơi nhận.
5. **Bàn giao.** Bạn nhận vị trí project, cách chạy/build, các bước publish (nếu chưa publish), kết quả kiểm tra và danh sách điều cần duyệt.

Nếu có thông tin mâu thuẫn ảnh hưởng đến nội dung công khai như giá, cam kết hoặc địa chỉ, skill sẽ hỏi bạn chọn bản chuẩn. Website chưa được duyệt có thể là preview; không mặc nhiên đưa lên production.

## 5. Cách tự nghiệm thu

Mở trang trên điện thoại và máy tính. Kiểm xem tiêu đề nói rõ bạn làm gì, nội dung đúng sự thật, chữ đọc được, không phải kéo ngang, menu dùng được, các nút dẫn đúng nơi và không có chỗ để trống. Thử CTA như một khách mới; nếu là form, xác nhận tin nhắn thật sự tới nơi nhận. Đọc phần bàn giao để biết phép kiểm nào đã chạy và giới hạn nào chưa được xác minh.

Website tĩnh thường chỉ cần trình duyệt và host tĩnh; form, đặt lịch, thanh toán hoặc đăng nhập cần dịch vụ xử lý riêng. Nếu chưa có nơi nhận form, nên dùng liên hệ qua email/điện thoại/URL lịch hẹn trước, sau đó mới thêm form.

## 6. Publish và cập nhật sau này

Bạn có thể chỉ yêu cầu preview. Khi muốn triển khai, cung cấp host/domain đang dùng và quyền phù hợp, ví dụ: “Publish bản đã duyệt lên host của tôi tại `[domain]`, rồi kiểm URL công khai và CTA.” Skill không tự mua tên miền, gói lưu trữ hoặc bật dịch vụ trả phí.

Khi nội dung nguồn đổi, yêu cầu cập nhật lại website từ file/link tương ứng và nêu rõ thay đổi. Google Drive trong luồng này là **nguồn biên tập**, không phải nơi website tự đọc trực tiếp mỗi lần khách truy cập.

## 7. Áp dụng theo quy mô

| Tình huống | Cách bắt đầu gọn |
| --- | --- |
| Một người vận hành | Một landing page, một CTA chính, ít tài liệu, nghiệm thu trực tiếp. |
| Doanh nghiệp nhỏ | Xác định người duyệt, bản dữ liệu chuẩn, quyền sử dụng ảnh/logo, preview trước production và cách quay lại bản cũ. |

## 8. Cài skill từ gói này

Giữ nguyên toàn bộ thư mục `lazy-website-compact` gồm `SKILL.md`, `HUONG-DAN.md`, `references/` và `scripts/`. Nếu môi trường agent cho phép cài skill từ ZIP, dùng `lazy-website-compact.zip`; nếu cài bằng thư mục, đặt cả thư mục vào đường dẫn skills mà môi trường đó hỗ trợ, rồi bắt đầu yêu cầu bằng tên skill. Đừng chỉ sao chép `SKILL.md`, vì phần hướng dẫn nhận nguồn và script kiểm website đi kèm cũng được dùng.

Script kiểm HTML tĩnh có thể chạy thủ công sau khi dựng site:

```bash
python3 <duong-dan-skill>/scripts/check_static.py <thu-muc-website-cong-khai>
```

Script phát hiện một số link/tài sản lỗi và thiếu metadata cơ bản, nhưng không thay thế việc xem trong trình duyệt hoặc gửi thử form.
