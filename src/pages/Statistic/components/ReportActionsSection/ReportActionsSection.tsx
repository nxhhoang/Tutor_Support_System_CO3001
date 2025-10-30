import { Button } from 'src/components/ui/button/button'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ReportActionsSection({ filters, setFilters, handleGenerate }: any) {
  return (
    <section className="space-y-3">
      <h3 className="text-lg font-medium">Tạo và Xuất báo cáo</h3>
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="border rounded px-3 py-1"
        >
          <option value="byProgram">Theo chương trình</option>
          <option value="byTutor">Theo tutor</option>
          <option value="byDepartment">Theo khoa/bộ môn</option>
        </select>

        <select
          value={filters.format}
          onChange={(e) => setFilters({ ...filters, format: e.target.value })}
          className="border rounded px-3 py-1"
        >
          <option value="pdf">PDF</option>
          <option value="excel">Excel</option>
        </select>

        <Button onClick={handleGenerate}>📊 Tạo báo cáo</Button>
        <Button onClick={() => alert('Đang xuất báo cáo...')}>📤 Xuất báo cáo</Button>
      </div>
    </section>
  )
}
