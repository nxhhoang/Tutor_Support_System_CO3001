import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useRef, useState } from 'react'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { Bell } from 'lucide-react'
import NavLink from 'src/components/NavLink'

type Notification = {
  id: number
  message: string
  timestamp: string
  read: boolean
}

export default function Topbar() {
  const { user, logout } = useContext(AppContext)
  const navigate = useNavigate()
  const role = user?.role

  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])

  // 🔹 ref dùng để xác định click ngoài
  const notifRef = useRef<HTMLDivElement | null>(null)

  const handleLogout = () => {
    logout()
    navigate(path.login)
  }

  // 🔹 Giả lập danh sách thông báo theo vai trò
  useEffect(() => {
    if (!role) return

    let demo: Notification[] = []

    if (role === 'student') {
      demo = [
        {
          id: 1,
          message: 'Phòng đào tạo đã phân bổ lại trọng tải công việc cho tutor, vui lòng kiểm tra lịch.',
          timestamp: '2 phút trước',
          read: false
        },
        {
          id: 2,
          message: 'Tutor Nguyễn Văn A đã hủy buổi học ngày 02/11, vui lòng đặt lịch khác.',
          timestamp: '1 giờ trước',
          read: false
        },
        {
          id: 3,
          message: 'Bạn vừa được duyệt đăng ký chương trình học mới.',
          timestamp: 'Hôm nay, 08:45',
          read: true
        }
      ]
    } else if (role === 'tutor') {
      demo = [
        {
          id: 1,
          message: 'Mentee Lê Minh vừa đặt lịch học mới với bạn.',
          timestamp: '5 phút trước',
          read: false
        },
        {
          id: 2,
          message: 'Buổi học ngày 01/11 đã được xác nhận thành công.',
          timestamp: 'Hôm qua, 17:20',
          read: true
        },
        {
          id: 3,
          message: 'Bạn nhận được phản hồi đánh giá 5★ từ mentee Nguyễn Văn B.',
          timestamp: '3 ngày trước',
          read: false
        }
      ]
    }

    setNotifications(demo)
  }, [role])

  const toggleNotifications = () => setShowNotifications(prev => !prev)
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  // 🔹 Đóng dropdown khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false)
      }
    }

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    // cleanup khi component unmount
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showNotifications])

  const renderLinks = () => {
    switch (role) {
      case 'student':
        return (
          <>
            <NavLink to={path.dashboard}>Trang chủ</NavLink>
            <NavLink to={path.programRegister}>Đăng ký chương trình</NavLink>
            <NavLink to={path.session}>Lịch học</NavLink>
            <NavLink to={path.community}>Cộng đồng</NavLink>
            <NavLink to={path.documents}>Thư viện tài liệu</NavLink>
            <NavLink to={path.learningPath}>Cá nhân hoá lộ trình học</NavLink>
          </>
        )

      case 'tutor':
        return (
          <>
            <NavLink to={path.dashboard}>Trang chủ</NavLink>
            <NavLink to={path.programRegister}>Quản lý chương trình</NavLink>
            <NavLink to={path.manageMentee}>Quản lý học viên</NavLink>
            <NavLink to={path.session}>Lịch dạy</NavLink>
            <NavLink to={path.community}>Cộng đồng</NavLink>
            <NavLink to={path.documents}>Thư viện tài liệu</NavLink>
          </>
        )

      case 'department':
      case 'osa':
      case 'oaa':
      case 'admin':
        return (
          <>
            <NavLink to={path.dashboard}>Trang chủ</NavLink>
            {(role === 'department' || role === 'osa' || role === 'admin') && (
              <NavLink to={path.statistics}>Thống kê & Phân tích</NavLink>
            )}
            {(role === 'oaa' || role === 'admin') && (
              <NavLink to={path.tutorMenteeManage}>Quản lý tutor & mentee</NavLink>
            )}
            <NavLink to={path.community}>Cộng đồng</NavLink>
          </>
        )

      default:
        return (
          <>
            <NavLink to={path.dashboard}>Trang chủ</NavLink>
            <NavLink to={path.community}>Cộng đồng</NavLink>
          </>
        )
    }
  }

  return (
    <header className='flex items-center justify-between px-6 py-3 bg-blue shadow-sm text-white relative'>
      <div className='flex items-center gap-4'>
        <Link to={path.dashboard} className='text-2xl font-semibold'>
          TSS
        </Link>
        <nav className='hidden md:flex gap-3 text-sm'>{renderLinks()}</nav>
      </div>

      <div className='flex items-center gap-4 relative' ref={notifRef}>
        {/* 🔔 Nút thông báo */}
        {(role === 'student' || role === 'tutor') && (
          <button
            onClick={toggleNotifications}
            className='relative flex items-center justify-center w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 transition'
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className='absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                {unreadCount}
              </span>
            )}
          </button>
        )}

        {/* 🔹 Dropdown thông báo */}
        {showNotifications && (role === 'student' || role === 'tutor') && (
          <div className='absolute right-0 top-12 w-80 bg-white text-gray-800 shadow-lg rounded-lg z-50 overflow-hidden'>
            <div className='flex justify-between items-center px-3 py-2 border-b bg-blue-50'>
              <span className='font-semibold text-blue-700'>Thông báo</span>
              <button
                onClick={markAllAsRead}
                className='text-xs text-blue-600 hover:underline'
              >
                Đánh dấu đã đọc
              </button>
            </div>

            {notifications.length ? (
              <ul className='max-h-80 overflow-y-auto'>
                {notifications.map(n => (
                  <li
                    key={n.id}
                    className={`px-4 py-2 border-b text-sm hover:bg-slate-100 ${
                      !n.read ? 'bg-blue-50' : ''
                    }`}
                  >
                    <p>{n.message}</p>
                    <p className='text-xs text-gray-500 mt-1'>{n.timestamp}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className='text-center py-4 text-sm text-gray-500'>
                Không có thông báo nào.
              </p>
            )}
          </div>
        )}

        {/* Avatar + Hồ sơ + Đăng xuất */}
        <div className='flex items-center gap-2'>
          <div className='w-8 h-8 rounded-full overflow-hidden bg-gray-200'>
            <img
              src={user?.avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
              alt='avatar'
              className='w-full h-full object-cover'
            />
          </div>

          {role && ['student', 'tutor', 'osa', 'oaa', 'department', 'admin'].includes(role) && (
            <>
              {user && (user.role === 'tutor' || user.role === 'student') ? (
                <Link to={path.profile} className='hidden sm:inline text-sm hover:underline'>
                  Hồ sơ
                </Link>
              ) : (
                <Link to={path.profile} className='hidden sm:inline text-sm hover:underline'>
                  Tra tên người dùng
                </Link>
              )}
              <button onClick={handleLogout} className='ml-3 text-sm hover:underline'>
                Đăng xuất
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
