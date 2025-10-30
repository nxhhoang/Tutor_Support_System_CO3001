// src/api/profileView.api.ts
import type { ProfileView, ProfileSearchResult } from 'src/types/profileView.type'

/**
 * Giả lập dữ liệu hồ sơ trong bộ nhớ cục bộ
 */
const mockProfiles: ProfileView[] = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'vana@student.hcmut.edu.vn',
    role: 'student',
    faculty: 'Khoa Khoa học & Kỹ thuật Máy tính',
    major: 'Kỹ thuật Máy tính',
    class: 'KTMT2023',
    phone: '0901234567',
    supportNeeds: 'Cần hỗ trợ về Lập trình C++',
    avail: ['Thứ 2 (9:00-11:00)', 'Thứ 5 (13:00-15:00)']
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'thib@tutor.hcmut.edu.vn',
    role: 'tutor',
    faculty: 'Khoa Khoa học & Kỹ thuật Máy tính',
    expertise: 'Trí tuệ nhân tạo',
    skills: ['Python', 'Machine Learning', 'Data Science'],
    rating: 4.8,
    phone: '0908765432',
    avail: ['Thứ 3 (14:00-17:00)', 'Thứ 6 (8:00-10:00)']
  },
  {
    id: 3,
    name: 'Lê Văn C',
    email: 'levanc@tutor.hcmut.edu.vn',
    role: 'tutor',
    faculty: 'Khoa Khoa học & Kỹ thuật Máy tính',
    expertise: 'Mạng máy tính',
    skills: ['Computer Network', 'Linux', 'C'],
    rating: 4.2,
    phone: '0909988776'
  }
]

/**
 * Giả lập API lấy toàn bộ danh sách hồ sơ
 */
export class ProfileViewAPI {
  static getAll(): Promise<ProfileSearchResult> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ success: true, data: mockProfiles })
      }, 200)
    })
  }

  /**
   * Tìm kiếm theo tên hoặc email (giả lập server-side)
   */
  static search(query: string): Promise<ProfileSearchResult> {
    return new Promise(resolve => {
      setTimeout(() => {
        const q = query.trim().toLowerCase()
        const results = mockProfiles.filter(
          u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
        )
        resolve({
          success: true,
          data: results,
          message: results.length ? undefined : 'Không tìm thấy hồ sơ phù hợp.'
        })
      }, 300)
    })
  }

  /**
   * Tìm hồ sơ chi tiết theo ID
   */
  static getById(id: number): Promise<ProfileView | null> {
    return new Promise(resolve => {
      setTimeout(() => {
        const found = mockProfiles.find(u => u.id === id) || null
        resolve(found)
      }, 200)
    })
  }
}
