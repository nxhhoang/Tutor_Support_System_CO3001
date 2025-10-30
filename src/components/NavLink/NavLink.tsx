import { Link } from 'react-router-dom'

export default function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className='px-2 py-1 hover:bg-blue-700 rounded transition'>
      {children}
    </Link>
  )
}