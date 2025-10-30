// src/apis/mentee.api.ts
import type { Mentee, MenteeNote } from 'src/types/mentee.type'
import type { SessionFeedback } from 'src/types/session.type'

export const menteeApi = {
  _mentees: [
    {
      id: 1,
      name: 'Nguyễn Văn B',
      email: 'b.nguyen@example.com',
      major: 'Kỹ thuật Máy tính',
      year: 3,
      avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+B',
      phone: '0909123456',
      progress: 'Đang tham gia khóa ReactJS nâng cao',
      nextSession: {
        id: 101,
        programId: 1,
        tutorId: 10,
        studentId: 1,
        mode: 'online',
        location: 'Zoom link: https://zoom.us/j/123456789',
        time: '2025-11-03T19:00:00',
        status: 'confirmed',
        createdAt: '2025-10-20T10:00:00'
      },
      previousFeedbacks: [
        {
          id: 1,
          studentId: 1,
          sessionId: 99,
          ratingCriteria: {
            practicalRelevance: 5,
            knowledgeLoad: 4,
            clarity: 5,
            enthusiasm: 5,
            goalTransmission: 4
          },
          comment: 'Mentee rất chăm chỉ và có tiến bộ tốt.',
          createdAt: '2025-10-15T20:00:00'
        }
      ],
      notes: [
        {
          id: 1,
          tutorId: 10,
          menteeId: 1,
          content: 'Cần hỗ trợ thêm phần async trong React.',
          createdAt: '2025-10-25T09:30:00'
        }
      ]
    },
    {
      id: 2,
      name: 'Trần Thị C',
      email: 'c.tran@example.com',
      major: 'Công nghệ Thông tin',
      year: 2,
      avatar: 'https://ui-avatars.com/api/?name=Tran+Thi+C',
      progress: 'Hoàn thành khóa Python cơ bản',
      nextSession: null,
      previousFeedbacks: [],
      notes: []
    }
  ] as Mentee[],

  getAll(): Mentee[] {
    return this._mentees
  },

  getById(id: number): Mentee | undefined {
    return this._mentees.find((m) => m.id === id)
  },

  addNote(menteeId: number, tutorId: number, content: string): string {
    const mentee = this._mentees.find((m) => m.id === menteeId)
    if (!mentee) return 'Không tìm thấy mentee'

    const note: MenteeNote = {
      id: Date.now(),
      tutorId,
      menteeId,
      content,
      createdAt: new Date().toISOString()
    }

    mentee.notes = [...(mentee.notes || []), note]
    return 'Đã lưu ghi chú thành công ✅'
  },

  addFeedback(menteeId: number, feedback: SessionFeedback): string {
    const mentee = this._mentees.find((m) => m.id === menteeId)
    if (!mentee) return 'Không tìm thấy mentee'

    mentee.previousFeedbacks = [...(mentee.previousFeedbacks || []), feedback]
    return 'Đánh giá đã được lưu thành công ✅'
  }
}
