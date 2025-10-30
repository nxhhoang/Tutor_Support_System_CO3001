import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'

export default function TutorProfile() {
  const { user } = useContext(AppContext)

  if (!user) {
    return <div className="p-6 text-gray-600">Chưa đăng nhập.</div>
  }

  if (user.role !== 'tutor') {
    return <div className="p-6 text-gray-600">Chỉ tutor mới có thể xem trang này.</div>
  }

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded shadow">
        <div className="flex items-center gap-6">
          <img
            src={user.avatar || 'https://cdn-icons-png.flaticon.com/512/219/219983.png'}
            alt="Tutor Avatar"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <div className="text-xl font-semibold">{user.name}</div>
            <div className="text-sm text-gray-600">Email: {user.email}</div>
            <div className="text-sm text-gray-600">Chuyên môn: {user.major ?? 'Chưa cập nhật'}</div>
            <div className="text-sm text-gray-600">Đánh giá: {user.rating ?? 'Chưa có'}</div>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="font-medium">Giới thiệu</h4>
          <p className="text-sm text-gray-600 mt-2">
            {user.bio || 'Tutor chưa có mô tả chi tiết.'}
          </p>
        </div>

        <div className="mt-4 flex gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Gửi yêu cầu</button>
          <button className="px-4 py-2 border rounded">Đặt lịch</button>
        </div>
      </div>

      <div className="mt-4 bg-white p-4 rounded shadow">
        <h4 className="font-medium">Đánh giá & Bình luận</h4>
        <div className="mt-2 text-sm text-gray-600">
          Danh sách đánh giá từ sinh viên (dữ liệu giả).
        </div>
      </div>
    </div>
  )
}
