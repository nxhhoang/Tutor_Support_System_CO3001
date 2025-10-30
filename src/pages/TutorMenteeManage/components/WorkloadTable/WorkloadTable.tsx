// src/pages/tutor/TutorMenteeManage/components/WorkloadTable.tsx
import type { TutorWorkload } from 'src/types/workload.type'

export default function WorkloadTable({
  data,
  avgCompletion
}: {
  data: TutorWorkload[]
  avgCompletion: number
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow-sm text-sm">
        <thead className="bg-slate-100 text-gray-700">
          <tr>
            <th className="p-2 text-left">Tutor</th>
            <th className="p-2">Mentee</th>
            <th className="p-2">Buổi học</th>
            <th className="p-2">Giờ học</th>
            <th className="p-2">% Hoàn thành</th>
            <th className="p-2">Tải hiện tại</th>
          </tr>
        </thead>
        <tbody>
          {data.map((t) => (
            <tr key={t.tutor.id} className="border-t hover:bg-slate-50">
              <td className="p-2">{t.tutor.name}</td>
              <td className="p-2 text-center">
                {t.totalMentees}/{t.maxMentees}
              </td>
              <td className="p-2 text-center">
                {t.completedSessions}/{t.totalSessions}
              </td>
              <td className="p-2 text-center">{t.totalHours}h</td>
              <td className="p-2 text-center">{t.avgCompletionRate}%</td>
              <td className="p-2 text-center">
                <div
                  className={`px-2 py-1 rounded ${
                    t.avgCompletionRate < avgCompletion
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {t.avgCompletionRate < avgCompletion ? 'Dư tải' : 'Ổn định'}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
