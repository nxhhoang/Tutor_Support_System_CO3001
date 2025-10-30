import type { DetailedReport, ReportSummary } from 'src/types/report.type'

const FAKE_SUMMARIES: ReportSummary[] = [
  { semester: '2025A', totalTutors: 15, totalStudents: 120, totalSessions: 340, avgFeedbackScore: 4.6, completionRate: 92 },
  { semester: '2024B', totalTutors: 12, totalStudents: 110, totalSessions: 300, avgFeedbackScore: 4.3, completionRate: 87 }
]

const FAKE_DETAILED: DetailedReport[] = [
  {
    program: { id: 1, title: 'Kỹ năng học đại học', description: 'Hỗ trợ sinh viên năm nhất', category: 'Non-Academic', capacity: 50, enrolledCount: 45, availableSlots: 5, status: 'published' },
    tutorCount: 3,
    menteeCount: 40,
    avgScore: 4.7,
    completedSessions: 20,
    ongoingSessions: 3
  },
  {
    program: { id: 2, title: 'Toán cao cấp A1', description: 'Hỗ trợ học tập chuyên sâu', category: 'Academic', capacity: 30, enrolledCount: 28, availableSlots: 2, status: 'published' },
    tutorCount: 2,
    menteeCount: 28,
    avgScore: 4.5,
    completedSessions: 16,
    ongoingSessions: 2
  }
]

export const reportApi = {
  getReportSummaries: () => FAKE_SUMMARIES,
  getDetailedReports: (semester: string) => FAKE_DETAILED.filter((r) => semester === 'all' || r.program.title.includes(semester)),
  generateReport: (filters: any) => ({ success: true, time: new Date().toISOString(), filters })
}

