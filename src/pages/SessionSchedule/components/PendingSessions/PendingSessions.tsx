import React, { useState } from 'react'
import type { Session } from 'src/types/session.type'
import type { BaseUser } from 'src/types/user.type'

type Props = {
  sessions: Session[]
  user: BaseUser
  onConfirm: (sessionId: number, updatedData?: Partial<Session>) => void
  onDelete: (sessionId: number) => void
}

const PendingSessions: React.FC<Props> = ({ sessions, user, onConfirm, onDelete }) => {
  const [openFormId, setOpenFormId] = useState<number | null>(null)
  const [formData, setFormData] = useState<{
    time: string
    mode: 'online' | 'offline'
    location: string
  }>({
    time: '',
    mode: 'offline',
    location: ''
  })

  const handleOpenForm = (sessionId: number) => {
    if (openFormId === sessionId) setOpenFormId(null)
    else setOpenFormId(sessionId)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (sessionId: number) => {
    if (!formData.time.trim()) {
      alert('Vui lòng chọn thời gian cụ thể!')
      return
    }
    if (formData.mode === 'offline' && !formData.location.trim()) {
      alert('Vui lòng nhập địa điểm học!')
      return
    }

    onConfirm(sessionId, formData)
    setOpenFormId(null)
  }

  return (
    <section>
      <h3 className="font-medium text-lg mb-2">Chưa xác nhận</h3>
      <div className="space-y-2">
        {sessions.map((s) => (
          <div key={s.id} className="border rounded p-3">
            <div className="font-medium">{s.subject}</div>

            <div className="text-sm text-gray-600">
              Sinh viên chưa chọn lịch cụ thể
            </div>

            {user.role === 'student' && (
              <div className="mt-2 space-x-2">
                <button
                  className="px-3 py-1 border rounded w-35 text-center"
                  onClick={() => handleOpenForm(s.id)}
                >
                  {openFormId === s.id ? 'Đóng form' : 'Đặt lịch'}
                </button>
              </div>
            )}

            {openFormId === s.id && (
              <div className="mt-3 p-3 border rounded bg-gray-50 space-y-3 text-sm">
                <div>
                  <label className="block mb-1 font-medium">Thời gian:</label>
                  <input
                    type="datetime-local"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full border rounded px-2 py-1"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Hình thức học:</label>
                  <select
                    name="mode"
                    value={formData.mode}
                    onChange={handleChange}
                    className="w-full border rounded px-2 py-1"
                  >
                    <option value="offline">Offline</option>
                    <option value="online">Online</option>
                  </select>
                </div>

                {formData.mode === 'offline' ? (
                  <div>
                    <label className="block mb-1 font-medium">Địa điểm học:</label>
                    <input
                      type="text"
                      name="location"
                      placeholder="VD: A4-501"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full border rounded px-2 py-1"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block mb-1 font-medium">Link học online:</label>
                    <input
                      type="text"
                      name="location"
                      placeholder="VD: https://meet.google.com/abc-defg-hij"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full border rounded px-2 py-1"
                    />
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 bg-green-600 text-white rounded"
                    onClick={() => handleSubmit(s.id)}
                  >
                    Xác nhận đặt lịch
                  </button>
                  <button
                    className="px-3 py-1 border text-gray-600 rounded"
                    onClick={() => setOpenFormId(null)}
                  >
                    Hủy
                  </button>
                </div>
              </div>
            )}

            {user.role === 'tutor' && (
              <div className="mt-2 space-x-2">
                <button
                  className="px-3 py-1 border w-35 text-center text-red-600 rounded"
                  onClick={() => onDelete(s.id)}
                >
                  Xóa
                </button>
              </div>
            )}
          </div>
        ))}
        {sessions.length === 0 && (
          <div className="text-sm text-gray-500">Không có session nào.</div>
        )}
      </div>
    </section>
  )
}

export default PendingSessions
