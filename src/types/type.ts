export type User = {
  id?: string
  name: string
  role?: 'student' | 'tutor' | 'admin'
  email?: string
}

export type Tutor = {
  id: number
  name: string
  major: string
  rating: number
  avail?: string[]
  bio?: string
}

export type SessionItem = {
  id: string
  date: string // 2025-10-28
  time: string // 14:00
  tutor: string
  mode: 'online' | 'offline'
  status?: 'confirmed' | 'pending' | 'cancelled' | 'done'
}

export type DocItem = {
  id: string
  title: string
  size?: string
  uploadedAt?: string
}
