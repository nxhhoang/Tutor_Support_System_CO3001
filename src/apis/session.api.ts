import type { SuccessResponse } from 'src/types/utils.type'
import type { Session, SessionFeedback, TutorFeedback } from '../types/session.type'
import http from 'src/utils/http'

// const sessions: Session[] = [
//   {
//     id: 1,
//     programId: 101,
//     tutorId: 2,
//     studentId: 11,
//     mode: 'offline',
//     location: 'A4-501',
//     time: '2025-11-01 14:00',
//     status: 'confirmed',
//     createdAt: '2025-10-25',
//     confirmedAt: '2025-10-26',
//     subject: 'Toán cao cấp'
//   },
//   {
//     id: 2,
//     programId: 102,
//     tutorId: 2,
//     studentId: 1,
//     mode: 'online',
//     location: 'https://meet.google.com/abc-defg-hij',
//     time: '2025-11-03 09:00',
//     status: 'pending',
//     createdAt: '2025-10-27',
//     subject: 'Cấu trúc dữ liệu'
//   },
//   {
//     id: 3,
//     programId: 103,
//     tutorId: 4,
//     studentId: 11,
//     mode: 'offline',
//     location: 'B4-205',
//     time: '2025-10-20 10:00',
//     status: 'completed',
//     createdAt: '2025-10-10',
//     completedAt: '2025-10-20',
//     subject: 'Mạng máy tính',
//     feedbacks: [
//       {
//         id: 1,
//         studentId: 11,
//         sessionId: 3,
//         ratingCriteria: {
//           practicalRelevance: 5,
//           knowledgeLoad: 4,
//           clarity: 5,
//           enthusiasm: 5,
//           goalTransmission: 4
//         },
//         comment: 'Khóa học rất hay, giảng viên nhiệt tình và dễ hiểu!',
//         createdAt: '2025-10-21'
//       }
//     ]
//   },
//   {
//     id: 4,
//     programId: 104,
//     tutorId: 2,
//     studentId: 12,
//     mode: 'online',
//     location: 'https://zoom.us/j/1234567890',
//     time: '2025-11-05 19:00',
//     status: 'confirmed',
//     createdAt: '2025-10-29',
//     confirmedAt: '2025-10-30',
//     subject: 'Tiếng Anh giao tiếp'
//   },
//   {
//     id: 5,
//     programId: 105,
//     tutorId: 3,
//     studentId: 11,
//     mode: 'offline',
//     location: 'C6-202',
//     time: '2025-11-10 08:00',
//     status: 'pending',
//     createdAt: '2025-10-28',
//     subject: 'Vật lý đại cương'
//   },
//   {
//     id: 6,
//     programId: 106,
//     tutorId: 2,
//     studentId: 1,
//     mode: 'online',
//     location: 'https://meet.google.com/xyz-uvw-123',
//     time: '2025-10-15 15:00',
//     status: 'completed',
//     createdAt: '2025-10-01',
//     completedAt: '2025-10-15',
//     subject: 'Phân tích thiết kế hệ thống',
//     feedbacks: [
//       {
//         id: 2,
//         studentId: 1,
//         sessionId: 6,
//         ratingCriteria: {
//           practicalRelevance: 4,
//           knowledgeLoad: 4,
//           clarity: 4,
//           enthusiasm: 3,
//           goalTransmission: 5
//         },
//         comment: 'Buổi học ổn, có thể cải thiện phần trình bày ví dụ.',
//         createdAt: '2025-10-16'
//       }
//     ],
//     tutorFeedbacks: [
//       {
//         id: 1,
//         tutorId: 2,
//         studentId: 1,
//         sessionId: 6,
//         rating: 5,
//         comment: 'Sinh viên tiếp thu tốt, chăm chỉ và đúng giờ.',
//         createdAt: '2025-10-17'
//       }
//     ]
//   },
//   {
//     id: 7,
//     programId: 107,
//     tutorId: 6,
//     studentId: 1,
//     mode: 'offline',
//     location: 'E2-104',
//     time: '2025-11-12 13:30',
//     status: 'confirmed',
//     createdAt: '2025-10-29',
//     confirmedAt: '2025-10-30',
//     subject: 'Nguyên lý máy học'
//   },
//   {
//     id: 8,
//     programId: 108,
//     tutorId: 2,
//     studentId: 1,
//     mode: 'offline',
//     location: 'A1-303',
//     time: '2025-10-10 08:30',
//     status: 'completed',
//     createdAt: '2025-09-28',
//     completedAt: '2025-10-10',
//     subject: 'Lập trình hướng đối tượng',
//     feedbacks: [
//       {
//         id: 3,
//         studentId: 14,
//         sessionId: 8,
//         ratingCriteria: {
//           practicalRelevance: 5,
//           knowledgeLoad: 5,
//           clarity: 5,
//           enthusiasm: 5,
//           goalTransmission: 5
//         },
//         comment: 'Xuất sắc! Giảng viên giải thích cực kỳ dễ hiểu.',
//         createdAt: '2025-10-11'
//       }
//     ]
//   }
// ]

const URL = 'sessions'

type FeedbackListResponse = {
  data: {
    studentFeedbacks: SessionFeedback[]
    tutorFeedbacks: TutorFeedback[]
  }
}

export const sessionApi = {
  getAllSessions() {
    return http.get<SuccessResponse<Session[]>>(`${URL}/`)
  },

  getSessionsByStudent(studentId: number) {
    return http.get<SuccessResponse<Session[]>>(`${URL}/student/${studentId}`)
  },

  getSessionsByTutor(tutorId: number) {
    return http.get<SuccessResponse<Session[]>>(`${URL}/tutor/${tutorId}`)
  },

  createSession(payload: {
    programId: number
    tutorId: number
    studentId: number
    mode: 'online' | 'offline'
    location?: string
    time: string
    subject: string
    status: 'confirmed'
    meetingReport?: string
  }) {
    return http.post<SuccessResponse<Session>>(`${URL}/`, payload)
  },

  confirmSession(id: number) {
    return http.patch<SuccessResponse<Session>>(`${URL}/${id}/status`, {
      status: 'confirmed'
    })
  },

  cancelSession(id: number) {
    return http.patch<SuccessResponse<Session>>(`${URL}/${id}/status`, {
      status: 'cancelled'
    })
  },

  completeSession(id: number) {
    return http.patch<SuccessResponse<Session>>(`${URL}/${id}/status`, {
      status: 'completed'
    })
  },

  addFeedback(sessionId: number, feedbackPayload: Omit<SessionFeedback, 'id' | 'createdAt'>) {
    return http.post<SuccessResponse<SessionFeedback>>(`${URL}/${sessionId}/feedback`, feedbackPayload)
  },

  getFeedbacksBySession(sessionId: number) {
    return http.get<SuccessResponse<FeedbackListResponse>>(`${URL}/${sessionId}/feedback`)
  },

  setMeetingReport(sessionId: number, report: string) {
    return http.patch<SuccessResponse<null>>(`${URL}/${sessionId}/report`, {
      report
    })
  },

  addTutorFeedback(sessionId: number, feedbackPayload: Omit<TutorFeedback, 'id' | 'createdAt'>) {
    return http.post<SuccessResponse<TutorFeedback>>(`${URL}/${sessionId}/tutor-feedback`, feedbackPayload)
  }
}
