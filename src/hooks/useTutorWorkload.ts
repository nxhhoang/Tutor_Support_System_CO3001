import { useEffect, useState } from 'react'
import { workloadApi } from 'src/apis/workload.api'
import type { TutorWorkload } from 'src/types/workload.type'

export function useTutorWorkload() {
  const [data, setData] = useState<TutorWorkload[]>([])
  const [avg, setAvg] = useState({ avgCompletion: 0, avgHours: 0 })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dataRes, avgRes] = await Promise.all([
          workloadApi.getAll(),
          workloadApi.getAvgMetrics()
        ])
        
        setData(dataRes.data.data)
        setAvg(avgRes.data.data)
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu workload:', error)
      }
    }

    fetchData()
  }, [])

  const reassignMentee = async (tutorId: number, student: string) => {
    try {
      const res = await workloadApi.assignMentee(tutorId, student)
      
      const updatedList = res.data.data
      setData(updatedList.data)
      
      return updatedList
    } catch (error) {
      console.error('Lỗi khi phân công sinh viên:', error)
      return data 
    }
  }

  return { data, avg, reassignMentee }
}