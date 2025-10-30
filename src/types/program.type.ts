export type TutorSummary = {
  id: number
  name: string
  major?: string
  rating?: number
  bio?: string
  avail?: string[]
  experienceYears?: number
  expertiseTags?: string[]
}

export type ProgramCategory = 'Academic' | 'Non-Academic'
export type ProgramStatus = 'draft' | 'published' | 'closed' | 'archived'

export type Program = {
  id: number
  title: string
  code?: string
  description: string
  category: ProgramCategory
  field?: string
  capacity: number
  enrolledCount: number
  availableSlots: number
  startDate?: string
  endDate?: string
  tutors?: TutorSummary[]
  status: ProgramStatus
  createdBy?: number
}

export type ProgramRegistration = {
  id: number
  programId: number
  studentId: number
  tutorId?: number
  status: 'pending' | 'confirmed' | 'rejected' | 'cancelled'
  registeredAt: string
}