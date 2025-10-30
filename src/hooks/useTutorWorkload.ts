// src/pages/tutor/TutorMenteeManage/hooks/useTutorWorkload.ts
import { useEffect, useState } from 'react'
import { workloadApi } from 'src/apis/workload.api'
import type { TutorWorkload } from 'src/types/workload.type'

export function useTutorWorkload() {
  const [data, setData] = useState<TutorWorkload[]>([])
  const [avg, setAvg] = useState({ avgCompletion: 0, avgHours: 0 })

  useEffect(() => {
    setData(workloadApi.getAll())
    setAvg(workloadApi.getAvgMetrics())
  }, [])

  const reassignMentee = (tutorId: number, student: string) => {
    const updated = workloadApi.assignMentee(tutorId, student)
    setData(updated)
    return updated
  }

  return { data, avg, reassignMentee }
}
