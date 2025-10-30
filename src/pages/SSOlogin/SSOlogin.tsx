import logo from 'src/assets/images/logobachkhoa.png'
import LoginForm from 'src/components/loginForm'

export default function SSOLogin() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-white'>
      <img src={logo} alt='BK HCMUT' className='w-40 mb-6' />
      <h1 className='text-2xl font-bold text-blue-700 mb-4'>HCMUT SSO Login</h1>
      <LoginForm />
    </div>
  )
}

