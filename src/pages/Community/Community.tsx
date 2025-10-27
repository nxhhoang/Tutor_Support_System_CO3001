import React from 'react'

type Topic = { id: string; title: string; author: string; comments: number; createdAt: string }

export default function Community() {
  const [topics, setTopics] = React.useState<Topic[]>([
    { id: 't1', title: 'Hỏi về đề thực hành hệ điều hành', author: 'An', comments: 3, createdAt: '2025-10-20' },
    { id: 't2', title: 'Tài liệu C++ nâng cao', author: 'Bình', comments: 5, createdAt: '2025-10-21' }
  ])
  const [q, setQ] = React.useState('')
  const [title, setTitle] = React.useState('')

  function createTopic() {
    if (!title.trim()) return alert('Nhập tiêu đề')
    setTopics([
      {
        id: Date.now().toString(),
        title,
        author: 'Bạn',
        comments: 0,
        createdAt: new Date().toISOString().slice(0, 10)
      },
      ...topics
    ])
    setTitle('')
  }

  const filtered = topics.filter((t) => t.title.toLowerCase().includes(q.toLowerCase()))

  return (
    <div className='p-6'>
      <h2 className='text-xl font-semibold mb-4'>Cộng đồng</h2>
      <div className='bg-white p-4 rounded shadow'>
        <div className='mb-3'>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full border p-2 rounded'
            placeholder='Tạo chủ đề mới...'
          />
          <div className='flex gap-2 mt-2'>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className='flex-1 border p-2 rounded'
              placeholder='Tìm chủ đề...'
            />
            <button className='px-3 py-2 border rounded' onClick={() => {}}>
              Tìm
            </button>
          </div>
          <button className='mt-3 px-4 py-2 bg-blue-600 text-white rounded' onClick={createTopic}>
            Đăng chủ đề
          </button>
        </div>

        <div className='space-y-3'>
          {filtered.map((t) => (
            <div key={t.id} className='p-3 border rounded'>
              <div className='font-medium'>{t.title}</div>
              <div className='text-xs text-gray-500'>
                Bởi {t.author} • {t.createdAt} • {t.comments} bình luận
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div className='text-sm text-gray-500'>Không có chủ đề phù hợp.</div>}
        </div>
      </div>
    </div>
  )
}
