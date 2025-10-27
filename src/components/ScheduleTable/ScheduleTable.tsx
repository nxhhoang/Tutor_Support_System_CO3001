
import type { SessionItem } from 'src/types/type'

export default function ScheduleTable({ items }: { items: SessionItem[] }) {
  return (
    <div className='bg-white p-4 rounded shadow overflow-x-auto'>
      <table className='w-full text-left min-w-[600px]'>
        <thead>
          <tr className='text-sm text-gray-500'>
            <th className='py-2'>Ngày</th>
            <th>Thời gian</th>
            <th>Tutor</th>
            <th>Hình thức</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {items.map((s) => (
            <tr key={s.id} className='border-t'>
              <td className='py-2'>{s.date}</td>
              <td>{s.time}</td>
              <td>{s.tutor}</td>
              <td>{s.mode}</td>
              <td>{s.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
