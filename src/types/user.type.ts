import type { Program } from "./program.type"

export type BaseUser = {
  id: number
  name: string
  email: string
  faculty?: string
  role: 'student' | 'tutor' | 'admin' | 'osa' | 'oaa' | 'department'
  avatar?: string
}

export interface StudentUser extends BaseUser {
  role: 'student'
  
  major: string
  class: string
  bio?: string
  avail?: string[]
  program?: Program[] // Chương trình đã đăng ký
}

export interface TutorUser extends BaseUser {
  role: 'tutor'
  major: string
  rating: number
  bio?: string
  avail?: string[]
  program?: Program[] // Chương trình đã đăng ký
}

export interface OsaUser extends BaseUser {
  role: 'osa' // Phòng Công tác Sinh viên
  permissions?: string[]
}

export interface OaaUser extends BaseUser {
  role: 'oaa' // Phòng Đào tạo
  permissions?: string[]
}

export interface DepartmentUser extends BaseUser {
  role: 'department' // Khoa, Bộ môn
  departmentName: string
}

export type AdminUser = BaseUser & { role: 'admin'; permissions: string[] }

// Gom tất cả vào type User
export type User =
  | StudentUser
  | TutorUser
  | OsaUser
  | OaaUser
  | DepartmentUser
  | AdminUser
