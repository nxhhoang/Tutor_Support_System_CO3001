import React from 'react'
import type { SessionFeedback, Session } from 'src/types/session.type'

type Props = {
  open: boolean
  session: Session | null
  feedbacks: SessionFeedback[]
  onClose: () => void
}

const ViewFeedbackModal: React.FC<Props> = ({ open, session, feedbacks, onClose }) => {
  if (!open || !session) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-start md:items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-2xl rounded shadow-lg overflow-auto max-h-[90vh] p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium">Feedback — Program #{session.programId}</h3>
          <button className="px-2 py-1 border rounded" onClick={onClose}>Đóng</button>
        </div>

        <div className="space-y-4">
          {feedbacks.length === 0 && <div className="text-sm text-gray-500">Chưa có feedback.</div>}
          {feedbacks.map((f) => (
            <div key={f.id} className="border rounded p-3">
              <div className="text-sm text-gray-600">
                Sinh viên #{f.studentId} • {f.createdAt}
              </div>
              <div className="mt-2 text-sm">
                <div>Bài giảng bám sát thực tế: <strong>{f.ratingCriteria.practicalRelevance}</strong></div>
                <div>Khối lượng kiến thức phù hợp: <strong>{f.ratingCriteria.knowledgeLoad}</strong></div>
                <div>Nội dung rõ ràng: <strong>{f.ratingCriteria.clarity}</strong></div>
                <div>Giảng viên nhiệt tình: <strong>{f.ratingCriteria.enthusiasm}</strong></div>
                <div>Mục tiêu truyền đạt: <strong>{f.ratingCriteria.goalTransmission}</strong></div>
              </div>
              {f.comment && <div className="mt-2 text-sm text-gray-800">Comment: {f.comment}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ViewFeedbackModal
