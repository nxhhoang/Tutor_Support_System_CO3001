import {useContext} from 'react'
import logo from 'src/assets/images/logobachkhoa.png'
import type { StudentUser, TutorUser } from 'src/types/user.type'
import ProfileInfo from './components/ProfileInfo/ProfileInfo'
import { AppContext } from 'src/contexts/app.context'
import SearchOtherProfiles from './components/SearchOtherProfiles/SearchOtherProfiles'
import ProfileViewer from './components/ProfileViewer/ProfileViewer'
import ProfileSchedule from './components/ProfileSchedule/ProfileSchedule'

export default function Profile() {
  const { user } = useContext(AppContext)

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-gray-700">
        <h1 className="text-xl text-gray-700">Bạn chưa đăng nhập</h1>
      </div>
    )
  }

  if (['admin', 'osa', 'oaa', 'department'].includes(user.role)) {
    return <ProfileViewer />
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-10 px-6">
      <div className="flex items-center mb-8">
        <img src={logo} alt="BK HCMUT" className="w-20 mr-4" />
        <h1 className="text-2xl font-semibold text-blue-700">
          Hồ sơ {user.role === 'student' ? 'Sinh viên' : 'Tutor'}
        </h1>
      </div>

      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg grid grid-cols-1 md:grid-cols-2">
        <div className="p-6 border-r border-gray-200 flex flex-col justify-between">
          <ProfileInfo user={user as StudentUser | TutorUser} />
        </div>
        <div className="p-6">
          <ProfileSchedule user={user as StudentUser | TutorUser} />
          <SearchOtherProfiles />
        </div>
      </div>
    </div>
  )
}