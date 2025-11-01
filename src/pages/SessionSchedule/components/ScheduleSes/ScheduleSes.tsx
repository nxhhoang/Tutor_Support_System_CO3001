import React from 'react'

interface ScheduleSessionProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: {
    programId: number
    studentIds: number[]
    mode: 'online' | 'offline'
    location: string
    time: string
  }) => void
  mockPrograms: { id: number; title: string }[]
  mockStudents: { id: number; name: string }[]
}

export default function ScheduleSes({
  open,
  onClose,
  onSubmit,
  mockPrograms,
  mockStudents
}: ScheduleSessionProps) {
  const [selectedProgram, setSelectedProgram] = React.useState<number | null>(null)
  const [selectedStudents, setSelectedStudents] = React.useState<number[]>([])
  const [selectedMode, setSelectedMode] = React.useState<'online' | 'offline'>('online')
  const [selectedLocation, setSelectedLocation] = React.useState('')
  const [selectedTime, setSelectedTime] = React.useState('')

  if (!open) return null

  function handleSave() {
    if (!selectedProgram || selectedStudents.length === 0 || !selectedTime) return
    onSubmit({
      programId: selectedProgram,
      studentIds: selectedStudents,
      mode: selectedMode,
      location: selectedLocation,
      time: selectedTime
    })
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-white/30'>
      <div className='bg-white rounded-xl shadow-2xl border border-gray-200 p-6 w-[460px] transition-all duration-200 scale-100 hover:scale-[1.01]'>
        <h3 className='text-lg font-semibold mb-4'>Thêm lịch dạy mới</h3>

        {/* Môn học */}
        <label className='block text-sm mb-1'>Chọn môn học</label>
        <select
          className='border rounded w-full p-2 mb-4'
          value={selectedProgram ?? ''}
          onChange={(e) => setSelectedProgram(Number(e.target.value))}
        >
          <option value=''>-- Chọn môn --</option>
          {mockPrograms.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>

        {/* Sinh viên */}
        <label className='block text-sm mb-1'>Chọn sinh viên</label>
        <div className='border rounded p-2 max-h-32 overflow-y-auto mb-4 space-y-1'>
          {mockStudents.map((st) => (
            <label key={st.id} className='flex items-center gap-2'>
              <input
                type='checkbox'
                checked={selectedStudents.includes(st.id)}
                onChange={(e) => {
                  if (e.target.checked) setSelectedStudents((prev) => [...prev, st.id])
                  else setSelectedStudents((prev) => prev.filter((id) => id !== st.id))
                }}
              />
              {st.name}
            </label>
          ))}
        </div>

        {/* Hình thức học */}
        <label className='block text-sm mb-1'>Hình thức học</label>
        <select
          className='border rounded w-full p-2 mb-4'
          value={selectedMode}
          onChange={(e) => setSelectedMode(e.target.value as 'online' | 'offline')}
        >
          <option value='online'>Online</option>
          <option value='offline'>Offline</option>
        </select>

        {/* Địa điểm (nếu offline) */}
        {selectedMode === 'offline' && (
          <>
            <label className='block text-sm mb-1'>Địa điểm học</label>
            <input
              className='border rounded w-full p-2 mb-4'
              placeholder='Nhập địa điểm...'
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            />
          </>
        )}

        {/* Thời gian */}
        <label className='block text-sm mb-1'>Thời gian học</label>
        <input
          type='datetime-local'
          className='border rounded w-full p-2 mb-4'
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        />

        <div className='flex justify-end gap-3'>
          <button className='px-4 py-2 border rounded' onClick={onClose}>
            Hủy
          </button>
          <button
            className='px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50'
            disabled={!selectedProgram || selectedStudents.length === 0 || !selectedTime}
            onClick={handleSave}
          >
            Lưu lịch
          </button>
        </div>
      </div>
    </div>
  )
}
