import type { ProgramCategory } from 'src/types/program.type'

interface Props {
  query: string
  category: ProgramCategory | 'all'
  field: string
  onQueryChange: (v: string) => void
  onCategoryChange: (v: ProgramCategory | 'all') => void
  onFieldChange: (v: string) => void
  onSearch: () => void
  onReset: () => void
}

export default function ProgramSearchForm({
  query,
  category,
  field,
  onQueryChange,
  onCategoryChange,
  onFieldChange,
  onSearch,
  onReset
}: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSearch()
      }}
      className='flex flex-col md:flex-row gap-3 items-start md:items-center mb-4'
    >
      <input
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder='Tìm theo tên chương trình...'
        className='px-3 py-2 border rounded w-full md:w-1/3'
      />

      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value as ProgramCategory | 'all')}
        className='px-3 py-2 border rounded'
      >
        <option value='all'>Tất cả loại</option>
        <option value='Academic'>Academic</option>
        <option value='Non-Academic'>Non-Academic</option>
      </select>

      <input
        value={field}
        onChange={(e) => onFieldChange(e.target.value)}
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
          onClick={onReset}
        >
          Đặt lại
        </button>
      </div>
    </form>
  )
}
