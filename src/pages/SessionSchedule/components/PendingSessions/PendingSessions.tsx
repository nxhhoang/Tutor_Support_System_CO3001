import React from 'react'
import type { Session } from 'src/types/session.type'
import type { BaseUser } from 'src/types/user.type'

type Props = {
  sessions: Session[]
  user: BaseUser
  onConfirm: (sessionId: number) => void
  onDelete: (sessionId: number) => void
}

const PendingSessions: React.FC<Props> = ({ sessions, user, onConfirm, onDelete }) => {
  return (
    <section>
      <h3 className="font-medium text-lg mb-2">Chưa xác nhận</h3>
      <div className="space-y-2">
        {sessions.map((s) => (
          <div key={s.id} className="border rounded p-3">
            <div className="font-medium">Program #{s.programId}</div>
            <div className="text-sm text-gray-600">
              Đề xuất: {s.mode} - {s.location || 'Chưa có địa điểm'}
            </div>

            {user.role === 'student' && (
              <div className="mt-2 space-x-2">
                <button className="px-3 py-1 border rounded">Đề xuất lịch</button>
              </div>
            )}

            {user.role === 'tutor' && (
              <div className="mt-2 space-x-2">
                <button
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                  onClick={() => onConfirm(s.id)}
                >
                  Xác nhận
                </button>
                <button
                  className="px-3 py-1 border text-red-600 rounded"
                  onClick={() => onDelete(s.id)}
                >
                  Xóa
                </button>
              </div>
            )}
          </div>
        ))}
        {sessions.length === 0 && <div className="text-sm text-gray-500">Không có session nào.</div>}
      </div>
    </section>
  )
}

export default PendingSessions
