import path from './constants/path'
import { useContext, lazy, Suspense } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { AppContext } from './contexts/app.context'
import MainLayout from './layouts/MainLayout'
import RegisterLayout from './layouts/RegisterLayout'

const AboutPage = lazy(() => import('./pages/AboutPage'))
const Announcement = lazy(() => import('./pages/Announcement'))
const Contest = lazy(() => import('./pages/Contest'))
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const NotFound = lazy(() => import('./pages/NotFound'))
const ProblemDetail = lazy(() => import('./pages/ProblemPage'))
const ProblemSubmission = lazy(() => import('./pages/ProblemSubmission'))
const Submit = lazy(() => import('./pages/SubmitPage'))
const SubmissionDetail = lazy(() => import('./pages/SubmissionDetail'))
const Problemset = lazy(() => import('./pages/Problemset'))
const Register = lazy(() => import('./pages/Register'))
// const Profile = lazy(() => import('./pages/User/pages/Profile'))
// const ChangePassword = lazy(() => import('./pages/User/pages/ChangePassword'))
// const HistoryPurchase = lazy(() => import('./pages/User/pages/HistoryPurchase'))

// eslint-disable-next-line react-refresh/only-export-components
function RejectedRoute() {
  // const { isAuthenticated } = useContext(AppContext)
  const isAuthenticated = true

  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '',
          element: <RegisterLayout />,
          children: [
            {
              path: path.login,
              element: (
                <Suspense>
                  <Login />
                </Suspense>
              )
            },
            {
              path: path.register,
              element: (
                <Suspense>
                  <Register />
                </Suspense>
              )
            }
          ]
        }
      ]
    },
    // {
    //   path: '',
    //   element: <ProtectedRoute />,
    //   children: [
    //     {
    //       path: path.user,
    //       element: <MainLayout />,
    //       children: [
    //         {
    //           path: '',
    //           element: <UserLayout />,
    //           children: [
    //             {
    //               path: path.profile,
    //               element: (
    //                 <Suspense>
    //                   <Profile />
    //                 </Suspense>
    //               )
    //             },
    //             // {
    //             //   path: path.changePassword,
    //             //   element: (
    //             //     <Suspense>
    //             //       <ChangePassword />
    //             //     </Suspense>
    //             //   )
    //             // },
    //             // {
    //             //   path: path.historyPurchase,
    //             //   element: (
    //             //     <Suspense>
    //             //       <HistoryPurchase />
    //             //     </Suspense>
    //             //   )
    //             // }
    //           ]
    //         }
    //       ]
    //     }
    //   ]
    // },
    {
      path: '',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<div>Loading homepage...</div>}>
              <Home />
            </Suspense>
          )
        },

        {
          // Sau khi làm Auth api phải chuyển cái này vô ProtectedRoute
          path: path.problemAllSubmissions,
          element: (
            <Suspense fallback={<div>Loading submissions...</div>}>
              <ProblemSubmission />
            </Suspense>
          )
        },
        {
          // Sau khi làm Auth api phải chuyển cái này vô ProtectedRoute
          path: path.submit,
          element: (
            <Suspense fallback={<div>Loading ...</div>}>
              <Submit />
            </Suspense>
          )
        },
        {
          // Sau khi làm Auth api phải chuyển cái này vô ProtectedRoute
          path: path.submissionDetail,
          element: (
            <Suspense fallback={<div>Loading ...</div>}>
              <SubmissionDetail />
            </Suspense>
          )
        },

        {
          path: path.problemset,
          element: (
            <Suspense fallback={<div>Loading problems...</div>}>
              <Problemset />
            </Suspense>
          )
        },
        {
          path: path.problemDetail,
          element: (
            <Suspense fallback={<div>Loading problem...</div>}>
              <ProblemDetail />
            </Suspense>
          )
        },
        {
          path: path.contest,
          element: (
            <Suspense fallback={<div>Loading contests...</div>}>
              <Contest />
            </Suspense>
          )
        },
        {
          path: path.announcement,
          element: (
            <Suspense fallback={<div>Loading announcements...</div>}>
              <Announcement />
            </Suspense>
          )
        },
        {
          path: path.about,
          element: (
            <Suspense fallback={<div>Loading about...</div>}>
              <AboutPage />
            </Suspense>
          )
        },
        {
          path: '*',
          element: (
            <Suspense>
              <NotFound />
            </Suspense>
          )
        }
      ]
    }
  ])
  return routeElements
}
