# Công nghệ sử dụng
- UI / CSS Library: Tailwindcss + HeadlessUI
- State Management: React Query cho async state và React Context cho state thường
- Form Management: React Hook Form
- Router: React Router
- Build tool: Vite
- API: Rest API dựa trên server mình cung cấp sẵn
- Hỗ trợ đa ngôn ngữ với react.i18next
- Hỗ trợ SEO với React Helmet



### Xác thực & Phân quyền
- /api/auth/login (Để xử lý đăng nhập qua HCMUT_SSO)
- /api/auth/logout
- /api/auth/me (Để lấy thông tin vai trò của người dùng hiện tại sau khi đăng nhập)

### Quản lý Hồ sơ
- /api/profile/view (Để xem hồ sơ cá nhân của chính mình)
- /api/profile/update (Để cập nhật thông tin cá nhân)
- /api/profile/availability/set (Dành cho Tutor/Sinh viên thiết lập lịch rảnh)
- /api/users/profile/view (Để xem hồ sơ công khai của người khác, ví dụ: sinh viên xem hồ sơ tutor)

### Lập lịch & Quản lý Phiên
- /api/sessions/book (Sinh viên đặt lịch hẹn với Tutor)
- /api/sessions/join (Sinh viên tham gia phiên tư vấn trực tuyến)
- /api/sessions/list/scheduled (Sinh viên xem các lịch đã đặt)
- /api/sessions/schedule (Tutor tự lên lịch một phiên)
- /api/sessions/cancel (Tutor hoặc sinh viên hủy lịch)
- /api/sessions/reschedule (Tutor hoặc sinh viên dời lịch)
- /api/sessions/requests/list (Tutor xem các yêu cầu đặt lịch)
- /api/sessions/requests/respond (Tutor chấp nhận/từ chối yêu cầu)
- /api/sessions/records/generate (Tutor ghi biên bản buổi gặp)
- /api/notifications/list (Lấy danh sách thông báo nhắc lịch, hủy lịch, v.v.)

### Phản hồi & Đánh giá
- /api/sessions/feedback/evaluate (Sinh viên đánh giá chất lượng buổi học)
- /api/sessions/feedback/comment (Sinh viên viết bình luận chi tiết)
- /api/sessions/feedback/view (Sinh viên xem bình luận của tutor)
- /api/mentees/list (Tutor lấy danh sách mentee của mình)
- /api/mentees/manage (Tutor ghi chú, đánh giá tiến độ mentee)
- /api/mentees/attendance/record (Tutor ghi nhận điểm danh)
- /api/mentees/search (Tutor tìm kiếm trong danh sách mentee)

### Chương trình & Ghép cặp
- /api/programs/register (Sinh viên đăng ký tham gia chương trình)
- /api/programs/search (Sinh viên tìm kiếm chương trình)
- /api/tutors/search (Sinh viên tìm kiếm tutor)
- /api/tutors/select (Sinh viên chọn một tutor)
- /api/tutors/recommend/ai (Sinh viên nhận gợi ý tutor bằng AI)
- /api/recommendations/learning/get (Sinh viên nhận gợi ý lộ trình học cá nhân hóa)
- /api/profile/preferences/update (Sinh viên cập nhật sở thích học tập)
- /api/mentees/progress/view (Tutor xem tiến độ học tập của mentee)

### Tài nguyên Học liệu
- /api/resources/browse (Duyệt tài liệu từ HCMUT_LIBRARY)
- /api/resources/search (Tìm kiếm tài liệu)
- /api/resources/details/view (Xem chi tiết tài liệu)
- /api/resources/download (Tải tài liệu)
- /api/resources/share (Chia sẻ tài liệu)

### Quản trị & Báo cáo
- /api/admin/reports/view (Xem báo cáo tổng quan, ví dụ: Khoa/Bộ môn, P.CTSV)
- /api/admin/reports/generate (Tạo và xuất file báo cáo, ví dụ: OAA, P.CTSV)
- /api/admin/resources/allocate (OAA phân bổ nguồn lực)
- /api/admin/tutors/workload/view (OAA xem trọng tải công việc của tutor)
- /api/admin/students/manage (Khoa/P.CTSV quản lý sinh viên)
- /api/admin/students/progress/monitor (Khoa/P.CTSV theo dõi tiến độ)
- /api/admin/students/search (Khoa/P.CTSV tìm kiếm sinh viên)

### Cộng đồng Trực tuyến
- /api/community/join (Tham gia diễn đàn)
- /api/community/topics/list (Xem danh sách các chủ đề)
- /api/community/topics/create (Tạo chủ đề mới)
- /api/community/topics/search (Tìm kiếm chủ đề)
- /api/community/topics/view (Xem nội dung một chủ đề)
- /api/community/comments/create (Viết bình luận/trả lời)