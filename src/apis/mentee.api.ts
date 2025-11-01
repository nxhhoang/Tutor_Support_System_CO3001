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
    },

    {
      id: 3,
      name: 'Lê Minh D',
      email: 'd.le@example.com',
      major: 'Khoa học Dữ liệu',
      year: 4,
      avatar: 'https://ui-avatars.com/api/?name=Le+Minh+D',
      phone: '0912345678',
      progress: 'Chuẩn bị cho dự án tốt nghiệp',
      nextSession: {
        id: 102,
        programId: 2,
        tutorId: 10,
        studentId: 3,
        mode: 'offline',
        location: 'Phòng 304, Tòa C',
        time: '2025-11-05T09:00:00',
        status: 'pending',
        createdAt: '2025-10-28T10:00:00'
      },
      previousFeedbacks: [
        {
          id: 2,
          studentId: 3,
          sessionId: 95,
          ratingCriteria: {
            practicalRelevance: 4,
            knowledgeLoad: 5,
            clarity: 4,
            enthusiasm: 4,
            goalTransmission: 5
          },
          comment: 'Học viên có khả năng phân tích dữ liệu tốt nhưng cần cải thiện phần trình bày.',
          createdAt: '2025-10-10T18:30:00'
        }
      ],
      notes: [
        {
          id: 2,
          tutorId: 10,
          menteeId: 3,
          content: 'Nên tập trung vào visualization bằng Matplotlib.',
          createdAt: '2025-10-26T09:45:00'
        }
      ]
    },

    {
      id: 4,
      name: 'Phạm Quỳnh E',
      email: 'e.pham@example.com',
      major: 'Kỹ thuật phần mềm',
      year: 1,
      avatar: 'https://ui-avatars.com/api/?name=Pham+Quynh+E',
      progress: 'Mới tham gia chương trình mentoring',
      nextSession: null,
      previousFeedbacks: [],
      notes: []
    },

    {
      id: 5,
      name: 'Hoàng Đức F',
      email: 'f.hoang@example.com',
      major: 'An toàn Thông tin',
      year: 3,
      avatar: 'https://ui-avatars.com/api/?name=Hoang+Duc+F',
      phone: '0987123456',
      progress: 'Đang học về bảo mật mạng nâng cao',
      nextSession: {
        id: 103,
        programId: 3,
        tutorId: 10,
        studentId: 5,
        mode: 'online',
        location: 'Google Meet: https://meet.google.com/abc-defg-hij',
        time: '2025-11-07T20:00:00',
        status: 'confirmed',
        createdAt: '2025-10-27T11:00:00'
      },
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
