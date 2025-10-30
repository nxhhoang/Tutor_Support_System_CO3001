export type LearningPreference = {
  id: string
  name: string
  level: number // mức độ tự tin 0-100
}

export type LearningGoal = {
  id: string
  content: string
}

export type Recommendation = {
  id: string
  title: string
  description: string
  relatedSkill?: string
  tutor?: string
  docLink?: string
  type: 'session' | 'document'
  feedback?: 'up' | 'down' | null
}

export type LearningProgress = {
  skill: string
  progress: number // phần trăm tiến độ
}
