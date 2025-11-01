import type { Program } from './program.type'
import type { User } from 'src/types/user.type'
import type { TutorSummary } from './program.type'

export type SessionMode = 'online' | 'offline'
export type SessionStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'

export type SessionFeedback = {
  id: number
  studentId: number
  sessionId: number
  ratingCriteria: {
    practicalRelevance: number // Bài giảng bám sát thực tế
    knowledgeLoad: number // Khối lượng kiến thức phù hợp
    clarity: number // Nội dung rõ ràng, logic
    enthusiasm: number // Giảng viên nhiệt tình
    goalTransmission: number // Mục tiêu truyền đạt rõ
  }
  comment?: string
  createdAt: string
}

export type TutorFeedback = {
  id: number
  tutorId: number
  studentId: number
  sessionId: number
  rating: number
  comment?: string
  createdAt: string
}

export type Session = {
  id: number
  programId: number
  tutorId: number
  studentId: number
  mode: SessionMode
  location?: string 
  time: string 
  status: SessionStatus
  createdAt: string
  confirmedAt?: string
  completedAt?: string
  subject: string
  programInfo?: Program
  tutorInfo?: TutorSummary
  studentInfo?: User
  feedbacks?: SessionFeedback[]
  tutorFeedbacks?: TutorFeedback[]
  meetingReport?: string
}

export type Avg = {
  practicalRelevance: number
  knowledgeLoad: number
  clarity: number
  enthusiasm: number
  goalTransmission: number
  count: number
} | null