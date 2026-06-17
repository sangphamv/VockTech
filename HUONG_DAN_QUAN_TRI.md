# Hướng Dẫn Quản Trị Hệ Thống Blog (Astro + Keystatic)

Mô hình hệ thống blog này hoạt động theo cơ chế **tách biệt hoàn toàn** giữa Môi trường quản lý (Local) và Môi trường hiển thị (Production). Dưới đây là quy trình hoạt động cốt lõi mà bạn cần nắm rõ:

## 1. Môi trường quản lý (Local)
Tại máy tính cá nhân (Local) của bạn:
- Bạn chạy dự án Astro và bật hệ thống CMS (Keystatic) lên. CMS này sẽ chạy cục bộ trên môi trường `localhost`.

## 2. Quy trình viết bài và thêm nội dung
- Bạn truy cập vào giao diện Admin của Keystatic thông qua trình duyệt.
- Tại đây, bạn có thể tạo bài viết mới, chỉnh sửa nội dung, và chèn hình ảnh trực quan.
- Khi bạn nhấn lưu, CMS Keystatic sẽ tự động tạo ra (hoặc cập nhật) các file `.md` / `.mdx` và lưu hình ảnh trực tiếp vào thư mục mã nguồn ngay trên ổ cứng máy tính của bạn.

## 3. Đẩy dữ liệu lên GitHub
- Bạn sử dụng Git để `commit` toàn bộ các thay đổi (gồm file markdown, file dữ liệu json, và hình ảnh mới) mà CMS vừa tạo ra.
- Sau đó, thực hiện lệnh `git push` để đẩy mã nguồn lên kho lưu trữ GitHub của dự án.

## 4. Deploy tự động (Production)
- Các nền tảng CI/CD (như GitHub Actions, Vercel, hoặc Netlify, Cloudflare) sẽ tự động bắt được `commit` mới từ GitHub.
- Hệ thống máy chủ sẽ tự động kích hoạt lệnh `astro build` để tạo ra trang web tĩnh (Static HTML) từ các file markdown đó.
- Cuối cùng, bản build web tĩnh sẽ được publish lên môi trường mạng (Production), đem lại tốc độ tải trang cực nhanh và an toàn tuyệt đối.
