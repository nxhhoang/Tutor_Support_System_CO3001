import type { SessionFeedback } from 'src/types/session.type'
import type { Avg } from 'src/types/session.type'

export function calcAvg(feedbacks: SessionFeedback[] | undefined): Avg {
  if (!feedbacks || feedbacks.length === 0) {
    return null
  }

  const sum = {
    practicalRelevance: 0,
    knowledgeLoad: 0,
    clarity: 0,
    enthusiasm: 0,
    goalTransmission: 0,
  }

  for (const fb of feedbacks) {
    sum.practicalRelevance += fb.practicalRelevance
    sum.knowledgeLoad += fb.knowledgeLoad
    sum.clarity += fb.clarity
    sum.enthusiasm += fb.enthusiasm
    sum.goalTransmission += fb.goalTransmission
  }

  const count = feedbacks.length

  return {
    practicalRelevance: Number((sum.practicalRelevance / count).toFixed(1)),
    knowledgeLoad: Number((sum.knowledgeLoad / count).toFixed(1)),
    clarity: Number((sum.clarity / count).toFixed(1)),
    enthusiasm: Number((sum.enthusiasm / count).toFixed(1)),
    goalTransmission: Number((sum.goalTransmission / count).toFixed(1)),
    count
  }
}
