import { memo, useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from 'src/components/Footer'
import Topbar from 'src/components/Topbar'
import { AppContext } from 'src/contexts/app.context'

function MainLayoutInner() {
  const { user, setUser } = useContext(AppContext)

  const handleLogout = () => {
    setUser(undefined)
    localStorage.removeItem('access_token')
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar user={user} onLogout={handleLogout} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default memo(MainLayoutInner)
