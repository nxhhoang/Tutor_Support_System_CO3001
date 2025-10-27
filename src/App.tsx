// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href='https://vite.dev' target='_blank'>
//           <img src={viteLogo} className='logo' alt='Vite logo' />
//         </a>
//         <a href='https://react.dev' target='_blank'>
//           <img src={reactLogo} className='logo react' alt='React logo' />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className='card'>
//         <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
//     </>
//   )
// }

// export default App

import React from 'react'
import Topbar from './components/Topbar'
import Footer from './components/Footer'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import TutorList from './pages/TutorList'
import TutorProfile from './pages/TutorProfile'
import Schedule from './pages/Schedule'
import Community from './pages/Community'
import Documents from './pages/Documents'
import SessionPage from './pages/SessionPage'
import type { User, Tutor } from 'src/types/type'

export default function App(){
  const [user, setUser] = React.useState<User | null>(null)
  const [page, setPage] = React.useState<string>('login')
  const [selectedTutor, setSelectedTutor] = React.useState<Tutor | null>(null)

  if(!user) return <LoginPage onLogin={(u)=>{ setUser(u); setPage('dashboard') }} />

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Topbar user={user} onNavigate={setPage} onLogout={()=>{ setUser(null); setPage('login') }} />
      <main className="flex-1 p-4">
      {page === 'dashboard' && <Dashboard onNavigate={setPage} onViewProfile={(t)=>{ setSelectedTutor(t); setPage('profile') }} />}
      {page === 'tutors' && <TutorList onViewProfile={(t)=>{ setSelectedTutor(t); setPage('profile') }} />}
      {page === 'profile' && <TutorProfile tutor={selectedTutor || undefined} />}
      {page === 'schedule' && <Schedule />}
      {page === 'community' && <Community />}
      {page === 'documents' && <Documents />}
      {page === 'session' && <SessionPage />}
      </main>
      <Footer />
    </div>
  )
}

