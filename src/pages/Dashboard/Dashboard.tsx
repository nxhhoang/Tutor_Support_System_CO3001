import type { Tutor, SessionItem } from 'src/types/type'
import NotificationPanel from 'src/components/NotificationPanel'
import SearchBox from 'src/components/SearchBox'
import TutorCard from 'src/components/TutorCard'

export default function Dashboard({
  onNavigate,
  onViewProfile
}: {
  onNavigate?: (p: string) => void
  onViewProfile?: (t: Tutor) => void
}) {
  const recommended = [
    { id: 1, name: 'ThS. Trần X', major: 'Hệ điều hành', rating: 4.8, avail: ['28/10 14:00', '29/10 10:00'] },
    { id: 2, name: 'PGS. Lê Y', major: 'Cơ sở dữ liệu', rating: 4.6, avail: ['30/10 09:00', '31/10 15:00'] }
  ] as Tutor[]

  const upcoming: SessionItem[] = [
    { id: 's1', date: '2025-10-28', time: '14:00', tutor: 'ThS. Trần X', mode: 'online', status: 'confirmed' },
    { id: 's2', date: '2025-10-30', time: '09:00', tutor: 'PGS. Lê Y', mode: 'offline', status: 'pending' }
  ]

  return (
    <div className='p-6 grid grid-cols-1 md:grid-cols-3 gap-6'>
      <div className='md:col-span-2 space-y-4'>
        <section className='bg-white p-4 rounded shadow'>
          <h3 className='font-semibold'>Lộ trình học được gợi ý</h3>
          <p className='text-sm text-gray-600'>
            Danh sách gợi ý cá nhân hoá dựa trên hồ sơ và lịch sử (Receive recommendations).
          </p>
          <div className='mt-3 space-y-2'>
            {recommended.map((r) => (
              <TutorCard key={r.id} tutor={r} onView={onViewProfile} onBook={() => onNavigate?.('schedule')} />
            ))}
          </div>
        </section>

        <section className='bg-white p-4 rounded shadow'>
          <h3 className='font-semibold'>Buổi sắp tới</h3>
          <div className='mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3'>
            {upcoming.map((u) => (
              <div key={u.id} className='p-3 border rounded'>
                Tutor: {u.tutor} — {u.date} {u.time} — {u.mode === 'online' ? 'Online' : 'Offline'} —{' '}
                <button className='text-blue-600' onClick={() => onNavigate?.('session')}>
                  Tham gia
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      <aside className='space-y-4'>
        <div className='bg-white p-4 rounded shadow'>
          <h4 className='font-medium'>Tìm Tutor nhanh</h4>
          <div className='mt-2'>
            <SearchBox placeholder='Tìm theo chuyên môn, tên...' onSearch={(q) => console.log('search', q)} />
          </div>
          <button className='w-full mt-3 bg-emerald-500 text-white py-2 rounded' onClick={() => onNavigate?.('tutors')}>
            Ghép cặp bằng AI
          </button>
        </div>

        <NotificationPanel />
      </aside>
    </div>
  )
}
