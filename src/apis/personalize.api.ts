// import type { LearningPreference, LearningGoal, Recommendation, LearningProgress } from 'src/types/personalize.type'

// const fakePreferences: LearningPreference[] = [
//   { id: 'p1', name: 'C++', level: 60 },
//   { id: 'p2', name: 'Python', level: 40 },
//   { id: 'p3', name: 'Lãnh đạo nhóm', level: 30 },
//   { id: 'p4', name: 'Giải tích 2', level: 70 }
// ]

// const fakeGoals: LearningGoal[] = [
//   { id: 'g1', content: 'Đạt A+ môn Cấu trúc dữ liệu' },
//   { id: 'g2', content: 'Nâng cao kỹ năng Python để làm đồ án AI' }
// ]

// let fakeRecommendations: Recommendation[] = [
//   {
//     id: 'r1',
//     title: 'Bạn có vẻ đang quan tâm đến ReactJS',
//     description: 'Hãy tham gia buổi tư vấn cùng Tutor Nguyễn Văn A để hiểu thêm về ReactJS.',
//     relatedSkill: 'ReactJS',
//     tutor: 'Nguyễn Văn A',
//     type: 'session',
//     feedback: null
//   },
//   {
//     id: 'r2',
//     title: 'Môn Giải tích 2 của bạn sắp thi',
//     description: 'Đây là một số tài liệu ôn tập hữu ích từ HCMUT_LIBRARY.',
//     relatedSkill: 'Giải tích 2',
//     docLink: '/library/analysis2.pdf',
//     type: 'document',
//     feedback: null
//   },
//   {
//     id: 'r3',
//     title: 'Phát triển kỹ năng lãnh đạo nhóm',
//     description: 'Thử tham gia Workshop "Team Leadership Fundamentals" tuần tới.',
//     relatedSkill: 'Lãnh đạo nhóm',
//     type: 'session',
//     feedback: null
//   }
// ]

// const fakeProgress: LearningProgress[] = [
//   { skill: 'C++', progress: 70 },
//   { skill: 'Python', progress: 50 },
//   { skill: 'Giải tích 2', progress: 85 },
//   { skill: 'Lãnh đạo nhóm', progress: 40 }
// ]

// export const personalizeApi = {
//   getPreferences(): LearningPreference[] {
//     return fakePreferences
//   },
//   getGoals(): LearningGoal[] {
//     return fakeGoals
//   },
//   getRecommendations(): Recommendation[] {
//     return fakeRecommendations
//   },
//   getProgress(): LearningProgress[] {
//     return fakeProgress
//   },
//   setFeedback(id: string, type: 'up' | 'down') {
//     fakeRecommendations = fakeRecommendations.map((r) =>
//       r.id === id ? { ...r, feedback: type } : r
//     )
//     return `Đã ghi nhận phản hồi (${type === 'up' ? '👍' : '👎'}) cho gợi ý #${id}`
//   }
// }

import http from 'src/utils/http'
import type { LearningPreference, LearningGoal, Recommendation, LearningProgress } from 'src/types/personalize.type'
import type { SuccessResponse } from 'src/types/utils.type'

const URL = 'personalize'

export const personalizeApi = {
  getPreferences() {
    return http.get<SuccessResponse<LearningPreference[]>>(`${URL}/preferences`)
  },

  getGoals() {
    return http.get<SuccessResponse<LearningGoal[]>>(`${URL}/goals`)
  },

  getRecommendations() {
    return http.get<SuccessResponse<Recommendation[]>>(`${URL}/recommendations`)
  },

  getProgress() {
    return http.get<SuccessResponse<LearningProgress[]>>(`${URL}/progress`)
  },

  setFeedback(id: string, type: 'up' | 'down') {
    return http.post<{ message: string; updated: Recommendation }>(`${URL}/recommendations/${id}/feedback`, {
      type
    })
  }
}