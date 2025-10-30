import { lazy, Suspense, useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import path from './constants/path'
import { AppContext } from './contexts/app.context'
import MainLayout from 'src/layouts/MainLayout'
import AuthLayout from 'src/layouts/AuthLayout'

// --- AUTH ---
const HomePage = lazy(() => import('./pages/HomePage'))
const SSOLogin = lazy(() => import('./pages/SSOlogin'))

// --- CORE ---
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Profile = lazy(() => import('./pages/Profile/Profile'))
const NotFound = lazy(() => import('./pages/NotFound'))
const ManageMentee = lazy(() => import('./pages/ManageMentee'))

// --- STUDENT / TUTOR FEATURES ---
// const TutorList = lazy(() => import('./pages/TutorList'))
const TutorProfile = lazy(() => import('./pages/TutorProfile'))
const Community = lazy(() => import('./pages/Community'))
const CommunityTopicDetail = lazy(() => import('src/pages/CommunityTopicDetail'))
const Documents = lazy(() => import('./pages/Documents'))
const SessionPage = lazy(() => import('./pages/SessionSchedule'))
const PersonalizeLearning = lazy(() => import('./pages/PersonalizeLearning'))
const TutorMenteeManage = lazy(() => import('./pages/TutorMenteeManage'))
const Statistics = lazy(() => import('./pages/Statistic'))

// --- NEW: PROGRAM & MANAGEMENT PAGES ---
const ProgramRegister = lazy(() => import('src/pages/ProgramRegister'))
// const ProgramManage = lazy(() => import('./pages/ProgramManage'))
// const SessionManage = lazy(() => import('./pages/SessionManage'))
// const StudentManage = lazy(() => import('./pages/StudentManage'))
// const LearningPath = lazy(() => import('./pages/LearningPath'))

// --- ADMIN / OAA / OSA / DEPARTMENT ---
// const Statistics = lazy(() => import('./pages/Statistics'))
// const TutorWorkload = lazy(() => import('./pages/TutorWorkload'))
// const ResourceAllocate = lazy(() => import('./pages/ResourceAllocate'))

// ==========================
// Route protection logic
// ==========================
function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.sso} />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.dashboard} />
}

// ==========================
// Route definitions
// ==========================
export default function useRouteElements() {
  return useRoutes([
    // --- Guest-only routes ---
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          element: <AuthLayout />,
          children: [
            {
              index: true,
              element: (
                <Suspense fallback={<div>Đang tải...</div>}>
                  <HomePage />
                </Suspense>
              )
            },
            {
              path: path.sso,
              element: (
                <Suspense fallback={<div>Đang tải...</div>}>
                  <SSOLogin />
                </Suspense>
              )
            }
          ]
        }
      ]
    },

    // --- Authenticated routes ---
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          element: <MainLayout />,
          children: [
            { path: path.dashboard, element: <Dashboard /> },
            { path: path.profile, element: <Profile /> },
            { path: path.tutorDetail, element: <TutorProfile /> },
            { path: path.session, element: <SessionPage /> },
            { path: path.community, element: <Community /> },
            { path: path.communityTopic, element: <CommunityTopicDetail /> },
            { path: path.statistics, element: <Statistics /> },
            { path: path.learningPath, element: <PersonalizeLearning /> },
            { path: path.documents, element: <Documents /> },
            { path: path.manageMentee, element: <ManageMentee /> },
            { path: path.programRegister, element: <ProgramRegister /> },
            { path: path.tutorMenteeManage, element: <TutorMenteeManage /> },
            { path: path.notFound, element: <NotFound /> }
          ]
        }
      ]
    }
  ])
}

