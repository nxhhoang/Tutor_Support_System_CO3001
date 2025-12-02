import type { Program, TutorSummary, ProgramRegistration } from 'src/types/program.type'
import type { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

// export const tutors: TutorSummary[] = [
//   { id: 1, name: 'ThS. Trần X', major: 'Hệ điều hành', rating: 4.8, avail: ['28/10 14:00', '29/10 10:00'] },
//   { id: 2, name: 'PGS. Lê Y', major: 'Cơ sở dữ liệu', rating: 4.6, avail: ['30/10 09:00', '31/10 15:00'] },
//   { id: 3, name: 'TS. Nguyễn Z', major: 'Trí tuệ nhân tạo', rating: 4.9, avail: ['02/11 08:00', '03/11 13:00'] },
//   { id: 4, name: 'ThS. Phạm A', major: 'Cấu trúc dữ liệu & Giải thuật', rating: 4.7, avail: ['27/10 15:00', '29/10 09:00'] },
//   { id: 5, name: 'TS. Bùi B', major: 'Mạng máy tính', rating: 4.5, avail: ['28/10 16:00', '30/10 11:00'] },
//   { id: 6, name: 'ThS. Đỗ C', major: 'Phân tích thiết kế hệ thống', rating: 4.3, avail: ['01/11 10:00', '03/11 09:00'] },
//   { id: 7, name: 'PGS. Nguyễn D', major: 'An toàn thông tin', rating: 4.9, avail: ['31/10 13:00', '01/11 14:30'] },
//   { id: 8, name: 'TS. Lý E', major: 'Học máy nâng cao', rating: 4.8, avail: ['02/11 09:00', '03/11 15:00'] },
//   { id: 9, name: 'TS. Đỗ Nam Châm', major: 'Kỹ năng mềm', rating: 5.0, avail: ['02/11 08:00', '03/11 14:00'] },
//   { id: 10, name: 'ThS. Devon Larrat', major: 'Kỹ năng sinh tồn', rating: 4.5, avail: ['01/11 09:00', '01/11 14:00'] }
// ]

// export let programs: Program[] = [
//   {
//     id: 101,
//     title: 'Hỗ trợ Lập trình C++ - Advanced',
//     code: 'CPLUS_ADV_101',
//     description: 'Chương trình hỗ trợ nâng cao kỹ năng lập trình C++: STL, tối ưu, debug, template.',
//     category: 'Academic',
//     field: 'Programming',
//     capacity: 30,
//     enrolledCount: 12,
//     availableSlots: 18,
//     startDate: '2025-11-01',
//     endDate: '2025-12-15',
//     tutors: [tutors[0], tutors[3], tutors[5]],
//     status: 'published',
//     createdBy: 2
//   },
//   {
//     id: 102,
//     title: 'Hệ thống Cơ sở Dữ liệu - Thực hành',
//     code: 'DB_LAB_102',
//     description: 'Thực hành thiết kế và tối ưu cơ sở dữ liệu, SQL nâng cao, indexing.',
//     category: 'Academic',
//     field: 'Databases',
//     capacity: 25,
//     enrolledCount: 20,
//     availableSlots: 5,
//     startDate: '2025-11-05',
//     endDate: '2025-12-10',
//     tutors: [tutors[1]],
//     status: 'published',
//     createdBy: 3
//   },
//   {
//     id: 103,
//     title: 'An toàn thông tin cơ bản',
//     code: 'SEC_BASE_103',
//     description: 'Giới thiệu các khái niệm an toàn thông tin, thực hành pentest cơ bản.',
//     category: 'Academic',
//     field: 'Security',
//     capacity: 40,
//     enrolledCount: 35,
//     availableSlots: 5,
//     startDate: '2025-10-25',
//     endDate: '2025-11-30',
//     tutors: [tutors[6], tutors[1]],
//     status: 'published',
//     createdBy: 4
//   },
//   {
//     id: 104,
//     title: 'Workshop Mạng máy tính',
//     code: 'NET_WORK_104',
//     description: 'Tổng quan Mạng máy tính, cấu hình, thực hành lab.',
//     category: 'Academic',
//     field: 'Networking',
//     capacity: 20,
//     enrolledCount: 10,
//     availableSlots: 10,
//     startDate: '2025-11-02',
//     endDate: '2025-11-20',
//     tutors: [tutors[4]],
//     status: 'published',
//     createdBy: 5
//   },
//   {
//     id: 105,
//     title: 'Trí tuệ nhân tạo cho sinh viên',
//     code: 'AI_FOR_STU_105',
//     description: 'Nhập môn AI: mô hình, học có giám sát, bài tập thực tế.',
//     category: 'Academic',
//     field: 'AI',
//     capacity: 50,
//     enrolledCount: 40,
//     availableSlots: 10,
//     startDate: '2025-11-10',
//     endDate: '2025-12-20',
//     tutors: [tutors[2], tutors[7]],
//     status: 'published',
//     createdBy: 6
//   },
//   {
//     id: 106,
//     title: 'Kỹ năng thuyết trình trước đám đông',
//     code: 'SKILL_FOR_STU_106',
//     description: 'Bài học hỗ trợ sinh viên vượt qua nỗi sợ thuyết trình trước đám đông, tạo sự tự tin cho sinh viên',
//     category: 'Non-Academic',
//     field: 'SoftSkill',
//     capacity: 50,
//     enrolledCount: 40,
//     availableSlots: 10,
//     startDate: '2025-11-10',
//     endDate: '2025-12-20',
//     tutors: [tutors[8], tutors[9]],
//     status: 'published',
//     createdBy: 6
//   },
//   {
//     id: 107,
//     title: 'Cách sinh tồn nơi hoang dã rừng núi',
//     code: 'SKILL_FOR_STU_107',
//     description: 'Khám phá hành trình phiêu lưu giữa rừng rậm hoang vu, vắng vẻ và hoang dại',
//     category: 'Non-Academic',
//     field: 'SoftSkill',
//     capacity: 50,
//     enrolledCount: 40,
//     availableSlots: 10,
//     startDate: '2025-12-10',
//     endDate: '2025-13-20',
//     tutors: [],
//     status: 'published',
//     createdBy: 6
//   }
// ]

// export const registrations: ProgramRegistration[] = [
//   { id: 201, programId: 101, studentId: 1001, tutorId: 1, status: 'confirmed', registeredAt: new Date().toISOString() },
//   { id: 202, programId: 102, studentId: 1002, status: 'pending', registeredAt: new Date().toISOString() }
// ]

// let nextRegistrationId = 300

// export const MockProgramAPI = {
//   getPrograms: (params?: { q?: string; category?: string; field?: string }): Program[] => {
//     let list = [...programs]
//     if (params?.q) {
//       const q = params.q.toLowerCase()
//       list = list.filter(p => p.title.toLowerCase().includes(q))
//     }
//     if (params?.category) {
//       list = list.filter(p => p.category === params.category)
//     }
//     if (params?.field) {
//       const f = params.field.toLowerCase()
//       list = list.filter(p => p.field?.toLowerCase().includes(f))
//     }
//     return list
//   },

//   getProgramById: (id: number): Program | undefined => {
//     return programs.find(p => p.id === id)
//   },

//   registerProgram: (programId: number, studentId: number): ProgramRegistration => {
//     const reg: ProgramRegistration = {
//       id: nextRegistrationId++,
//       programId,
//       studentId,
//       status: 'pending',
//       registeredAt: new Date().toISOString()
//     }
//     registrations.push(reg)
//     programs = programs.map(p =>
//       p.id === programId
//         ? { ...p, enrolledCount: p.enrolledCount + 1, availableSlots: Math.max(0, p.availableSlots - 1) }
//         : p
//     )
//     return reg
//   },

//   selectTutor: (registrationId: number, tutorId: number): boolean => {
//     const reg = registrations.find(r => r.id === registrationId)
//     if (!reg) return false
//     reg.tutorId = tutorId
//     reg.status = 'confirmed'
//     return true
//   },

//   aiMatchTutors: (registrationId: number): TutorSummary[] => {
//     const reg = registrations.find(r => r.id === registrationId)
//     if (!reg) return []
//     const program = programs.find(p => p.id === reg.programId)
//     if (!program) return []
//     return program.tutors ?? []
//   },

//   getRegistrations: (studentId: number, programId: number): ProgramRegistration[] => {
//     return registrations.filter(r => r.studentId === studentId && r.programId === programId)
//   },

//   getTutors: (programId?: number, q?: string): TutorSummary[] => {
//     let list = [...tutors]
//     if (programId) {
//       const p = programs.find(x => x.id === programId)
//       if (p?.tutors) list = p.tutors
//     }
//     if (q) {
//       const query = q.toLowerCase()
//       list = list.filter(t => t.name.toLowerCase().includes(query) || t.major?.toLowerCase().includes(query))
//     }
//     return list
//   },

//   getProgramsByTutor: (tutorId: number): Program[] => {
//     return programs.filter(p => p.tutors?.some(t => t.id === tutorId))
//   }
// }

const URL = 'programs'

export const programApi = {
  getPrograms(params?: { q?: string; category?: string; field?: string }) {
    return http.get<SuccessResponse<Program[]>>(`${URL}`, {
      params
    })
  },

  getProgramById(id: number) {
    return http.get<SuccessResponse<Program>>(`${URL}/${id}`)
  },

  registerProgram(programId: number, studentId: number) {
    return http.post<SuccessResponse<ProgramRegistration>>(`${URL}/${programId}/register`, {
      studentId
    })
  },

  getRegistrations(studentId: number, programId: number) {
    return http.get<SuccessResponse<ProgramRegistration[]>>(`${URL}/registrations`, {
      params: {
        studentId,
        programId
      }
    })
  },

  selectTutor(registrationId: number, tutorId: number) {
    return http.post<SuccessResponse<{ success: boolean }>>(`${URL}/registrations/${registrationId}/select-tutor`, {
      tutorId
    })
  },

  aiMatchTutors(registrationId: number) {
    return http.get<SuccessResponse<TutorSummary[]>>(`${URL}/registrations/${registrationId}/match-tutors`)
  },

  getTutors(params?: { programId?: number; q?: string }) {
    return http.get<SuccessResponse<TutorSummary[]>>(`${URL}/tutors`, {
      params
    })
  }
}