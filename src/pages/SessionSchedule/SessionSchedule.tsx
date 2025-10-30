import React, { useContext } from 'react'
import { sessionApi } from 'src/apis/session.api'
import type { Session, SessionFeedback } from 'src/types/session.type'
import { AppContext } from 'src/contexts/app.context'

import ConfirmedSessions from './components/ConfirmedSessions'
import calcAvg from './components/calcAvg'
import CompletedSessions from './components/CompletedSessions'
import ReportModal from './components/ReportModal'
import PendingSessions from './components/PendingSessions'
import RatingModal from './components/RatingModal'
import ViewFeedbackModal from './components/ViewFeedbackModal'

export default function SessionSchedule() {
  const { user } = useContext(AppContext)
  const [sessions, setSessions] = React.useState<Session[]>([])

  // rating modal (student)
  const [ratingOpen, setRatingOpen] = React.useState(false)
  const [ratingSession, setRatingSession] = React.useState<Session | null>(null)
  const [ratings, setRatings] = React.useState({
    practicalRelevance: 5,
    knowledgeLoad: 5,
    clarity: 5,
    enthusiasm: 5,
    goalTransmission: 5
  })
  const [ratingComment, setRatingComment] = React.useState('')

  // feedback modal (tutor)
  const [viewFeedbackOpen, setViewFeedbackOpen] = React.useState(false)
  const [viewFeedbackSession, setViewFeedbackSession] = React.useState<Session | null>(null)
  const [viewFeedbacks, setViewFeedbacks] = React.useState<SessionFeedback[]>([])

  // meeting report modal (tutor)
  const [reportOpen, setReportOpen] = React.useState(false)
  const [reportSession, setReportSession] = React.useState<Session | null>(null)
  const [reportText, setReportText] = React.useState('')

  // load sessions
  React.useEffect(() => {
    reloadSessions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  function reloadSessions() {
    if (!user) {
      setSessions([])
      return
    }
    if (user.role === 'student') setSessions(sessionApi.getSessionsByStudent(user.id))
    else if (user.role === 'tutor') setSessions(sessionApi.getSessionsByTutor(user.id))
  }

  if (!user) return <div className="p-6">Vui lòng đăng nhập để xem lịch học.</div>

  const confirmed = sessions.filter((s) => s.status === 'confirmed')
  const pending = sessions.filter((s) => s.status === 'pending')
  const completed = sessions.filter((s) => s.status === 'completed')

  // Handlers for actions invoked from child components
  function handleCancel(sessionId: number) {
    sessionApi.cancelSession(sessionId)
    reloadSessions()
  }

  function handleConfirm(sessionId: number) {
    sessionApi.confirmSession(sessionId)
    reloadSessions()
  }

  function openRating(session: Session) {
    setRatingSession(session)
    setRatings({
      practicalRelevance: 5,
      knowledgeLoad: 5,
      clarity: 5,
      enthusiasm: 5,
      goalTransmission: 5
    })
    setRatingComment('')
    setRatingOpen(true)
  }

  function submitRating() {
    if (!ratingSession || !user) return
    const payload = {
      studentId: user.id,
      sessionId: ratingSession.id,
      ratingCriteria: { ...ratings },
      comment: ratingComment
    }
    const newFeedback = sessionApi.addFeedback(ratingSession.id, payload as any)
    if (newFeedback) {
      reloadSessions()
      setRatingOpen(false)
    } else {
      alert('Không thể lưu đánh giá (session không tìm thấy).')
    }
  }

  function openViewFeedback(session: Session) {
    const f = sessionApi.getFeedbacksBySession(session.id)
    setViewFeedbackSession(session)
    setViewFeedbacks(f)
    setViewFeedbackOpen(true)
  }

  function openReport(session: Session) {
    setReportSession(session)
    setReportText(session.meetingReport || '')
    setReportOpen(true)
  }

  function submitReport() {
    if (!reportSession) return
    sessionApi.setMeetingReport(reportSession.id, reportText)
    if (user?.role === 'tutor') reloadSessions()
    setReportOpen(false)
  }

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-semibold mb-4">
        {user.role === 'tutor' ? 'Lịch dạy' : 'Lịch học'} ({user.role})
      </h2>

      <ConfirmedSessions
        sessions={confirmed}
        user={user}
        onCancel={handleCancel}
      />

      <PendingSessions
        sessions={pending}
        user={user}
        onConfirm={handleConfirm}
        onDelete={handleCancel}
      />

      <CompletedSessions
        sessions={completed}
        user={user}
        onOpenRating={openRating}
        onOpenFeedback={openViewFeedback}
        onOpenReport={openReport}
        calcAvg={calcAvg}
      />

      <RatingModal
        open={ratingOpen}
        session={ratingSession}
        ratings={ratings}
        onChangeRatings={setRatings}
        comment={ratingComment}
        onChangeComment={setRatingComment}
        onClose={() => setRatingOpen(false)}
        onSubmit={submitRating}
      />

      <ViewFeedbackModal
        open={viewFeedbackOpen}
        session={viewFeedbackSession}
        feedbacks={viewFeedbacks}
        onClose={() => setViewFeedbackOpen(false)}
      />

      <ReportModal
        open={reportOpen}
        session={reportSession}
        reportText={reportText}
        onChangeReportText={setReportText}
        onClose={() => setReportOpen(false)}
        onSubmit={submitReport}
      />
    </div>
  )
}
