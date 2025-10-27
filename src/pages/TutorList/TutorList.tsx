import React from 'react'
import type { Tutor } from 'src/types/type'
import TutorCard from 'src/components/TutorCard'

export default function TutorList({ onViewProfile }: { onViewProfile?: (t: Tutor) => void }) {
  const [search, setSearch] = React.useState('')
  const [tutors, setTutors] = React.useState<Tutor[]>([
    { id: 1, name: 'ThS. Trần X', major: 'Hệ điều hành', rating: 4.8, avail: ['28/10 14:00', '29/10 10:00'] },
    { id: 2, name: 'PGS. Lê Y', major: 'Cơ sở dữ liệu', rating: 4.6, avail: ['30/10 09:00', '31/10 15:00'] },
    { id: 3, name: 'TS. Nguyễn Z', major: 'Trí tuệ nhân tạo', rating: 4.9, avail: ['02/11 08:00', '03/11 13:00'] }
  ])


  const filteredTutors = (tutors ?? []).filter((t) => {
    if (!search) return true
    const s = search.toLowerCase()
    const nameMatch = t.name.toLowerCase().includes(s)
    const majorMatch = t.major.toLowerCase().includes(s)
    return nameMatch || majorMatch
  })

  const handleAIMatching = () => {
    const bestTutor = tutors.reduce((best, curr) => (curr.rating > best.rating ? curr : best))
    alert(`AI gợi ý bạn nên chọn: ${bestTutor.name} (${bestTutor.major})`)
  }

  return (
    <div className='p-6'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-semibold'>Danh sách Tutor</h2>
        <div className='flex gap-2'>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Tìm theo chuyên môn, tên...'
            className='border rounded p-2 text-sm w-64'
          />
          <button onClick={handleAIMatching} className='bg-emerald-500 text-white px-3 py-2 rounded text-sm'>
            Ghép cặp bằng AI
          </button>
        </div>
      </div>

      {/* Danh sách Tutor */}
      <div className='grid gap-3'>
        {filteredTutors.length > 0 ? (
          filteredTutors.map((t) => (
            <TutorCard key={t.id} tutor={t} onView={onViewProfile} onBook={() => alert('Đặt lịch (mock)')} />
          ))
        ) : (
          <div className='text-sm text-gray-500 italic'>Không tìm thấy tutor phù hợp.</div>
        )}
      </div>
    </div>
  )
}
