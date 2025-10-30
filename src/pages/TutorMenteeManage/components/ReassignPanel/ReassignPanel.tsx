// src/pages/tutor/TutorMenteeManage/components/ReassignPanel.tsx
import { useState } from 'react'
import { Card, CardContent } from 'src/components/ui/card/card'
import { Button } from 'src/components/ui/button/button'
import type { TutorWorkload } from 'src/types/workload.type'

type Props = {
  tutors: TutorWorkload[]
  onReassign: (tutorId: number, student: string) => void
}

export default function ReassignPanel({ tutors, onReassign }: Props) {
  const [selectedTutor, setSelectedTutor] = useState<number | null>(null)
  const [selectedStudent, setSelectedStudent] = useState('')

  const handleReassign = () => {
    if (!selectedTutor || !selectedStudent) {
      alert('Vui lòng chọn tutor và sinh viên cần điều chỉnh.')
      return
    }
    onReassign(selectedTutor, selectedStudent)
    alert(`✅ Đã gán sinh viên ${selectedStudent} cho tutor có ID ${selectedTutor}.`)
    setSelectedTutor(null)
    setSelectedStudent('')
  }

  return (
    <Card>
      <CardContent className="space-y-3">
        <h3 className="font-semibold">🔧 Điều chỉnh phân bổ</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
          <div>
            <label className="block text-sm font-medium mb-1">Sinh viên</label>
            <input
              type="text"
              placeholder="Nhập tên sinh viên"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="border rounded px-2 py-1 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tutor</label>
            <select
              value={selectedTutor ?? ''}
              onChange={(e) => setSelectedTutor(Number(e.target.value))}
              className="border rounded px-2 py-1 w-full"
            >
              <option value="">-- Chọn tutor --</option>
              {tutors.map((t) => (
                <option key={t.tutor.id} value={t.tutor.id}>
                  {t.tutor.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <Button onClick={handleReassign}>💼 Điều chỉnh</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
