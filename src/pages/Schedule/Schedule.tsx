import ScheduleTable from 'src/components/ScheduleTable'
import type { SessionItem } from 'src/types/type'

export default function Schedule() {
  const items: SessionItem[] = [
    { id: 's1', date: '2025-10-28', time: '14:00', tutor: 'Trần X', mode: 'online', status: 'confirmed' },
    { id: 's2', date: '2025-10-30', time: '09:00', tutor: 'Lê Y', mode: 'offline', status: 'pending' }
  ]
  return (
    <div className='p-6'>
      <h2 className='text-xl font-semibold mb-4'>Lịch của tôi</h2>
      <ScheduleTable items={items} />
    </div>
  )
}
