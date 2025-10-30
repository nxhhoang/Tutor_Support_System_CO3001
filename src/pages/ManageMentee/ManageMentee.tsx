// src/pages/tutor/ManageMentee.tsx
import { useEffect, useState } from 'react'
import { menteeApi } from 'src/apis/mentee.api'
import type { Mentee } from 'src/types/mentee.type'
import { Card, CardContent } from 'src/components/ui/card/card'
import { Button } from 'src/components/ui/button/button'

export default function ManageMentee() {
  const [mentees, setMentees] = useState<Mentee[]>([])
  const [selected, setSelected] = useState<Mentee | null>(null)
  const [note, setNote] = useState('')
  const [message, setMessage] = useState('')
  const tutorId = 10 // giả định tutor hiện tại có id = 10

  useEffect(() => {
    setMentees(menteeApi.getAll())
  }, [])

  const handleSelect = (m: Mentee) => {
    setSelected(m)
    setMessage('')
  }

  const handleSaveNote = () => {
    if (!selected || !note.trim()) return
    const msg = menteeApi.addNote(selected.id, tutorId, note.trim())
    setMentees(menteeApi.getAll())
    setSelected(menteeApi.getById(selected.id) || null)
    setNote('')
    setMessage(msg)
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Quản lý học viên (Mentee)</h2>
      <div className="text-sm text-gray-600">Tutor có thể xem thông tin, lịch học, ghi chú và đánh giá mentee.</div>

      {message && <div className="text-green-700 bg-green-50 p-2 rounded">{message}</div>}

      <div className="grid md:grid-cols-3 gap-4">
        {/* --- Danh sách mentee --- */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Danh sách mentee</h3>
          {mentees.map((m) => (
            <Card
              key={m.id}
              className={`cursor-pointer hover:bg-gray-50 ${selected?.id === m.id ? 'border-blue-500' : ''}`}
              onClick={() => handleSelect(m)}
            >
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <div className="font-medium">{m.name}</div>
                    <div className="text-xs text-gray-500">{m.major}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* --- Chi tiết mentee --- */}
        <div className="md:col-span-2">
          {selected ? (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Thông tin học viên</h3>
              <div className="text-sm text-gray-700 space-y-1">
                <div>Email: {selected.email}</div>
                <div>Ngành: {selected.major}</div>
                <div>Năm học: {selected.year}</div>
                <div>Tiến độ: {selected.progress}</div>
              </div>

              {/* --- Lịch học sắp tới --- */}
              {selected.nextSession && (
                <div className="bg-white p-3 rounded shadow">
                  <h4 className="font-semibold text-base mb-1">📅 Buổi học sắp tới</h4>
                  <div className="text-sm">
                    Thời gian: {new Date(selected.nextSession.time).toLocaleString('vi-VN')}
                    <br />
                    Hình thức: {selected.nextSession.mode === 'online' ? 'Online' : 'Offline'}
                    {selected.nextSession.location && <div>Địa điểm: {selected.nextSession.location}</div>}
                  </div>
                </div>
              )}

              {/* --- Đánh giá trước đó --- */}
              {selected.previousFeedbacks && selected.previousFeedbacks.length > 0 && (
                <div className="bg-white p-3 rounded shadow">
                  <h4 className="font-semibold text-base mb-1">📝 Đánh giá trước đó</h4>
                  {selected.previousFeedbacks.map((f) => (
                    <div key={f.id} className="border-b border-gray-200 pb-2 mb-2 text-sm">
                      <div>
                        <strong>Nhận xét:</strong> {f.comment}
                      </div>
                      <div className="text-xs text-gray-500">
                        Thời gian: {new Date(f.createdAt).toLocaleString('vi-VN')}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* --- Ghi chú --- */}
              <div className="bg-white p-3 rounded shadow">
                <h4 className="font-semibold text-base mb-2">🖊️ Ghi chú cho mentee</h4>
                <textarea
                  className="w-full border rounded p-2 text-sm"
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Nhập ghi chú sau buổi học..."
                />
                <div className="mt-2 flex justify-end">
                  <Button onClick={handleSaveNote}>Save</Button>
                </div>

                {selected.notes && selected.notes.length > 0 && (
                  <div className="mt-3 space-y-1 text-sm">
                    <h5 className="font-medium">📚 Ghi chú trước đó:</h5>
                    {selected.notes.map((n) => (
                      <div key={n.id} className="text-gray-700 border-l-2 border-blue-400 pl-2">
                        {n.content}{' '}
                        <span className="text-xs text-gray-500">
                          ({new Date(n.createdAt).toLocaleString('vi-VN')})
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-gray-500 italic">Chọn một mentee để xem chi tiết.</div>
          )}
        </div>
      </div>
    </div>
  )
}
