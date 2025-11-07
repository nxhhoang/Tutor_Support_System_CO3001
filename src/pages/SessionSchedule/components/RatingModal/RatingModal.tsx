import React from 'react'
import type { Session } from 'src/types/session.type'

type Ratings = {
  practicalRelevance: number
  knowledgeLoad: number
  clarity: number
  enthusiasm: number
  goalTransmission: number
}

type Props = {
  open: boolean
  session: Session | null
  ratings: Ratings
  onChangeRatings: (r: Ratings) => void
  comment: string
  onChangeComment: (v: string) => void
  onClose: () => void
  onSubmit: () => void
}

const RatingModal: React.FC<Props> = ({ open, session, ratings, onChangeRatings, comment, onChangeComment, onClose, onSubmit }) => {
  if (!open || !session) return null

  const keys = ['practicalRelevance','knowledgeLoad','clarity','enthusiasm','goalTransmission'] as const

  return (
    <div className="fixed inset-0 bg-black/40 flex items-start md:items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-lg rounded shadow-lg overflow-auto max-h-[90vh] p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium">Đánh giá session — {session.subject}</h3>
          <button className="px-2 py-1 border rounded" onClick={onClose}>Đóng</button>
        </div>

        <div className="space-y-3">
          {keys.map((k) => (
            <div key={k}>
              <div className="font-medium">
                {k === 'practicalRelevance' && 'Bài giảng bám sát thực tế / ứng dụng'}
                {k === 'knowledgeLoad' && 'Khối lượng kiến thức phù hợp'}
                {k === 'clarity' && 'Nội dung môn học rõ ràng, logic'}
                {k === 'enthusiasm' && 'Giảng viên nhiệt tình tận tâm'}
                {k === 'goalTransmission' && 'Mục tiêu học tập được truyền đạt rõ'}
              </div>
              <div className="flex gap-2 mt-2">
                {[1,2,3,4,5].map((n) => (
                  <button
                    key={n}
                    onClick={() => onChangeRatings({ ...ratings, [k]: n })}
                    className={`px-3 py-1 border rounded ${ratings[k] === n ? 'bg-blue-600 text-white' : ''}`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div>
            <div className="font-medium">Ghi chú / Feedback</div>
            <textarea
              value={comment}
              onChange={(e) => onChangeComment(e.target.value)}
              className="w-full border p-2 rounded"
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-2">
            <button className="px-3 py-1 border rounded" onClick={onClose}>Hủy</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={onSubmit}>Gửi đánh giá</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RatingModal
