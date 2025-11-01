import React, { useContext } from 'react'
import ProgramSearchForm from './components/ProgramSearchForm'
import type { Program, ProgramCategory } from 'src/types/program.type'
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

  // ✅ debounce timer
  const debounceRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    fetchPrograms()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ✅ Theo dõi thay đổi của query / category / field để cập nhật tự động
  React.useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = window.setTimeout(() => {
      fetchPrograms({ q: query, category: category === 'all' ? '' : category, field })
    }, 400) // ⏱ 0.4s debounce
  }, [query, category, field])

  function fetchPrograms(params?: { q?: string; category?: string; field?: string }) {
    try {
      if (user?.role === 'tutor') {
        const data = MockProgramAPI.getProgramsByTutor(user.id)
        setPrograms(data)
        return
      }

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

      <ProgramSearchForm
        query={query}
        category={category}
        field={field}
        onQueryChange={setQuery}
        onCategoryChange={setCategory}
        onFieldChange={setField}
        onSearch={() => fetchPrograms({ q: query, category: category === 'all' ? '' : category, field })}
        onReset={() => {
          setQuery('')
          setField('')
          setCategory('all')
          fetchPrograms({ q: '', category: '', field: '' })
        }}
      />

      {error && <div className='text-red-600 mb-3'>{error}</div>}

      {programs.length === 0 ? (
        <div>Không tìm thấy chương trình nào.</div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {programs.map((p) => (
            <ProgramCard
              key={p.id}
              program={p}
              onViewDetail={() => openProgramDetail(p)}
              onRegister={user?.role === 'tutor' ? undefined : () => registerProgram(p.id)}
            />
          ))}
        </div>
      )}

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

      {toast && (
        <div className='fixed right-4 bottom-4 bg-gray-900 text-white px-4 py-2 rounded shadow' role='status'>
          <div className='flex items-center gap-4'>
            <div>{toast}</div>
            <button onClick={() => setToast(null)} className='text-sm px-2 py-1 bg-gray-700 rounded hover:bg-gray-600'>
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
