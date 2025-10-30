// src/types/profileView.type.ts
import type { BaseUser } from './user.type'

export interface ProfileView extends BaseUser {
  phone?: string
  skills?: string[]
  expertise?: string
  supportNeeds?: string
  avail?: string[]
  rating?: number
  major?: string
  class?: string
}

// Gợi ý kiểu phản hồi API tìm kiếm
export interface ProfileSearchResult {
  success: boolean
  data: ProfileView[]
  message?: string
}
