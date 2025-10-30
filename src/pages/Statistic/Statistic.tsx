import React from 'react'
import { reportApi } from 'src/apis/report.api'
import { useReportData } from 'src/hooks/useReportData'
import OverviewSection from './components/OverviewSection'
import ChartSection from './components/ChartSection'
import DetailReportSection from './components/DetailReportSection'
import ReportActionsSection from './components/ReportActionsSection'

export default function Statistic() {
  const { semester, setSemester, summaries, details, setDetails } = useReportData()
  const [filters, setFilters] = React.useState({ format: 'pdf', type: 'byProgram' })

  function handleGenerate() {
    const res = reportApi.generateReport({ semester, ...filters })
    if (res.success) alert(`Báo cáo đã được tạo thành công (${filters.format.toUpperCase()})!`)
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Thống kê và Phân tích</h2>

      <OverviewSection {...{ semester, setSemester, summaries, setDetails, reportApi }} />
      <ChartSection summaries={summaries} />
      <DetailReportSection details={details} />
      <ReportActionsSection {...{ filters, setFilters, handleGenerate }} />
    </div>
  )
}
