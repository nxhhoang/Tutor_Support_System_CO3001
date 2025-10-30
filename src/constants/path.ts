// src/constants/path.ts
const path = {
  // --- AUTH ---
  login: '/login',
  logout: '/logout',

  // --- SSO ---
  sso: '/sso/login',
  homepage: '/',

  // --- DASHBOARD ---
  dashboard: '/dashboard',

  // --- USER ---
  profile: '/profile', //

  // --- TUTOR ---
  tutors: '/tutors',
  tutorDetail: '/tutors/profile/:tutorId',
  tutorBook: '/tutors/:tutorId/book',

  // --- SCHEDULE & SESSION ---
  session: '/session',
  sessionDetail: '/session/:sessionId',

  // --- COMMUNITY ---
  community: '/community',
  communityTopic: '/community/:topicId',

  // --- DOCUMENTS ---
  documents: '/documents', //
  documentDetail: '/documents/:docId', //

  // --- SYSTEM ---
  about: '/about',
  notFound: '*',

  manageMentee: '/mentees/manage',
  tutorMenteeManage: '/TutorMenteeManage',

  statistics: '/statistics',





  programRegister: '/program/register',
  programManage: '/program/manage',
  sessionManage: '/session/manage',
  studentManage: '/students/manage',
  learningPath: '/personalize-learning',
  
  tutorWorkload: '/tutor/workload',
  resourceAllocate: '/resources/allocate',
} as const

export default path
