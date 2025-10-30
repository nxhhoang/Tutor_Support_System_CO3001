import { useState } from 'react'
import type { StudentUser, TutorUser } from 'src/types/user.type'
import InfoRow from 'src/pages/Profile/components/InfoRow'
import InputField from 'src/pages/Profile/components/InputField/InputField'

export default function ProfileInfo({ user }: { user: StudentUser | TutorUser }) {
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState({
    phone: '',
    skills: '',
    expertise: '',
    supportNeeds: ''
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div>
      {/* Avatar + Tên + Email */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
          <img
            src={
              user.avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
            }
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-blue-800">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Thông tin cơ bản */}
      <div className="space-y-2 text-sm text-gray-700 mb-10">
        {user.role === 'student' && (
          <>
            <InfoRow label="Mã số sinh viên" value={`SV${user.id}`} />
            <InfoRow label="Họ và tên" value={user.name} />
            <InfoRow label="Email" value={user.email} />
            <InfoRow label="Khoa" value={user.faculty} />
            <InfoRow label="Ngành" value={user.major} />
            <InfoRow label="Lớp" value={user.class} />
          </>
        )}
        {user.role === 'tutor' && (
          <>
            <InfoRow label="Mã số Tutor" value={`TUT${user.id}`} />
            <InfoRow label="Họ và tên" value={user.name} />
            <InfoRow label="Email" value={user.email} />
            <InfoRow label="Khoa" value="Khoa Khoa học & Kỹ thuật Máy tính" />
            <InfoRow label="Bộ môn" value="Khoa học Máy tính" />
            <InfoRow label="Rating" value={`${user.rating?.toFixed(1) ?? 'N/A'}/5`} />
          </>
        )}
      </div>

      {/* Cập nhật thông tin bổ sung */}
      <div className="pt-4">
        <h3 className="text-blue-700 font-medium mb-3">Thông tin bổ sung</h3>
        {isEditing ? (
          <div className="space-y-5">
            <InputField label="Số điện thoại" name="phone" value={form.phone} onChange={handleChange} />
            <InputField label="Kỹ năng" name="skills" value={form.skills} onChange={handleChange} />
            <InputField
              label={user.role === 'tutor' ? 'Lĩnh vực chuyên môn' : 'Nhu cầu hỗ trợ'}
              name={user.role === 'tutor' ? 'expertise' : 'supportNeeds'}
              value={user.role === 'tutor' ? form.expertise : form.supportNeeds}
              onChange={handleChange}
            />
            <div className="flex gap-2 pt-2">
              <button onClick={() => setIsEditing(false)} className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">
                Hủy
              </button>
              <button
                onClick={() => {
                  setIsEditing(false)
                  alert('Cập nhật hồ sơ thành công!')
                }}
                className="bg-blue-700 text-white px-4 py-1 rounded hover:bg-blue-800"
              >
                Lưu
              </button>
            </div>
          </div>
        ) : (
          <>
            <InfoRow label="Số điện thoại" value={form.phone || 'Chưa có'} />
            <InfoRow label="Kỹ năng" value={form.skills || 'Chưa có'} />
            <InfoRow
              label={user.role === 'tutor' ? 'Lĩnh vực chuyên môn' : 'Nhu cầu hỗ trợ'}
              value={
                user.role === 'tutor'
                  ? form.expertise || 'Chưa có'
                  : form.supportNeeds || 'Chưa có'
              }
            />
            <button onClick={() => setIsEditing(true)} className="mt-3 bg-blue-700 text-white px-4 py-1 rounded hover:bg-blue-800">
              Cập nhật thông tin
            </button>
          </>
        )}
      </div>
    </div>
  )
}