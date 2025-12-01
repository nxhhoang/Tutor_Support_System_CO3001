import React from 'react'
import { useNavigate } from 'react-router-dom'
import { topicApi } from 'src/apis/topic.api'
import type { Topic } from 'src/types/topic.type'
import path from 'src/constants/path'

export default function Community() {
  const [topics, setTopics] = React.useState<Topic[]>([])
  const [q, setQ] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate()

  React.useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true)
        const res = await topicApi.getTopics()

        setTopics(res.data.data) 
      } catch (error) {
        console.error('Lỗi khi tải danh sách chủ đề:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTopics()
  }, [])

  async function createTopic() {
    console.log('Tạo chủ đề với tiêu đề:', title)
    if (!title.trim()) return alert('Nhập tiêu đề')
    
    try {
      const res = await topicApi.addTopic(title, 'Bạn')
      setTopics([res.data.data, ...topics])
      setTitle('')
    } catch (error) {
      console.error('Lỗi khi tạo chủ đề:', error)
      alert('Không thể tạo chủ đề. Vui lòng thử lại.')
    }
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
          <button 
            className='mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300' 
            onClick={createTopic}
            disabled={!title.trim()}
          >
            Đăng chủ đề
          </button>
        </div>

        {loading ? (
          <div className='text-center py-4 text-gray-500'>Đang tải...</div>
        ) : (
          <div className='space-y-3'>
            {filtered.map((t) => (
              <div
                key={t.id}
                className='p-3 border rounded cursor-pointer hover:bg-gray-50 transition-colors'
                onClick={() => navigate(path.communityTopic.replace(':topicId', t.id))}
              >
                <div className='font-medium'>{t.title}</div>
                <div className='text-xs text-gray-500'>
                  Bởi {t.author} • {t.createdAt} • {t.comments ? t.comments.length : 0} bình luận
                </div>
              </div>
            ))}
            {filtered.length === 0 && <div className='text-sm text-gray-500'>Không có chủ đề phù hợp.</div>}
          </div>
        )}
      </div>
    </div>
  )
}