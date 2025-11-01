import React from 'react'
import type { Session } from 'src/types/session.type'
import type { BaseUser } from 'src/types/user.type'

type Props = {
  sessions: Session[]
  user: BaseUser
  onCancel: (sessionId: number) => void
}

const ConfirmedSessions: React.FC<Props> = ({ sessions, user, onCancel }) => {
  return (
    <section>
      <h3 className="font-medium text-lg mb-2">Đã xác nhận</h3>
      <div className="space-y-2">
        {sessions.map((s) => (
          <div key={s.id} className="border rounded p-3">
            <div className="font-medium">{s.subject}</div>
            <div className="text-sm text-gray-600">
              {s.mode === 'online' ? (
                <>
                  Online -{' '}
                  <a href={s.location} target="_blank" className="text-blue-600 underline" rel="noreferrer">
                    {s.location}
                  </a>
                </>
              ) : (
                `Offline - ${s.location}`
              )}
              <br /> Thời gian: {s.time}
            </div>

            {user.role === 'student' && (
              <button className="px-3 py-1 border w-35 bg-green-600 text-white rounded">Điểm danh</button>
            )}

            {user.role === 'tutor' && (
              <div className="flex gap-2 mt-2">
                <button className="px-3 py-1 border rounded w-35 text-center">Đổi lịch</button>
                <button
                  className="px-3 py-1 border w-35 text-red-600 rounded"
                  onClick={() => onCancel(s.id)}
                >
                  Hủy
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

export default ConfirmedSessions
