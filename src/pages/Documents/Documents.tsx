import { useState, useEffect } from 'react'
import { docApi } from 'src/apis/doc.api'
import type { DocItem } from 'src/types/doc.type'
import { Search, ChevronDown, ChevronUp } from 'lucide-react'

export default function Documents() {
  const [docs, setDocs] = useState<DocItem[]>([])
  const [keyword, setKeyword] = useState('')
  const [message, setMessage] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  // Khi load trang → hiển thị tất cả tài liệu
  useEffect(() => {
    setDocs(docApi.getAllDocs())
  }, [])

  // Xử lý tìm kiếm
  const handleSearch = () => {
    if (!keyword.trim()) {
      setMessage('Vui lòng nhập từ khóa tìm kiếm.')
      setDocs(docApi.getAllDocs())
      return
    }
    setMessage('')
    setDocs(docApi.searchDocs(keyword))
  }

  // Xử lý tải xuống
  const handleDownload = (id: string) => {
    const msg = docApi.downloadDoc(id)
    setMessage(msg)
  }

  // Ẩn/hiện mô tả tài liệu
  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className='p-6 space-y-6'>
      <h2 className='text-2xl font-semibold mb-4'>Thư viện tài liệu (HCMUT_LIBRARY)</h2>

      {/* --- Thanh tìm kiếm --- */}
      <div className='flex gap-2 items-center bg-white p-4 rounded shadow'>
        <input
          type='text'
          placeholder='Nhập tên tài liệu, tác giả, môn học...'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className='flex-1 border rounded px-3 py-2'
        />
        <button
          className='flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded'
          onClick={handleSearch}
        >
          <Search size={16} /> Tìm kiếm
        </button>
      </div>

      {/* --- Thông báo --- */}
      {message && <div className='text-sm text-gray-600'>{message}</div>}

      {/* --- Danh sách tài liệu --- */}
      <div className='bg-white p-4 rounded shadow'>
        {docs.length === 0 ? (
          <div className='text-gray-500 text-sm'>Không tìm thấy tài liệu phù hợp.</div>
        ) : (
          <ul className='space-y-2'>
            {docs.map((d) => (
              <li key={d.id} className='p-3 border rounded'>
                <div className='flex justify-between items-center'>
                  <div>
                    <div className='font-medium text-base'>{d.title}</div>
                    <div className='text-xs text-gray-500'>
                      {d.size} • {d.uploadedAt}
                    </div>
                    <div className='text-sm text-gray-700'>
                      <span className='font-medium'>Tác giả:</span> {d.author || '—'} •{' '}
                      <span className='font-medium'>Môn học:</span> {d.subject || '—'}
                    </div>
                    <div className='text-sm text-gray-700'>
                      <span className='font-medium'>Chủ đề:</span> {d.topic || '—'}
                    </div>
                    {d.keywords && d.keywords.length > 0 && (
                      <div className='text-xs text-gray-500 mt-1'>
                        🔖 {d.keywords.map((k) => `#${k}`).join(' ')}
                      </div>
                    )}
                  </div>
                  <div className='flex gap-2'>
                    <button
                      className='flex items-center gap-1 px-3 py-1 border rounded hover:bg-gray-100 text-sm'
                      onClick={() => toggleExpand(d.id)}
                    >
                      {expandedId === d.id ? (
                        <>
                          Ẩn <ChevronUp size={14} />
                        </>
                      ) : (
                        <>
                          Xem <ChevronDown size={14} />
                        </>
                      )}
                    </button>
                    <button
                      className='px-3 py-1 border rounded hover:bg-gray-100 text-sm'
                      onClick={() => handleDownload(d.id)}
                    >
                      Tải
                    </button>
                  </div>
                </div>

                {/* --- Mô tả mở rộng --- */}
                {expandedId === d.id && (
                  <div className='mt-3 p-3 bg-gray-50 rounded text-sm text-gray-700'>
                    <p>
                      Đây là tài liệu thuộc môn <b>{d.subject}</b> với chủ đề{' '}
                      <b>{d.topic}</b>. Tác giả: <b>{d.author}</b>. 
                      Tài liệu bao gồm nội dung chi tiết giúp sinh viên củng cố kiến thức 
                      và chuẩn bị cho bài tập, đồ án, hoặc kỳ thi liên quan.
                    </p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
