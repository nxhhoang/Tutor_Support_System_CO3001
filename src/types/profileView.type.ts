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

export interface ProfileSearchResult {
  success: boolean
  data: ProfileView[]
  message?: string
}
