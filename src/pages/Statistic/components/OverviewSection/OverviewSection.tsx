/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from 'src/components/ui/card/card'
import { Button } from 'src/components/ui/button/button'

export default function OverviewSection({ semester, setSemester, summaries, setDetails, reportApi }: any) {
  return (
    <section>
      <h3 className="text-lg font-medium mb-2">Tổng quan theo học kỳ</h3>
      <div className="flex gap-3 mb-4">
        <select
          value={semester}
          onChange={(e) => {
            setSemester(e.target.value)
            setDetails(reportApi.getDetailedReports(e.target.value))
          }}
          className="border rounded px-3 py-1"
        >
          <option value="2025A">Học kỳ 2025A</option>
          <option value="2024B">Học kỳ 2024B</option>
          <option value="all">Tất cả</option>
        </select>
        <Button onClick={() => alert('Đã ghi nhận lịch sử truy cập báo cáo')}>🧾 Ghi nhận truy cập</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {summaries.map((s: any) => (
          <Card key={s.semester}>
            <CardContent className="p-3">
              <div className="font-semibold">{s.semester}</div>
              <div className="text-sm text-gray-600 mt-1">
                Tutor: {s.totalTutors} <br />
                SV: {s.totalStudents} <br />
                Buổi: {s.totalSessions} <br />
                TB: {s.avgFeedbackScore}⭐ <br />
                Hoàn thành: {s.completionRate}%
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
