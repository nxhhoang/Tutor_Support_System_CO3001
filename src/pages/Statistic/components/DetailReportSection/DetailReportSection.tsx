/* eslint-disable @typescript-eslint/no-explicit-any */
export default function DetailReportSection({ details }: any) {
  return (
    <section>
      <h3 className="text-lg font-medium mb-2">Báo cáo chi tiết theo chương trình</h3>
      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Chương trình</th>
            <th className="p-2 border">Số Tutor</th>
            <th className="p-2 border">Số Mentee</th>
            <th className="p-2 border">Điểm TB</th>
            <th className="p-2 border">Buổi hoàn thành</th>
            <th className="p-2 border">Buổi đang diễn ra</th>
          </tr>
        </thead>
        <tbody>
          {details.map((r: any) => (
            <tr key={r.program.id}>
              <td className="p-2 border">{r.program.title}</td>
              <td className="p-2 border text-center">{r.tutorCount}</td>
              <td className="p-2 border text-center">{r.menteeCount}</td>
              <td className="p-2 border text-center">{r.avgScore}</td>
              <td className="p-2 border text-center">{r.completedSessions}</td>
              <td className="p-2 border text-center">{r.ongoingSessions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
