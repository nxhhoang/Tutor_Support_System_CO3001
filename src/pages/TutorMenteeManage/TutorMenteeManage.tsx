import { Button } from 'src/components/ui/button/button'
import { useTutorWorkload } from 'src/hooks/useTutorWorkload'
import ReassignPanel from './components/ReassignPanel'
import WorkloadTable from './components/WorkloadTable'
import CompletionChart from './components/CompletionChart'

export default function TutorMenteeManage() {
  const { data, avg, reassignMentee } = useTutorWorkload()

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Quản lý Tutor & Mentee</h2>
      <ReassignPanel tutors={data} onReassign={reassignMentee} />
      <WorkloadTable data={data} avgCompletion={avg.avgCompletion} />
      <CompletionChart data={data} avgCompletion={avg.avgCompletion} />

      <div className="flex justify-end gap-2">
        <Button onClick={() => alert('Tính năng xuất báo cáo chưa triển khai')}>
          📤 Xuất báo cáo
        </Button>
        <Button onClick={() => alert('Đã gửi kết quả cho bộ môn')}>
          📧 Gửi kết quả cho bộ môn
        </Button>
      </div>
    </div>
  )
}
