import type { TutorWorkload } from 'src/types/workload.type'

const fakeTutorWorkload: TutorWorkload[] = [
  {
    tutor: {
      id: 1,
      name: 'ThS. Nguyễn Văn A',
      email: 'vana@uit.edu.vn',
      role: 'tutor',
      major: 'Khoa học Máy tính',
      rating: 4.7
    },
    totalMentees: 8,
    maxMentees: 10,
    totalSessions: 20,
    completedSessions: 16,
    totalHours: 30,
    avgCompletionRate: 80
  },
  {
    tutor: {
      id: 2,
      name: 'ThS. Trần Thị B',
      email: 'thib@uit.edu.vn',
      role: 'tutor',
      major: 'Kỹ thuật Phần mềm',
      rating: 4.5
    },
    totalMentees: 5,
    maxMentees: 10,
    totalSessions: 14,
    completedSessions: 12,
    totalHours: 21,
    avgCompletionRate: 86
  }
]

export const workloadApi = {
  getAll(): TutorWorkload[] {
    return fakeTutorWorkload
  },
  getAvgMetrics() {
    const avgCompletion =
      fakeTutorWorkload.reduce((sum, t) => sum + t.avgCompletionRate, 0) /
      fakeTutorWorkload.length
    const avgHours =
      fakeTutorWorkload.reduce((sum, t) => sum + t.totalHours, 0) /
      fakeTutorWorkload.length
    return { avgCompletion, avgHours }
  },
  assignMentee(tutorId: number, studentName: string): TutorWorkload[] {
    const tutor = fakeTutorWorkload.find((t) => t.tutor.id === tutorId)
    if (tutor && tutor.totalMentees < tutor.maxMentees) {
      tutor.totalMentees += 1
      tutor.totalSessions += 2
      tutor.totalHours += 3
      tutor.avgCompletionRate = Math.min(100, tutor.avgCompletionRate + 1)
      console.log(`Đã gán sinh viên ${studentName} cho tutor ${tutor.tutor.name}`)
    }
    return [...fakeTutorWorkload]
  }
}
