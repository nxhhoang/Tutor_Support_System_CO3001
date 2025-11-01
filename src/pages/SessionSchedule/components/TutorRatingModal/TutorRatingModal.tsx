import React, { useMemo } from 'react'
import type { Session } from 'src/types/session.type'

type Props = {
  open: boolean
  session: Session | null
  rating: number
  comment: string
  onChangeRating: (v: number) => void
  onChangeComment: (v: string) => void
  onClose: () => void
  onSubmit: () => void
  readOnly?: boolean
}

const TutorRatingModal: React.FC<Props> = ({
  open,
  session,
  rating,
  comment,
  onChangeRating,
  onChangeComment,
  onClose,
  onSubmit,
  readOnly
}) => {
  if (!open || !session) return null

  // ✅ kiểm tra xem session đã có feedback của tutor chưa
  const existingFeedback = useMemo(() => session.tutorFeedbacks?.[0], [session])
  const isReadOnly = readOnly || Boolean(existingFeedback)

  return (
    <div className='fixed inset-0 bg-black/40 flex items-start md:items-center justify-center p-4 z-50'>
      <div className='bg-white w-full max-w-lg rounded shadow-lg overflow-auto max-h-[90vh] p-4'>
        <div className='flex justify-between items-center mb-3'>
          <h3 className='text-lg font-medium'>
            {isReadOnly ? 'Xem đánh giá học viên' : 'Đánh giá học viên'} — Môn {session.subject}
          </h3>
          <button className='px-2 py-1 border rounded' onClick={onClose}>
            Đóng
          </button>
        </div>

        <div className='space-y-4'>
          <div>
            <div className='font-medium'>Điểm tổng thể (1–5)</div>
            <div className='flex gap-2 mt-2'>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  disabled={isReadOnly}
                  onClick={() => onChangeRating(n)}
                  className={`px-3 py-1 border rounded ${
                    (isReadOnly ? existingFeedback?.rating : rating) === n ? 'bg-blue-600 text-white' : ''
                  } ${isReadOnly ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className='font-medium'>Nhận xét / Feedback</div>
            <textarea
              disabled={isReadOnly}
              value={isReadOnly ? existingFeedback?.comment || '' : comment}
              onChange={(e) => onChangeComment(e.target.value)}
              className='w-full border p-2 rounded disabled:bg-gray-100'
              rows={4}
            />
          </div>

          {!isReadOnly && (
            <div className='flex justify-end gap-2'>
              <button className='px-3 py-1 border rounded' onClick={onClose}>
                {'Hủy'}
              </button>
              <button className='px-3 py-1 bg-blue-600 text-white rounded' onClick={onSubmit}>
                Gửi đánh giá
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TutorRatingModal
