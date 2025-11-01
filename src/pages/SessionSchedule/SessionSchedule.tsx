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
import ScheduleSes from './components/ScheduleSes/ScheduleSes'
import TutorRatingModal from './components/TutorRatingModal'

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

  const [tutorRatingOpen, setTutorRatingOpen] = React.useState(false)
  const [tutorRatingSession, setTutorRatingSession] = React.useState<Session | null>(null)
  const [tutorRatingScore, setTutorRatingScore] = React.useState(5)
  const [tutorRatingComment, setTutorRatingComment] = React.useState('')

  // feedback modal (tutor)
  const [viewFeedbackOpen, setViewFeedbackOpen] = React.useState(false)
  const [viewFeedbackSession, setViewFeedbackSession] = React.useState<Session | null>(null)
  const [viewFeedbacks, setViewFeedbacks] = React.useState<SessionFeedback[]>([])

  // meeting report modal (tutor)
  const [reportOpen, setReportOpen] = React.useState(false)
  const [reportSession, setReportSession] = React.useState<Session | null>(null)
  const [reportText, setReportText] = React.useState('')

  // add schedule modal
  const [addScheduleOpen, setAddScheduleOpen] = React.useState(false)

  // load sessions
  React.useEffect(() => {
    reloadSessions()
  }, [user])

  function reloadSessions() {
    if (!user) {
      setSessions([])
      return
    }
    if (user.role === 'student') setSessions(sessionApi.getSessionsByStudent(user.id))
    else if (user.role === 'tutor') setSessions(sessionApi.getSessionsByTutor(user.id))
  }

  function openTutorRating(session: Session) {
    setTutorRatingSession(session)
    setTutorRatingScore(5)
    setTutorRatingComment('')
    setTutorRatingOpen(true)
  }

  function submitTutorRating() {
    if (!tutorRatingSession || !user) return
    sessionApi.addTutorFeedback(tutorRatingSession.id, {
      tutorId: user.id,
      studentId: tutorRatingSession.studentId,
      sessionId: tutorRatingSession.id,
      rating: tutorRatingScore,
      comment: tutorRatingComment
    })
    setTutorRatingOpen(false)
    reloadSessions()
  }

  if (!user) return <div className='p-6'>Vui lòng đăng nhập để xem lịch học.</div>

  const confirmed = sessions.filter((s) => s.status === 'confirmed')
  const pending = sessions.filter((s) => s.status === 'pending')
  const completed = sessions.filter((s) => s.status === 'completed')

  // Handlers
  function handleCancel(sessionId: number) {
    sessionApi.cancelSession(sessionId)
    reloadSessions()
  }

  function handleConfirm(sessionId: number, updatedData?: Partial<Session>) {
    if (updatedData) {
      sessionApi.confirmSession(sessionId)
      const s = sessionApi.getAllSessions().find((x) => x.id === sessionId)
      if (s) {
        s.time = updatedData.time!
        s.mode = updatedData.mode as any
        s.location = updatedData.location
      }
    } else {
      sessionApi.confirmSession(sessionId)
    }
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
    <div className='p-6 space-y-8'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-2xl font-semibold'>{user.role === 'tutor' ? 'Lịch dạy' : 'Lịch học'}</h2>

        {user.role === 'tutor' && (
          <button
            className='px-3 py-1 border w-40 border-blue-600 bg-blue-600 text-white rounded hover:bg-blue-700'
            onClick={() => setAddScheduleOpen(true)}
          >
            + Thêm lịch
          </button>
        )}
      </div>

      <ScheduleSes
        open={addScheduleOpen}
        onClose={() => setAddScheduleOpen(false)}
        onSubmit={(data) => {
          if (!user) return
          data.studentIds.forEach((sid) => {
            const newSession = {
              id: Date.now() + sid,
              programId: data.programId,
              tutorId: user.id,
              studentId: sid,
              mode: data.mode,
              location: data.mode === 'offline' ? data.location || 'Chưa rõ' : 'Online',
              time: data.time.replace('T', ' '),
              status: 'confirmed' as const,
              createdAt: new Date().toISOString().slice(0, 10),
              confirmedAt: new Date().toISOString().slice(0, 10),
              subject: 'Môn học mới'
            }
            sessionApi.getAllSessions().push(newSession)
          })
          setAddScheduleOpen(false)
          reloadSessions()
          alert('Thêm lịch dạy mới thành công!')
        }}
        mockPrograms={[
          { id: 1, title: 'Toán cao cấp' },
          { id: 2, title: 'Lập trình C++' },
          { id: 3, title: 'Vật lý đại cương' }
        ]}
        mockStudents={[
          { id: 101, name: 'Nguyễn Văn A' },
          { id: 102, name: 'Trần Thị B' },
          { id: 103, name: 'Phạm Văn C' }
        ]}
      />

      <ConfirmedSessions sessions={confirmed} user={user} onCancel={handleCancel} />

      <PendingSessions sessions={pending} user={user} onConfirm={handleConfirm} onDelete={handleCancel} />

      <CompletedSessions
        sessions={completed}
        user={user}
        onOpenRating={openRating}
        onOpenFeedback={openViewFeedback}
        onOpenReport={openReport}
        calcAvg={calcAvg}
        onOpenTutorRating={openTutorRating} // 👈 thêm dòng này
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

      <TutorRatingModal
        open={tutorRatingOpen}
        session={tutorRatingSession}
        rating={tutorRatingScore}
        comment={tutorRatingComment}
        onChangeRating={setTutorRatingScore}
        onChangeComment={setTutorRatingComment}
        onClose={() => setTutorRatingOpen(false)}
        onSubmit={submitTutorRating}
      />
    </div>
  )
}
