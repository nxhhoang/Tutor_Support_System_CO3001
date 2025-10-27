import React from 'react'

export default function SearchBox({
  placeholder = 'Tìm... ',
  onSearch
}: {
  placeholder?: string
  onSearch?: (q: string) => void
}) {
  const [q, setQ] = React.useState('')
  return (
    <div className='flex gap-2'>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className='flex-1 border p-2 rounded'
        placeholder={placeholder}
      />
      <button className='px-3 py-2 border rounded' onClick={() => onSearch?.(q)}>
        Tìm
      </button>
    </div>
  )
}
