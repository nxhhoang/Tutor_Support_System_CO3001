
import type { DocItem } from 'src/types/type'

export default function Documents() {
  const docs: DocItem[] = [
    { id: 'd1', title: 'Giáo trình Cấu trúc dữ liệu.pdf', size: '2.1MB', uploadedAt: '2024-09-10' }
  ]
  return (
    <div className='p-6'>
      <h2 className='text-xl font-semibold mb-4'>Tài liệu học tập</h2>
      <div className='bg-white p-4 rounded shadow'>
        <div className='mb-3 text-sm text-gray-600'>Duyệt / Tìm kiếm / Tải tài liệu (tích hợp HCMUT_LIBRARY).</div>
        <ul className='space-y-2'>
          {docs.map((d) => (
            <li key={d.id} className='p-3 border rounded flex justify-between items-center'>
              <div>
                <div className='font-medium'>{d.title}</div>
                <div className='text-xs text-gray-500'>
                  {d.size} • {d.uploadedAt}
                </div>
              </div>
              <div className='flex gap-2'>
                <button className='px-3 py-1 border rounded'>Xem</button>
                <button className='px-3 py-1 border rounded'>Tải</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
