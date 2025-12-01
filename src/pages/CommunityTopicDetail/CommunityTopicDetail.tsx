import React from 'react'
import { useParams } from 'react-router-dom'
import { topicApi } from 'src/apis/topic.api'
import type { Topic, Comment } from 'src/types/topic.type'

export default function CommunityTopicDetail() {
  const { topicId } = useParams()
  const [topic, setTopic] = React.useState<Topic | null>(null)
  const [content, setContent] = React.useState('')
  const [replyTo, setReplyTo] = React.useState<Comment | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = React.useState(false)

  // Hàm load lại dữ liệu từ API
  const reloadTopic = React.useCallback(async () => {
    if (!topicId) return
    try {
      setLoading(true)
      const res = await topicApi.getTopicById(topicId)
      setTopic(res.data.data)
    } catch (error) {
      console.error('Lỗi khi tải chi tiết chủ đề:', error)
      setTopic(null)
    } finally {
      setLoading(false)
    }
  }, [topicId])

  React.useEffect(() => {
    reloadTopic()
  }, [reloadTopic])

  if (!topic) return <div className='p-6 text-gray-500'>Chủ đề không tồn tại.</div>

  const handleComment = async () => {
    if (!content.trim() || !topic) return

    try {
      await topicApi.addComment(topic.id, content, 'Bạn', replyTo?.id)
      setContent('')
      setReplyTo(null)
      await reloadTopic() // reload lại danh sách comment từ server
    } catch (error) {
      console.error('Lỗi khi gửi bình luận:', error)
      alert('Không thể gửi bình luận. Vui lòng thử lại.')
    }
  }

  const renderComment = (c: Comment) => (
    <div key={c.id} className='border-l-2 pl-3 ml-3 my-2'>
      <div className='text-sm'>
        <span className='font-medium'>{c.author}</span>: {c.content}
      </div>
      <div className='text-xs text-gray-500'>
        {c.createdAt}{' '}
        <button className='text-blue-500 ml-2' onClick={() => setReplyTo(c)}>
          Trả lời
        </button>
      </div>
      {topic.comments
        .filter((child) => child.parentId === c.id)
        .map((child) => renderComment(child))}
    </div>
  )

  return (
    <div className='p-6'>
      <h2 className='text-xl font-semibold mb-2'>{topic.title}</h2>
      <div className='text-gray-500 text-sm mb-4'>
        Bởi {topic.author} • {topic.createdAt}
      </div>

      <div className='bg-white p-4 rounded shadow'>
        <h3 className='font-medium mb-2'>Bình luận</h3>

        <div className='space-y-2'>
          {topic.comments.filter((c) => c.level === 0).map((c) => renderComment(c))}
          {topic.comments.length === 0 && <div className='text-sm text-gray-500'>Chưa có bình luận nào.</div>}
        </div>

        <div className='mt-4'>
          {replyTo && (
            <div className='text-sm text-gray-600 mb-1'>
              Trả lời bình luận của <b>{replyTo.author}</b>{' '}
              <button className='text-red-500 ml-2' onClick={() => setReplyTo(null)}>
                Hủy
              </button>
            </div>
          )}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='w-full border p-2 rounded mb-2'
            placeholder='Viết bình luận...'
          />
          <button className='px-4 py-2 bg-blue-600 text-white rounded' onClick={handleComment}>
            Gửi
          </button>
        </div>
      </div>
    </div>
  )
}
