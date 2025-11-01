// src/types/mentee.type.ts
import type { Session, SessionFeedback } from './session.type'

export type MenteeNote = {
  id: number
  tutorId: number
  menteeId: number
  content: string
  createdAt: string
}

export type Mentee = {
  id: number
  name: string
  email: string
  major?: string
  year?: number
  avatar?: string
  phone?: string
  progress?: string
  nextSession?: Session
  previousFeedbacks?: SessionFeedback[]
  notes?: MenteeNote[]
  className: string
}
