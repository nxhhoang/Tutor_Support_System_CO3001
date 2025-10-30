import React from 'react'
import type { Session, SessionFeedback } from 'src/types/session.type'
import type { BaseUser } from 'src/types/user.type'

type Avg = {
  practicalRelevance: number
  knowledgeLoad: number
  clarity: number
  enthusiasm: number
  goalTransmission: number
  count: number
} | null

type Props = {
  sessions: Session[]
  user: BaseUser
  onOpenRating: (session: Session) => void
  onOpenFeedback: (session: Session) => void
  onOpenReport: (session: Session) => void
  calcAvg: (feedbacks: SessionFeedback[] | undefined) => Avg
}

const CompletedSessions: React.FC<Props> = ({ sessions, user, onOpenRating, onOpenFeedback, onOpenReport, calcAvg }) => {
  return (
    <section>
      <h3 className="font-medium text-lg mb-2">Đã hoàn thành</h3>
      <div className="space-y-2">
        {sessions.map((s) => {
          const avg = calcAvg(s.feedbacks)
          return (
            <div key={s.id} className="border rounded p-3">
              <div className="font-medium">Program #{s.programId}</div>
              <div className="text-sm text-gray-600">Hoàn thành lúc {s.completedAt || s.time}</div>

              {user.role === 'student' && (
                <div className="mt-2 flex gap-2">
                  <button className="px-3 py-1 border rounded" onClick={() => onOpenRating(s)}>
                    Đánh giá
                  </button>
                </div>
              )}

              {user.role === 'tutor' && (
                <div className="mt-2 flex items-center gap-3 flex-wrap">
                  <div className="text-sm text-gray-600 flex-1 min-w-[250px]">
                    {avg ? (
                      <>
                        Trung bình: <span className="font-medium">{avg.count} đánh giá</span>
                        <div className="text-xs mt-1">
                          Điểm TB — Thực tế: {avg.practicalRelevance} • Khối lượng: {avg.knowledgeLoad} • Rõ ràng: {avg.clarity}
                          <br />
                          Nhiệt tình: {avg.enthusiasm} • Mục tiêu: {avg.goalTransmission}
                        </div>
                      </>
                    ) : (
                      'Chưa có đánh giá'
                    )}
                  </div>

                  <button className="px-3 py-1 border rounded" onClick={() => onOpenFeedback(s)}>
                    Xem feedback
                  </button>

                  <button
                    className="px-3 py-1 border border-blue-600 text-blue-600 rounded"
                    onClick={() => onOpenReport(s)}
                  >
                    📝 Tạo biên bản
                  </button>
                </div>
              )}
            </div>
          )
        })}
        {sessions.length === 0 && <div className="text-sm text-gray-500">Không có session nào.</div>}
      </div>
    </section>
  )
}

export default CompletedSessions
