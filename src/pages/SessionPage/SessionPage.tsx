

export default function SessionPage() {
  return (
    <div className='p-6'>
      <div className='bg-white p-6 rounded shadow'>
        <h3 className='font-semibold'>Tham gia buổi học (Mock)</h3>
        <p className='text-sm text-gray-600 mt-2'>
          Hệ thống sẽ điều hướng tới nền tảng họp trực tuyến liên kết (Zoom/Meet) — ở mock này chỉ hiển thị thông tin và
          nút 'Mở link'.
        </p>
        <div className='mt-4'>
          <button className='px-4 py-2 bg-blue-600 text-white rounded'>Mở link họp</button>
        </div>
      </div>
    </div>
  )
}
