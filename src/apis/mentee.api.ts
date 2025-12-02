// import type { Mentee, MenteeNote } from 'src/types/mentee.type'
// import type { SessionFeedback } from 'src/types/session.type'

// const mentees: Mentee[] = [
//   {
//     id: 1,
//     name: 'Nguyễn Văn B',
//     email: 'b.nguyen@example.com',
//     major: 'Kỹ thuật Máy tính',
//     year: 3,
//     className: 'Hỗ trợ Lập trình C++ - Advanced',
//     avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+B',
//     phone: '0909123456',
//     progress: 'Đang tham gia khóa ReactJS nâng cao',
//     nextSession: {
//       id: 101,
//       programId: 1,
//       tutorId: 10,
//       studentId: 1,
//       mode: 'online',
//       location: 'Zoom link: https://zoom.us/j/123456789',
//       time: '2025-11-03T19:00:00',
//       status: 'confirmed',
//       createdAt: '2025-10-20T10:00:00'
//     },
//     previousFeedbacks: [
//       {
//         id: 1,
//         studentId: 1,
//         sessionId: 99,
//         practicalRelevance: 5,
//         knowledgeLoad: 4,
//         clarity: 5,
//         enthusiasm: 5,
//         goalTransmission: 4,
//         comment: 'Mentee rất chăm chỉ và có tiến bộ tốt.',
//         createdAt: '2025-10-15T20:00:00'
//       }
//     ],
//     notes: [
//       {
//         id: 1,
//         tutorId: 10,
//         menteeId: 1,
//         content: 'Cần hỗ trợ thêm phần async trong React.',
//         createdAt: '2025-10-25T09:30:00'
//       }
//     ]
//   },
// ]

// export const menteeApi = {
//   getAll(): Mentee[] {
//     return mentees
//   },

//   getById(id: number): Mentee | undefined {
//     return mentees.find((m) => m.id === id)
//   },

//   addNote(menteeId: number, tutorId: number, content: string): string {
//     const mentee = mentees.find((m) => m.id === menteeId)
//     if (!mentee) return 'Không tìm thấy mentee'

//     const note: MenteeNote = {
//       id: Date.now(),
//       tutorId,
//       menteeId,
//       content,
//       createdAt: new Date().toISOString()
//     }

//     mentee.notes = [...(mentee.notes || []), note]
//     return 'Đã lưu ghi chú thành công ✅'
//   },

//   addFeedback(menteeId: number, feedback: SessionFeedback): string {
//     const mentee = mentees.find((m) => m.id === menteeId)
//     if (!mentee) return 'Không tìm thấy mentee'

//     mentee.previousFeedbacks = [...(mentee.previousFeedbacks || []), feedback]
//     return 'Đánh giá đã được lưu thành công ✅'
//   }
// }

import http from 'src/utils/http'
import type { Mentee } from 'src/types/mentee.type'
import type { SessionFeedback } from 'src/types/session.type'
import type { SuccessResponse } from 'src/types/utils.type'

const URL = 'mentees'

export const menteeApi = {
  getAll() {
    return http.get<SuccessResponse<Mentee[]>>(URL)
  },

  getById(id: number) {
    return http.get<SuccessResponse<Mentee>>(`${URL}/${id}`)
  },

  addNote(menteeId: number, tutorId: number, content: string) {
    return http.post<SuccessResponse<null>>(`${URL}/note`, {
      menteeId,
      tutorId,
      content
    })
  },

  addFeedback(menteeId: number, feedback: SessionFeedback) {
    return http.post<SuccessResponse<null>>(`${URL}/feedback`, {
      menteeId,
      feedback
    })
  }
}