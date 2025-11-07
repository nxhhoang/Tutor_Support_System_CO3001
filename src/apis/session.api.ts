import type { Session, SessionFeedback, TutorFeedback } from '../types/session.type'

const sessions: Session[] = [
  {
    id: 1,
    programId: 101,
    tutorId: 2,
    studentId: 11,
    mode: 'offline',
    location: 'A4-501',
    time: '2025-11-01 14:00',
    status: 'confirmed',
    createdAt: '2025-10-25',
    confirmedAt: '2025-10-26',
    subject: 'Toán cao cấp'
  },
  {
    id: 2,
    programId: 102,
    tutorId: 2,
    studentId: 1,
    mode: 'online',
    location: 'https://meet.google.com/abc-defg-hij',
    time: '2025-11-03 09:00',
    status: 'pending',
    createdAt: '2025-10-27',
    subject: 'Cấu trúc dữ liệu'
  },
  {
    id: 3,
    programId: 103,
    tutorId: 4,
    studentId: 11,
    mode: 'offline',
    location: 'B4-205',
    time: '2025-10-20 10:00',
    status: 'completed',
    createdAt: '2025-10-10',
    completedAt: '2025-10-20',
    subject: 'Mạng máy tính',
    feedbacks: [
      {
        id: 1,
        studentId: 11,
        sessionId: 3,
        ratingCriteria: {
          practicalRelevance: 5,
          knowledgeLoad: 4,
          clarity: 5,
          enthusiasm: 5,
          goalTransmission: 4
        },
        comment: 'Khóa học rất hay, giảng viên nhiệt tình và dễ hiểu!',
        createdAt: '2025-10-21'
      }
    ]
  },
  {
    id: 4,
    programId: 104,
    tutorId: 2,
    studentId: 12,
    mode: 'online',
    location: 'https://zoom.us/j/1234567890',
    time: '2025-11-05 19:00',
    status: 'confirmed',
    createdAt: '2025-10-29',
    confirmedAt: '2025-10-30',
    subject: 'Tiếng Anh giao tiếp'
  },
  {
    id: 5,
    programId: 105,
    tutorId: 3,
    studentId: 11,
    mode: 'offline',
    location: 'C6-202',
    time: '2025-11-10 08:00',
    status: 'pending',
    createdAt: '2025-10-28',
    subject: 'Vật lý đại cương'
  },
  {
    id: 6,
    programId: 106,
    tutorId: 2,
    studentId: 1,
    mode: 'online',
    location: 'https://meet.google.com/xyz-uvw-123',
    time: '2025-10-15 15:00',
    status: 'completed',
    createdAt: '2025-10-01',
    completedAt: '2025-10-15',
    subject: 'Phân tích thiết kế hệ thống',
    feedbacks: [
      {
        id: 2,
        studentId: 1,
        sessionId: 6,
        ratingCriteria: {
          practicalRelevance: 4,
          knowledgeLoad: 4,
          clarity: 4,
          enthusiasm: 3,
          goalTransmission: 5
        },
        comment: 'Buổi học ổn, có thể cải thiện phần trình bày ví dụ.',
        createdAt: '2025-10-16'
      }
    ],
    tutorFeedbacks: [
      {
        id: 1,
        tutorId: 2,
        studentId: 1,
        sessionId: 6,
        rating: 5,
        comment: 'Sinh viên tiếp thu tốt, chăm chỉ và đúng giờ.',
        createdAt: '2025-10-17'
      }
    ]
  },
  {
    id: 7,
    programId: 107,
    tutorId: 6,
    studentId: 1,
    mode: 'offline',
    location: 'E2-104',
    time: '2025-11-12 13:30',
    status: 'confirmed',
    createdAt: '2025-10-29',
    confirmedAt: '2025-10-30',
    subject: 'Nguyên lý máy học'
  },
  {
    id: 8,
    programId: 108,
    tutorId: 2,
    studentId: 1,
    mode: 'offline',
    location: 'A1-303',
    time: '2025-10-10 08:30',
    status: 'completed',
    createdAt: '2025-09-28',
    completedAt: '2025-10-10',
    subject: 'Lập trình hướng đối tượng',
    feedbacks: [
      {
        id: 3,
        studentId: 14,
        sessionId: 8,
        ratingCriteria: {
          practicalRelevance: 5,
          knowledgeLoad: 5,
          clarity: 5,
          enthusiasm: 5,
          goalTransmission: 5
        },
        comment: 'Xuất sắc! Giảng viên giải thích cực kỳ dễ hiểu.',
        createdAt: '2025-10-11'
      }
    ]
  }
]

export const sessionApi = {
  getAllSessions: () => sessions,
  getSessionsByStudent: (studentId: number) => sessions.filter((s) => s.studentId === studentId),
  getSessionsByTutor: (tutorId: number) => sessions.filter((s) => s.tutorId === tutorId),
  confirmSession: (id: number) => {
    const s = sessions.find((x) => x.id === id)
    if (s) s.status = 'confirmed'
  },
  cancelSession: (id: number) => {
    const s = sessions.find((x) => x.id === id)
    if (s) s.status = 'cancelled'
  },
  completeSession: (id: number) => {
    const s = sessions.find((x) => x.id === id)
    if (s) s.status = 'completed'
  },

  addFeedback: (
    sessionId: number,
    feedbackPayload: Omit<SessionFeedback, 'id' | 'createdAt'>
  ): SessionFeedback | null => {
    const s = sessions.find((x) => x.id === sessionId)
    if (!s) return null
    const newFeedback: SessionFeedback = {
      id: Date.now(), // simple id
      createdAt: new Date().toISOString().slice(0, 10),
      ...feedbackPayload
    }
    s.feedbacks = s.feedbacks || []
    s.feedbacks.push(newFeedback)
    return newFeedback
  },

  getFeedbacksBySession: (sessionId: number): SessionFeedback[] => {
    const s = sessions.find((x) => x.id === sessionId)
    return s?.feedbacks ? [...s.feedbacks] : []
  },
  setMeetingReport(sessionId: number, report: string) {
    const s = sessions.find((x) => x.id === sessionId)
    if (s) s.meetingReport = report
  },
  addTutorFeedback: (
    sessionId: number,
    feedbackPayload: Omit<TutorFeedback, 'id' | 'createdAt'>
  ): TutorFeedback | null => {
    const s = sessions.find((x) => x.id === sessionId)
    if (!s) return null
    const newFeedback: TutorFeedback = {
      id: Date.now(),
      createdAt: new Date().toISOString().slice(0, 10),
      ...feedbackPayload
    }
    s.tutorFeedbacks = s.tutorFeedbacks || []
    s.tutorFeedbacks.push(newFeedback)
    return newFeedback
  },

  getTutorFeedbackBySession: (sessionId: number): TutorFeedback[] => {
    const s = sessions.find((x) => x.id === sessionId)
    return s?.tutorFeedbacks ? [...s.tutorFeedbacks] : []
  }
}
