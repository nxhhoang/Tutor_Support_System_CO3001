import React, { useContext } from 'react'
import type { Program, ProgramCategory} from 'src/types/program.type'
import { MockProgramAPI } from 'src/apis/program.api'
import { AppContext } from 'src/contexts/app.context'
import ProgramCard from './components/ProgramCard/ProgramCard'
import ProgramDetailModal from './components/ProgramDetailModal/ProgramDetailModal'

export default function ProgramRegister() {
  const { user } = useContext(AppContext)

  const [query, setQuery] = React.useState('')
  const [category, setCategory] = React.useState<ProgramCategory | 'all'>('all')
  const [field, setField] = React.useState('')
  const [programs, setPrograms] = React.useState<Program[]>([])
  const [error, setError] = React.useState<string | null>(null)

  const [selectedProgram, setSelectedProgram] = React.useState<Program | null>(null)
  const [toast, setToast] = React.useState<string | null>(null)

  React.useEffect(() => {
    fetchPrograms()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function fetchPrograms(params?: { q?: string; category?: string; field?: string }) {
    try {
      // 🔹 Nếu user là tutor → chỉ hiện chương trình được gán sẵn
      if (user?.role === 'tutor') {
        const data = MockProgramAPI.getProgramsByTutor(user.id)
        setPrograms(data)
        return
      }

      // 🔹 Sinh viên hoặc role khác → dùng tìm kiếm
      const q = params?.q ?? query
      const cat = params?.category ?? (category === 'all' ? '' : category)
      const f = params?.field ?? field
      const data = MockProgramAPI.getPrograms({ q, category: cat, field: f })
      setPrograms(data)
    } catch (err: any) {
      setError(err.message || 'Lỗi khi lấy chương trình')
    }
  }

  function openProgramDetail(p: Program) {
    const data = MockProgramAPI.getProgramById(p.id)
    if (data) setSelectedProgram(data)
    else setToast('Không tìm thấy chương trình')
  }

  function registerProgram(programId: number) {
    if (!user) {
      setToast('Vui lòng đăng nhập để đăng ký chương trình')
      return
    }
    try {
      const reg = MockProgramAPI.registerProgram(programId, user.id)
      setToast(`Đăng ký thành công (mã ${reg.id})`)
      setPrograms(MockProgramAPI.getPrograms())
    } catch (err: any) {
      setToast(err.message || 'Đăng ký thất bại')
    }
  }

  function selectTutor(registrationId: number, tutorId: number) {
    const ok = MockProgramAPI.selectTutor(registrationId, tutorId)
    setToast(ok ? 'Chọn tutor thành công' : 'Chọn tutor thất bại')
  }

  function aiMatch(registrationId: number) {
    const list = MockProgramAPI.aiMatchTutors(registrationId)
    if (list.length === 0) setToast('Không có tutor phù hợp')
    else {
      setToast('AI gợi ý đã sẵn sàng')
      setSelectedProgram((prev) => (prev ? { ...prev, tutors: list } : prev))
    }
  }

  function handleSearchSubmit(e?: React.FormEvent) {
    e?.preventDefault()
    fetchPrograms({ q: query, category: category === 'all' ? '' : category, field })
  }

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-semibold mb-4'>
        {user?.role === 'tutor' ? 'Chương trình được phân công' : 'Đăng ký chương trình'}
      </h1>

      {/* 🔹 Form tìm kiếm: chỉ sinh viên mới thấy */}
      {user?.role !== 'tutor' && (
        <form
          onSubmit={handleSearchSubmit}
          className='flex flex-col md:flex-row gap-3 items-start md:items-center mb-4'
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Tìm theo tên chương trình...'
            className='px-3 py-2 border rounded w-full md:w-1/3'
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className='px-3 py-2 border rounded'
          >
            <option value='all'>Tất cả loại</option>
            <option value='Academic'>Academic</option>
            <option value='Non-Academic'>Non-Academic</option>
          </select>
          <input
            value={field}
            onChange={(e) => setField(e.target.value)}
            placeholder='Lĩnh vực'
            className='px-3 py-2 border rounded w-full md:w-1/4'
          />
          <div className='flex gap-2'>
            <button type='submit' className='px-3 py-2 bg-blue-600 text-white rounded'>
              Tìm
            </button>
            <button
              type='button'
              className='px-3 py-2 border rounded'
              onClick={() => {
                setQuery('')
                setField('')
                setCategory('all')
                fetchPrograms({ q: '', category: '', field: '' })
              }}
            >
              Đặt lại
            </button>
          </div>
        </form>
      )}

      {error && <div className='text-red-600 mb-3'>{error}</div>}

      {/* 🔹 Danh sách chương trình */}
      {programs.length === 0 ? (
        <div>Không tìm thấy chương trình nào.</div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {programs.map((p) => (
            <ProgramCard
              key={p.id}
              program={p}
              onViewDetail={() => openProgramDetail(p)}
              // tutor không có quyền đăng ký
              onRegister={user?.role === 'tutor' ? undefined : () => registerProgram(p.id)}
            />
          ))}
        </div>
      )}

      {/* 🔹 Modal chi tiết */}
      {selectedProgram && (
        <ProgramDetailModal
          program={selectedProgram}
          onClose={() => setSelectedProgram(null)}
          onRegister={() => registerProgram(selectedProgram.id)}
          onSelectTutor={selectTutor}
          onAIMatch={aiMatch}
          currentStudentId={user?.id}
        />
      )}

      {/* 🔹 Toast thông báo */}
      {toast && (
        <div
          className='fixed right-4 bottom-4 bg-gray-900 text-white px-4 py-2 rounded shadow'
          role='status'
        >
          <div className='flex items-center gap-4'>
            <div>{toast}</div>
            <button
              onClick={() => setToast(null)}
              className='text-sm px-2 py-1 bg-gray-700 rounded hover:bg-gray-600'
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  )
}



/* --------------------------- Modal Chi tiết --------------------------- */


