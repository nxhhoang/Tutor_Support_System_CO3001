import type { SessionFeedback } from 'src/types/session.type'

export function calcAvg(feedbacks: SessionFeedback[] | undefined) {
  if (!feedbacks || feedbacks.length === 0) return null
  const sum = feedbacks.reduce(
    (acc, f) => {
      acc.practicalRelevance += f.ratingCriteria.practicalRelevance
      acc.knowledgeLoad += f.ratingCriteria.knowledgeLoad
      acc.clarity += f.ratingCriteria.clarity
      acc.enthusiasm += f.ratingCriteria.enthusiasm
      acc.goalTransmission += f.ratingCriteria.goalTransmission
      return acc
    },
    { practicalRelevance: 0, knowledgeLoad: 0, clarity: 0, enthusiasm: 0, goalTransmission: 0 }
  )
  const n = feedbacks.length
  return {
    practicalRelevance: +(sum.practicalRelevance / n).toFixed(2),
    knowledgeLoad: +(sum.knowledgeLoad / n).toFixed(2),
    clarity: +(sum.clarity / n).toFixed(2),
    enthusiasm: +(sum.enthusiasm / n).toFixed(2),
    goalTransmission: +(sum.goalTransmission / n).toFixed(2),
    count: n
  }
}
