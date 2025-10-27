import type { Tutor } from 'src/types/type'

export default function TutorCard({
  tutor,
  onView,
  onBook
}: {
  tutor: Tutor
  onView?: (t: Tutor) => void
  onBook?: (t: Tutor) => void
}) {
  return (
    <div className='p-4 bg-white rounded shadow flex justify-between items-center'>
      <div>
        <div className='font-medium'>{tutor.name}</div>
        <div className='text-sm text-gray-500'>
          {tutor.major} — Đánh giá: {tutor.rating}
        </div>
        <div className='text-xs text-gray-400 mt-1'>Khung giờ rảnh: {tutor.avail?.join(', ')}</div>
      </div>
      <div className='flex gap-2'>
        <button className='px-3 py-1 border rounded' onClick={() => onView?.(tutor)}>
          Xem hồ sơ
        </button>
        <button className='px-3 py-1 bg-blue-600 text-white rounded' onClick={() => onBook?.(tutor)}>
          Đặt lịch
        </button>
      </div>
    </div>
  )
}
