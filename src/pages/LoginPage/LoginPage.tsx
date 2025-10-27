import type { User } from 'src/types/type'

export default function LoginPage({ onLogin }: { onLogin: (u: User) => void }) {
  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-50'>
      <div className='w-full max-w-md bg-white p-6 rounded-lg shadow'>
        <h2 className='text-2xl font-semibold mb-4'>Đăng nhập - HCMUT SSO</h2>
        <p className='text-sm text-gray-600 mb-4'>Hệ thống chuyển hướng tới HCMUT_SSO khi người dùng chọn đăng nhập.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onLogin({ name: 'Nguyễn Văn A', email: 'a@hcmut.edu.vn' })
          }}
        >
          <label className='text-sm'>Email HCMUT</label>
          <input className='w-full border p-2 rounded mt-1 mb-3' placeholder='xxxx@hcmut.edu.vn' />
          <label className='text-sm'>Mật khẩu</label>
          <input type='password' className='w-full border p-2 rounded mt-1 mb-4' />
          <button className='w-full bg-blue-600 text-white py-2 rounded'>Đăng nhập qua SSO</button>
        </form>
        <div className='mt-4 text-xs text-gray-500'>
          (Mock) Nếu SSO thành công, hệ thống sẽ đồng bộ vai trò và điều hướng đến dashboard.
        </div>
      </div>
    </div>
  )
}
