import type { Tutor } from 'src/types/type'

export default function TutorProfile({ tutor }: { tutor?: Tutor }) {
  if (!tutor) return <div className='p-6'>Chưa chọn tutor.</div>
  return (
    <div className='p-6'>
      <div className='bg-white p-6 rounded shadow'>
        <div className='flex items-center gap-6'>
          <div className='w-24 h-24 bg-gray-200 rounded-full' />
          <div>
            <div className='text-xl font-semibold'>{tutor.name}</div>
            <div className='text-sm text-gray-600'>Chuyên môn: {tutor.major}</div>
            <div className='text-sm text-gray-600'>Đánh giá: {tutor.rating}</div>
          </div>
        </div>
        <div className='mt-4'>
          <h4 className='font-medium'>Giới thiệu</h4>
          <p className='text-sm text-gray-600 mt-2'>
            {tutor.bio || 'Mô tả ngắn về tutor, kinh nghiệm, các khoá đã hỗ trợ.'}
          </p>
        </div>
        <div className='mt-4 flex gap-3'>
          <button className='px-4 py-2 bg-blue-600 text-white rounded'>Đặt lịch</button>
          <button className='px-4 py-2 border rounded'>Gửi yêu cầu</button>
        </div>
      </div>

      <div className='mt-4 bg-white p-4 rounded shadow'>
        <h4 className='font-medium'>Đánh giá & Bình luận</h4>
        <div className='mt-2 text-sm text-gray-600'>Danh sách đánh giá từ sinh viên (mock).</div>
      </div>
    </div>
  )
}
