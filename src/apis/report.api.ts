import http from 'src/utils/http'
import type { DetailedReport, ReportSummary, GenerateReportResponse } from 'src/types/report.type'
import type { SuccessResponse } from 'src/types/utils.type'

const URL = 'reports'

export const reportApi = {
  getReportSummaries() {
    return http.get<SuccessResponse<ReportSummary[]>>(`${URL}/summaries`)
  },

  getDetailedReports(semester: string) {
    return http.get<SuccessResponse<DetailedReport[]>>(`${URL}/detailed`, {
      params: {
        semester
      }
    })
  },

  generateReport(filters: any) {
    return http.post<SuccessResponse<GenerateReportResponse>>(`${URL}/generate`, {
      filters
    })
  }
}