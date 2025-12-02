import type { SuccessResponse } from 'src/types/utils.type'
import type { Session, SessionFeedback, TutorFeedback } from '../types/session.type'
import http from 'src/utils/http'

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
