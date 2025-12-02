import React, { useContext } from 'react'
import { programApi } from 'src/apis/program.api' // Đổi import
import { AppContext } from 'src/contexts/app.context'
import type { Program, TutorSummary } from 'src/types/program.type'

export default function ProgramDetailModal({
  program,
  onClose,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onRegister,
  onSelectTutor,
  onAIMatch,
  currentStudentId
}: {
  program: Program
  onClose: () => void
  onRegister: () => void
  onSelectTutor: (registrationId: number, tutorId: number) => void
  onAIMatch: (registrationId: number) => void
  currentStudentId?: number
}) {
  const { user } = useContext(AppContext)
  const isStudent = user?.role === 'student'

  const [registrationId, setRegistrationId] = React.useState<number | null>(null)
  const [tutors, setTutors] = React.useState<TutorSummary[] | undefined>(program.tutors)
  const [searchTutorQ, setSearchTutorQ] = React.useState('')
  const [viewTutor, setViewTutor] = React.useState<TutorSummary | null>(null)

  React.useEffect(() => {
    async function fetchRegistration() {
      if (currentStudentId) {
        try {
          const res = await programApi.getRegistrations(currentStudentId, program.id)
          if (res.data.data.length > 0) {
            setRegistrationId(res.data.data[0].id)
          }
        } catch (error) {
          console.error(error)
        }
      }
    }
    fetchRegistration()
  }, [program.id, currentStudentId])

  async function fetchTutors(q?: string) {
    try {
      const res = await programApi.getTutors({ programId: program.id, q })
      setTutors(res.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  async function ensureRegistration(): Promise<number | null> {
    if (registrationId) return registrationId
    if (!currentStudentId) return null
    try {
      const res = await programApi.registerProgram(program.id, currentStudentId)
      const newId = res.data.data.id
      setRegistrationId(newId)
      return newId
    } catch (error) {
      console.error(error)
      return null
    }
  }

  return (
    <div className='fixed inset-0 bg-black/40 flex items-start md:items-center justify-center p-4 z-50'>
      <div className='bg-white w-full max-w-4xl rounded shadow-lg overflow-auto max-h-[90vh]'>
        <div className='flex items-center justify-between p-4 border-b'>
          <h2 className='text-xl font-semibold'>{program.title}</h2>
          <button className='px-3 py-1 border rounded' onClick={onClose}>
            Đóng
          </button>
        </div>

        <div className='p-4 grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='md:col-span-2'>
            <p className='mb-3 text-sm text-gray-700'>{program.description}</p>
            <div className='mb-3 text-sm'>
              <div>
                Loại: <strong>{program.category}</strong>
              </div>
              <div>
                Lĩnh vực: <strong>{program.field}</strong>
              </div>
              <div>
                Số chỗ còn lại: <strong>{program.availableSlots}</strong>
              </div>
            </div>

            {isStudent && (
              <div className='flex gap-2'>
                <button
                  onClick={async () => {
                    let id = registrationId
                    if (!id) id = await ensureRegistration()
                    if (id) {
                      try {
                        onAIMatch(id)
                        const res = await programApi.aiMatchTutors(id)
                        const list = res.data.data
                        setTutors(list)
                        if (list.length > 0) {
                          onSelectTutor(id, list[0].id)
                          alert(`Đã ghép cặp AI thành công với ${list[0].name}!`)
                        } else {
                          alert('Không tìm thấy tutor phù hợp qua AI.')
                        }
                      } catch (error) {
                        console.log(error)
                        alert('Lỗi khi ghép cặp AI')
                      }
                    } else {
                        alert('Đăng ký thất bại, vui lòng thử lại.')
                    }
                  }}
                  className='px-3 py-2 border rounded'
                >
                  Ghép cặp bằng AI
                </button>
              </div>
            )}
          </div>

          {/* Danh sách tutor */}
          <aside className='border-l pl-4'>
            <h3 className='font-medium mb-2'>Danh sách Tutor</h3>
            <div className='mb-2 flex gap-2'>
              <input
                value={searchTutorQ}
                onChange={(e) => setSearchTutorQ(e.target.value)}
                placeholder='Tìm tutor...'
                className='px-2 py-1 border rounded w-full'
              />
              <button onClick={() => fetchTutors(searchTutorQ)} className='px-3 py-1 bg-gray-100 border rounded'>
                Tìm
              </button>
            </div>

            {!tutors || tutors.length === 0 ? (
              <div className='text-sm text-gray-600'>Không có tutor phù hợp</div>
            ) : (
              <ul className='space-y-2'>
                {tutors.map((t) => (
                  <li key={t.id} className='flex justify-between gap-2 p-2 border rounded'>
                    <div>
                      <div className='font-medium'>{t.name}</div>
                      <div className='text-xs text-gray-600'>Rating {t.rating ?? 'N/A'}</div>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <button
                        className='px-2 py-1 bg-blue-600 text-white rounded text-sm'
                        onClick={() => setViewTutor(t)}
                      >
                        Xem hồ sơ
                      </button>

                      {/* ✅ Nút "Đăng ký" chỉ hiện nếu là student */}
                      {isStudent && (
                        <button
                          className='px-2 py-1 border border-blue-600 text-blue-600 rounded text-sm hover:bg-blue-50'
                          onClick={async () => {
                            const id = await ensureRegistration()
                            if (id) {
                              onSelectTutor(id, t.id)
                              alert('Đăng ký tutor thành công!')
                            } else {
                                alert('Đăng ký chương trình thất bại.')
                            }
                          }}
                        >
                          Đăng ký
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </div>

        <div className='p-4 border-t text-sm text-gray-500'>
          <div>Trạng thái: {program.status}</div>
          <div>Bắt đầu: {program.startDate}</div>
        </div>
      </div>

      {/* Modal xem hồ sơ tutor */}
      {viewTutor && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
          <div className='bg-white w-full max-w-2xl rounded shadow-lg overflow-hidden'>
            <div className='flex items-center justify-between p-4 border-b'>
              <h3 className='text-lg font-semibold'>Hồ sơ Tutor</h3>
              <button className='px-3 py-1 border rounded' onClick={() => setViewTutor(null)}>
                Đóng
              </button>
            </div>
            <div className='p-4'>
              <div className='flex items-center gap-4'>
                <div className='w-20 h-20 bg-gray-200 rounded-full' />
                <div>
                  <div className='text-lg font-medium'>{viewTutor.name}</div>
                  <div className='text-sm text-gray-600'>Chuyên môn: {viewTutor.major}</div>
                  <div className='text-sm text-gray-600'>Đánh giá: {viewTutor.rating ?? 'N/A'}</div>
                </div>
              </div>
              <p className='mt-4 text-sm text-gray-700'>{viewTutor.bio || 'Tutor chưa có phần mô tả.'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}