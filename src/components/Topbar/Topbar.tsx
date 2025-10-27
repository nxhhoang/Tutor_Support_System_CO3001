import type { User } from 'src/types/type'

type Props = {
  user?: User
  onNavigate?: (p: string) => void
  onLogout?: () => void
}

export default function Topbar({ user, onNavigate, onLogout }: Props) {
  return (
    <header className='flex items-center justify-between px-6 py-3 bg-blue shadow-sm'>
      <div className='flex items-center gap-4'>
        <div className='text-2xl font-semibold cursor-pointer' onClick={() => onNavigate?.('dashboard')}>
          TSS
        </div>
        <nav className='hidden md:flex gap-3 text-sm text-white'>
          <button className='px-2 py-1 hover:bg-gray-100 rounded' onClick={() => onNavigate?.('dashboard')}>
            Trang chủ
          </button>
          <button className='px-2 py-1 hover:bg-gray-100 rounded' onClick={() => onNavigate?.('tutors')}>
            Chọn Tutor
          </button>
          <button className='px-2 py-1 hover:bg-gray-100 rounded' onClick={() => onNavigate?.('schedule')}>
            Lịch
          </button>
          <button className='px-2 py-1 hover:bg-gray-100 rounded' onClick={() => onNavigate?.('community')}>
            Cộng đồng
          </button>
          <button className='px-2 py-1 hover:bg-gray-100 rounded' onClick={() => onNavigate?.('documents')}>
            Tài liệu
          </button>
        </nav>
      </div>
      <div className='flex items-center gap-4'>
        <button className='text-sm px-3 py-1 border rounded'>Thông báo</button>
        <div className='flex items-center gap-2'>
          <div className='w-8 h-8 bg-gray-200 rounded-full' />
          <span className='hidden sm:inline text-sm'>{user?.name || 'Sinh viên'}</span>
          <button className='ml-3 text-sm text-white' onClick={onLogout}>
            Đăng xuất
          </button>
        </div>
      </div>
    </header>
  )
}
