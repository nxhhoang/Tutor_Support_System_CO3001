import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getTopics, addTopic } from 'src/apis/topic.api'
import type { Topic } from 'src/types/topic.type'
import path from 'src/constants/path'

export default function Community() {
  const [topics, setTopics] = React.useState<Topic[]>([])
  const [q, setQ] = React.useState('')
  const [title, setTitle] = React.useState('')
  const navigate = useNavigate()

  React.useEffect(() => {
    setTopics(getTopics())
  }, [])

  function createTopic() {
    if (!title.trim()) return alert('Nhập tiêu đề')
    const newTopic = addTopic(title, 'Bạn')
    setTopics([newTopic, ...topics])
    setTitle('')
  }

  const filtered = topics.filter((t) => t.title.toLowerCase().includes(q.toLowerCase()))

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-semibold mb-4'>Cộng đồng</h2>
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
            <button className='px-3 py-2 border rounded'>Tìm</button>
          </div>
          <button className='mt-3 px-4 py-2 bg-blue-600 text-white rounded' onClick={createTopic}>
            Đăng chủ đề
          </button>
        </div>

        <div className='space-y-3'>
          {filtered.map((t) => (
            <div
              key={t.id}
              className='p-3 border rounded cursor-pointer hover:bg-gray-50'
              onClick={() => navigate(path.communityTopic.replace(':topicId', t.id))}
            >
              <div className='font-medium'>{t.title}</div>
              <div className='text-xs text-gray-500'>
                Bởi {t.author} • {t.createdAt} • {t.comments.length} bình luận
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div className='text-sm text-gray-500'>Không có chủ đề phù hợp.</div>}
        </div>
      </div>
    </div>
  )
}
