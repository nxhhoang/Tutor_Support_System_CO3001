  // import React from 'react'
  // import Topbar from './components/Topbar'
  // import Footer from './components/Footer'
  // import LoginPage from './pages/LoginPage'
  // import Dashboard from './pages/Dashboard'
  // import TutorList from './pages/TutorList'
  // import TutorProfile from './pages/TutorProfile'
  // import Schedule from './pages/Schedule'
  // import Community from './pages/Community'
  // import Documents from './pages/Documents'
  // import SessionPage from './pages/SessionPage'
  // import type { User, Tutor } from 'src/types/user.type'
  // import Profile from './pages/Profile/Profile'

  // export default function App(){
  //   const [user, setUser] = React.useState<User | null>(null)
  //   const [page, setPage] = React.useState<string>('login')
  //   const [selectedTutor, setSelectedTutor] = React.useState<Tutor | null>(null)

  //   if(!user) return <LoginPage onLogin={(u)=>{ setUser(u); setPage('dashboard') }} />

  //   return (
  //     <div className="min-h-screen bg-slate-50 flex flex-col">
  //       <Topbar user={user} onNavigate={setPage} onLogout={()=>{ setUser(null); setPage('login') }} />
  //       <main className="flex-1 p-4">
  //       {page === 'dashboard' && <Dashboard onNavigate={setPage} onViewProfile={(t)=>{ setSelectedTutor(t); setPage('profile') }} />}
  //       {page === 'tutors' && <TutorList onViewProfile={(t)=>{ setSelectedTutor(t); setPage('profile') }} />}
  //       {page === 'profile' && <TutorProfile tutor={selectedTutor || undefined} />}
  //       {page === 'schedule' && <Schedule />}
  //       {page === 'profile' && <Profile user={user} />}
  //       {page === 'community' && <Community />}
  //       {page === 'documents' && <Documents />}
  //       {page === 'session' && <SessionPage />}
  //       </main>
  //       <Footer />
  //     </div>
  //   )
  // }

  // src/App.tsx
  import useRouteElements from './useRouteElements'
  import { ToastContainer } from 'react-toastify'
  import 'react-toastify/dist/ReactToastify.css'
  // import { useEffect, useContext } from 'react'
  // import { LocalStorageEventTarget } from './utils/auth'
  // import { AppContext } from './contexts/app.context'
  import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
  import ErrorBoundary from 'src/components/ErrorBoundary'
  import { HelmetProvider } from 'react-helmet-async'

  function App() {
    const routeElements = useRouteElements()
    // const { reset } = useContext(AppContext)

    // useEffect(() => {
    //   LocalStorageEventTarget.addEventListener('clearLS', reset)
    //   return () => {
    //     LocalStorageEventTarget.removeEventListener('clearLS', reset)
    //   }
    // }, [reset])

    return (
      <HelmetProvider>
        <ErrorBoundary>
          {routeElements}
          <ToastContainer position="top-center" autoClose={3000} />
        </ErrorBoundary>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </HelmetProvider>
    )
  }

  export default App
