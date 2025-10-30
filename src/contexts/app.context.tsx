// src/contexts/app.context.tsx
import { createContext, useState, useEffect } from 'react'
import type { User } from 'src/types/user.type'

interface AppContextType {
  user: User | null
  isAuthenticated: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
}

export const AppContext = createContext<AppContextType>({
  user: null,
  isAuthenticated: false,
  login: () => false,
  logout: () => {}
})

const fakeUsers: (User & { username: string; password: string })[] = [
  {
    id: 1,
    username: 'student01',
    password: '123',
    name: 'Nguyễn Văn A',
    email: 'a@student.hcmut.edu.vn',
    role: 'student',
    faculty: 'Khoa Khoa học & Kỹ thuật Máy tính',
    major: 'Kỹ thuật Máy tính',
    class: 'MT2023',
    avail: ['Thứ 3 8:00-10:00', 'Thứ 5 13:00-15:00'],
    avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
  },
  {
    id: 2,
    username: 'tutor01',
    password: '123',
    name: 'Trần Văn B',
    email: 'b@hcmut.edu.vn',
    role: 'tutor',
    major: 'Khoa học Máy tính',
    rating: 4.8,
    bio: 'Giảng viên hướng dẫn môn Cấu trúc dữ liệu',
    avail: ['Thứ 3 8:00-10:00', 'Thứ 5 13:00-15:00'],
    avatar: 'https://cdn-icons-png.flaticon.com/512/219/219983.png'
  },
  {
    id: 3,
    username: 'admin01',
    password: '123',
    name: 'Lê Thị C',
    email: 'admin@hcmut.edu.vn',
    role: 'admin',
    permissions: ['manage_users', 'view_reports'],
    avatar: 'https://cdn-icons-png.flaticon.com/512/1828/1828324.png'
  },
  {
    id: 4,
    username: 'osa01',
    password: '123',
    name: 'Phòng Công tác Sinh viên',
    email: 'osa@hcmut.edu.vn',
    role: 'osa',
    permissions: ['view_statistics', 'manage_student_support'],
    avatar: 'https://cdn-icons-png.flaticon.com/512/4322/4322997.png'
  },
  {
    id: 5,
    username: 'oaa01',
    password: '123',
    name: 'Phòng Đào tạo',
    email: 'oaa@hcmut.edu.vn',
    role: 'oaa',
    permissions: ['allocate_resources', 'view_tutor_workload'],
    avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
  },
  {
    id: 6,
    username: 'dept01',
    password: '123',
    name: 'Khoa Khoa học & Kỹ thuật Máy tính',
    email: 'cse@hcmut.edu.vn',
    role: 'department',
    departmentName: 'Khoa Khoa học & Kỹ thuật Máy tính',
    avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135789.png'
  }
]

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('user')
    if (saved) setUser(JSON.parse(saved))
  }, [])

  const login = (username: string, password: string) => {
    const found = fakeUsers.find(
      (u) => u.username === username && u.password === password
    )
    if (found) {
      setUser(found)
      localStorage.setItem('user', JSON.stringify(found))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
