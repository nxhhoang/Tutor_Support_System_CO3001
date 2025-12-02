import http from 'src/utils/http'
import type { ProfileView, ProfileSearchResult } from 'src/types/profileView.type'
import type { SuccessResponse } from 'src/types/utils.type'

const URL = 'profiles'

export const profileApi = {
  getAll() {
    return http.get<SuccessResponse<ProfileView[]>>(`${URL}`)
  },

  getById(id: number) {
    return http.get<SuccessResponse<ProfileView[]>>(`${URL}/id`, {
      params: {
        ids: id
      }
    })
  },

  search(query: string) {
    return http.get<ProfileSearchResult>(`${URL}/search`, {
      params: {
        q: query
      }
    })
  },

  addProfile(profile: Omit<ProfileView, 'id'>) {
    return http.post<SuccessResponse<ProfileView>>(`${URL}`, profile)
  }
}