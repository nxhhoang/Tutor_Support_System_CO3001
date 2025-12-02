import type { Program } from 'src/types/program.type'

export type ReportSummary = {
  semester: string
  totalTutors: number
  totalStudents: number
  totalSessions: number
  avgFeedbackScore: number
  completionRate: number
}

export type DetailedReport = {
  program: Program
  tutorCount: number
  menteeCount: number
  avgScore: number
  completedSessions: number
  ongoingSessions: number
}

export type GenerateReportResponse = {
  success: boolean
  time: string
  filters: any
}