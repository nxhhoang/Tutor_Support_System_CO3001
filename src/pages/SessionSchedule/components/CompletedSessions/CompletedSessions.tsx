import React from 'react'
import { sessionApi } from 'src/apis/session.api'
import type { Session, SessionFeedback, Avg } from 'src/types/session.type'
import type { BaseUser } from 'src/types/user.type'

type Props = {
  sessions: Session[]
  user: BaseUser
  onOpenRating: (session: Session) => void
  onOpenFeedback: (session: Session) => void
  onOpenReport: (session: Session) => void
  calcAvg: (feedbacks: SessionFeedback[] | undefined) => Avg
}

const CompletedSessions: React.FC<Props> = ({
  sessions,
  user,
  onOpenRating,
  onOpenFeedback,
  onOpenReport,
  calcAvg
}) => {
  return (
    <section>
      <h3 className='font-medium text-lg mb-2'>Đã hoàn thành</h3>
      <div className='space-y-2'>
        {sessions.map((s) => {
          const avg = calcAvg(s.feedbacks)
          return (
            <div key={s.id} className='border rounded p-3'>
              <div className='font-medium'>{s.subject}</div>
              <div className='text-sm text-gray-600'>Hoàn thành lúc {s.completedAt || s.time}</div>

              {user.role === 'student' && (
                <div className='mt-2 flex items-center gap-3 flex-wrap'>
                  <button className='px-3 py-1 border rounded w-28 text-center' onClick={() => onOpenRating(s)}>
                    Đánh giá
                  </button>

                  <button
                    className='px-3 py-1 border rounded w-40 text-center'
                    onClick={() => {
                      const tFeedbacks = sessionApi.getTutorFeedbackBySession(s.id)
                      if (tFeedbacks.length === 0) alert('Giảng viên chưa đánh giá.')
                      else {
                        const fb = tFeedbacks[0]
                        alert(`Giảng viên đánh giá: ${fb.rating}/5\nNhận xét: ${fb.comment || 'Không có'}`)
                      }
                    }}
                  >
                    Xem đánh giá từ giảng viên
                  </button>
                </div>
              )}

              {user.role === 'tutor' && (
                <div className='mt-2 flex items-center gap-3 flex-wrap'>
                  <div className='text-sm text-gray-600 flex-1 min-w-[250px]'>
                    {avg ? (
                      <>
                        Trung bình: <span className='font-medium'>{avg.count} đánh giá</span>
                        <div className='text-xs mt-1'>
                          Điểm TB — Thực tế: {avg.practicalRelevance} • Khối lượng: {avg.knowledgeLoad} • Rõ ràng:{' '}
                          {avg.clarity}
                          <br />
                          Nhiệt tình: {avg.enthusiasm} • Mục tiêu: {avg.goalTransmission}
                        </div>
                      </>
                    ) : (
                      'Chưa có đánh giá'
                    )}
                  </div>

                  <button className='px-3 py-1 border rounded w-40 text-center' onClick={() => onOpenFeedback(s)}>
                    Xem feedback
                  </button>

                  <button
                    className='px-3 py-1 border w-40 border-blue-600 text-blue-600 rounded'
                    onClick={() => onOpenReport(s)}
                  >
                    📝 Tạo biên bản
                  </button>

                  <button
                    className={`px-3 py-1 border rounded w-40 text-center text-sm ${
                      (s.tutorFeedbacks?.length ?? 0) > 0 ? 'bg-green-100 border-green-600' : ''
                    }`}
                    onClick={() => {
                      if ((s.tutorFeedbacks?.length ?? 0) > 0) {
                        const fb = s.tutorFeedbacks![0]
                        alert(`Bạn đã đánh giá sinh viên này: ${fb.rating}/5\n"${fb.comment || 'Không có'}"`)
                      } else {
                        const rating = Number(prompt('Nhập điểm đánh giá (1-5):', '5'))
                        const comment = prompt('Nhận xét (tùy chọn):', '')
                        if (!isNaN(rating))
                          sessionApi.addTutorFeedback(s.id, {
                            tutorId: user.id,
                            studentId: s.studentId,
                            sessionId: s.id,
                            rating,
                            comment: comment || ''
                          })
                        alert('Đánh giá học viên thành công!')
                      }
                    }}
                  >
                    {(s.tutorFeedbacks?.length ?? 0) > 0 ? 'Đã đánh giá học viên' : 'Đánh giá học viên'}
                  </button>
                </div>
              )}
            </div>
          )
        })}
        {sessions.length === 0 && <div className='text-sm text-gray-500'>Không có session nào.</div>}
      </div>
    </section>
  )
}

export default CompletedSessions
