import { memo } from 'react'
import { Outlet } from 'react-router-dom'

interface Props {
  children?: React.ReactNode
}
function MainLayoutInner({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Phần content sẽ chiếm không gian còn lại */}
      <main className="flex-1">
        {children}
        <Outlet />
      </main>
    </div>
  )
}
const MainLayout = memo(MainLayoutInner)
export default MainLayout
