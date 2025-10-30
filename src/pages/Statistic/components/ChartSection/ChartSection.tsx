import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ChartSection({ summaries }: any) {
  return (
    <section>
      <h3 className="text-lg font-medium mb-2">Biểu đồ tỷ lệ buổi hoàn thành</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={summaries}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="semester" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="completionRate" fill="#2563eb" name="Tỷ lệ hoàn thành (%)" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  )
}
