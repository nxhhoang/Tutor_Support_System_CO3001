import type { TutorUser } from './user.type'

export type TutorWorkload = {
  tutor: TutorUser
  totalMentees: number
  totalSessions: number
  completedSessions: number
  totalHours: number
  avgCompletionRate: number // tỷ lệ hoàn thành %
  maxMentees: number
}
