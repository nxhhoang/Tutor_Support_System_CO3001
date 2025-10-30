import React from 'react'
import { reportApi } from 'src/apis/report.api'

export function useReportData() {
  const [semester, setSemester] = React.useState('2025A')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [summaries, setSummaries] = React.useState(reportApi.getReportSummaries())
  const [details, setDetails] = React.useState(reportApi.getDetailedReports('2025A'))

  React.useEffect(() => {
    setDetails(reportApi.getDetailedReports(semester))
  }, [semester])

  return { semester, setSemester, summaries, details, setDetails }
}
