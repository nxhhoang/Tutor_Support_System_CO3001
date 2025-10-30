// src/pages/tutor/TutorMenteeManage/components/CompletionChart.tsx
import { Card, CardContent } from 'src/components/ui/card/card'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import type { TutorWorkload } from 'src/types/workload.type'

export default function CompletionChart({
  data,
  avgCompletion
}: {
  data: TutorWorkload[]
  avgCompletion: number
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2">📈 So sánh tỷ lệ hoàn thành</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="tutor.name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="avgCompletionRate" fill="#3b82f6" name="% Hoàn thành" />
          </BarChart>
        </ResponsiveContainer>
        <div className="text-sm text-gray-600 mt-2">
          Trung bình hệ thống: <strong>{avgCompletion.toFixed(1)}%</strong>
        </div>
      </CardContent>
    </Card>
  )
}
