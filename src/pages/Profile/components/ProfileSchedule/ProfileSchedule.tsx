import type { StudentUser, TutorUser } from 'src/types/user.type'

export default function ProfileSchedule({ user }: { user: StudentUser | TutorUser }) {
  return (
    <div className="mb-8">
      <h3 className="text-blue-700 font-semibold mb-4">
        {user.role === 'student' ? 'Lịch đã đăng ký' : 'Lịch rảnh của tôi'}
      </h3>
      <p className="text-sm text-gray-600 mb-2">
        {user.role === 'student'
          ? 'Bạn có thể thiết lập lịch rảnh để tutor đặt lịch học.'
          : 'Bạn có thể thiết lập lịch rảnh để sinh viên đặt lịch học.'}
      </p>
      <ul className="space-y-2 text-sm">
        {user.avail?.length ? (
          user.avail.map((slot, i) => (
            <li key={i} className="border p-3 rounded shadow-sm">
              • {slot}
            </li>
          ))
        ) : (
          <li className="italic text-gray-500">Chưa thiết lập lịch rảnh.</li>
        )}
      </ul>
      <button className="mt-4 bg-blue-700 text-white px-4 py-1 rounded hover:bg-blue-800">
        Thêm lịch rảnh
      </button>
    </div>
  )
}