import React from 'react'
import { reportApi } from 'src/apis/report.api'
import type { DetailedReport, ReportSummary } from 'src/types/report.type'

export function useReportData() {
  const [semester, setSemester] = React.useState('2025A')
  const [summaries, setSummaries] = React.useState<ReportSummary[]>([])
  const [details, setDetails] = React.useState<DetailedReport[]>([])

  React.useEffect(() => {
    async function fetchSummaries() {
      const res = await reportApi.getReportSummaries()
      setSummaries(res.data.data)
    }
    fetchSummaries()
  }, [])

  React.useEffect(() => {
    async function fetchDetails() {
      const res = await reportApi.getDetailedReports(semester)
      setDetails(res.data.data)
    }
    fetchDetails()
  }, [semester])

  return { semester, setSemester, summaries, details, setDetails }
}
