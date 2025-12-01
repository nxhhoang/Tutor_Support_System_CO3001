import type { SessionFeedback } from 'src/types/session.type'

export function calcAvg(feedbacks: SessionFeedback[] | undefined) {
  if (!feedbacks || feedbacks.length === 0) return 0

  const totalScore = feedbacks.reduce((sum, fb: any) => {
    // Kiem tra xem du lieu la kieu cu (co ratingCriteria) hay kieu moi (phang)
    // Neu fb.ratingCriteria ton tai thi dung no, neu khong thi dung chinh fb
    const criteria = fb.ratingCriteria || fb

    // Đảm bảo các giá trị là số (phòng trường hợp null/undefined)
    const p = Number(criteria.practicalRelevance) || 0
    const k = Number(criteria.knowledgeLoad) || 0
    const c = Number(criteria.clarity) || 0
    const e = Number(criteria.enthusiasm) || 0
    const g = Number(criteria.goalTransmission) || 0

    const sessionAvg = (p + k + c + e + g) / 5
    return sum + sessionAvg
  }, 0)

  return (totalScore / feedbacks.length).toFixed(1)
}