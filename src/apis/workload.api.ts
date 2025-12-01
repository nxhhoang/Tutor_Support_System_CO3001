import type { SuccessResponse } from 'src/types/utils.type'
import type { TutorWorkload } from 'src/types/workload.type'
import http from 'src/utils/http'

const URL = 'workloads'

interface WorkloadMetrics {
  avgCompletion: number
  avgHours: number
}
interface AssignResponse {
  message: string
  data: TutorWorkload[]
}

export const workloadApi = {
  getAll() {
    return http.get<SuccessResponse<TutorWorkload[]>>(`${URL}/`)
  },

  getAvgMetrics() {
    return http.get<SuccessResponse<WorkloadMetrics>>(`${URL}/metrics`)
  },

  assignMentee(tutorId: number, studentName: string) {
    return http.post<SuccessResponse<AssignResponse>>(`${URL}/assign`, {
      tutorId,
      studentName
    })
  }
}
