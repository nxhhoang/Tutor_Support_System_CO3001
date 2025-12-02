import React, { useContext } from 'react'
import { sessionApi } from 'src/apis/session.api'
import type { CreateSessionFeedbackDto, Session, SessionFeedback } from 'src/types/session.type'
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

  const [viewFeedbackOpen, setViewFeedbackOpen] = React.useState(false)
  const [viewFeedbackSession, setViewFeedbackSession] = React.useState<Session | null>(null)
  const [viewFeedbacks, setViewFeedbacks] = React.useState<SessionFeedback[]>([])

  const [reportOpen, setReportOpen] = React.useState(false)
  const [reportSession, setReportSession] = React.useState<Session | null>(null)
  const [reportText, setReportText] = React.useState('')

  const [addScheduleOpen, setAddScheduleOpen] = React.useState(false)

  React.useEffect(() => {
    reloadSessions()
  }, [user])

  async function reloadSessions() {
    if (!user) {
      setSessions([])
      return
    }
    try {
      let res
      if (user.role === 'student') {
        res = await sessionApi.getSessionsByStudent(user.id)
      } else {
        res = await sessionApi.getSessionsByTutor(user.id)
      }
      setSessions(res.data.data)
    } catch (error) {
      console.error('Lỗi tải danh sách session:', error)
    }
  }

  function openTutorRating(session: Session) {
    setTutorRatingSession(session)
    setTutorRatingScore(5)
    setTutorRatingComment('')
    setTutorRatingOpen(true)
  }

  async function submitTutorRating() {
    if (!tutorRatingSession || !user) return
    try {
      await sessionApi.addTutorFeedback(tutorRatingSession.id, {
        tutorId: user.id,
        studentId: tutorRatingSession.studentId,
        sessionId: tutorRatingSession.id,
        rating: tutorRatingScore,
        comment: tutorRatingComment
      })
      setTutorRatingOpen(false)
      reloadSessions()
    } catch (error) {
      console.error('Lỗi gửi đánh giá sinh viên:', error)
      alert('Không thể gửi đánh giá.')
    }
  }

  if (!user) return <div className='p-6'>Vui lòng đăng nhập để xem lịch học.</div>

  const confirmed = sessions.filter((s) => s.status === 'confirmed')
  const pending = sessions.filter((s) => s.status === 'pending')
  const completed = sessions.filter((s) => s.status === 'completed')

  async function handleCancel(sessionId: number) {
    try {
      await sessionApi.cancelSession(sessionId)
      reloadSessions()
    } catch (error) {
      console.error(error)
      alert('Hủy lịch thất bại')
    }
  }

  async function handleConfirm(sessionId: number) {
    try {
      await sessionApi.confirmSession(sessionId)
      reloadSessions()
    } catch (error) {
      console.error(error)
      alert('Xác nhận lịch thất bại')
    }
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

  async function submitRating() {
    if (!ratingSession || !user) return

    const payload: CreateSessionFeedbackDto = {
      studentId: user.id,
      sessionId: ratingSession.id,
      comment: ratingComment,
      ...ratings
    }

    try {
      await sessionApi.addFeedback(ratingSession.id, payload)
      setRatingOpen(false)
      reloadSessions()
    } catch (error) {
      console.error(error)
      alert('Không thể lưu đánh giá.')
    }
  }

  async function openViewFeedback(session: Session) {
    try {
      const res = await sessionApi.getFeedbacksBySession(session.id)
      console.log(res)
      setViewFeedbackSession(session)
      setViewFeedbacks(res.data.data.data.studentFeedbacks || [])
      setViewFeedbackOpen(true)
    } catch (error) {
      console.error(error)
      alert('Không thể tải đánh giá.')
    }
  }

  function openReport(session: Session) {
    setReportSession(session)
    setReportText(session.meetingReport || '')
    setReportOpen(true)
  }

  async function submitReport() {
    if (!reportSession) return
    try {
      await sessionApi.setMeetingReport(reportSession.id, reportText)
      if (user?.role === 'tutor') reloadSessions()
      setReportOpen(false)
    } catch (error) {
      console.error(error)
      alert('Lỗi lưu báo cáo.')
    }
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
        onSubmit={async (data) => {
          if (!user) return
          try {
            await Promise.all(
              data.studentIds.map((sid) =>
                sessionApi.createSession({
                  programId: data.programId,
                  tutorId: user.id,
                  studentId: sid,
                  mode: data.mode,
                  location: data.mode === 'offline' ? data.location || 'Chưa rõ' : 'Online',
                  time: data.time.replace('T', ' '),
                  status: 'confirmed',
                  subject: 'Môn học mới'
                })
              )
            )
            setAddScheduleOpen(false)
            reloadSessions()
            alert('Thêm lịch dạy mới thành công!')
          } catch (error) {
            console.error(error)
            alert('Lỗi khi thêm lịch.')
          }
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
        onOpenTutorRating={openTutorRating}
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
