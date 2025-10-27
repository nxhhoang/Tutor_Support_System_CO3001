const path = {
  // --- AUTHENTICATION ---
  login: '/login',
  logout: '/logout',
  register: '/register', // nếu sau này có đăng ký riêng tutor

  // --- DASHBOARD ---
  dashboard: '/dashboard',

  // --- USER ---
  user: '/user',
  userProfile: '/user/profile',
  userSettings: '/user/settings',
  userSchedule: '/user/schedule',

  // --- TUTOR ---
  tutors: '/tutors',
  tutorDetail: '/tutors/:tutorId',
  tutorBook: '/tutors/:tutorId/book',

  // --- SCHEDULE & SESSION ---
  schedule: '/schedule',
  session: '/session',
  sessionDetail: '/session/:sessionId',

  // --- COMMUNITY ---
  community: '/community',
  communityTopic: '/community/:topicId',

  // --- DOCUMENTS ---
  documents: '/documents',
  documentDetail: '/documents/:docId',

  // --- SYSTEM / OTHER ---
  about: '/about',
  notFound: '*'
} as const

export default path
