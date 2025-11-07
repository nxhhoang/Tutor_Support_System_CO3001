import type { ProfileView, ProfileSearchResult } from 'src/types/profileView.type'

let profiles: ProfileView[] = [
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

export const profileViewApi = {
  getAll(): ProfileView[] {
    return profiles
  },

  getById(id: number): ProfileView | undefined {
    return profiles.find(p => p.id === id)
  },

  search(query: string): ProfileSearchResult {
    const q = query.trim().toLowerCase()
    const results = profiles.filter(
      p => p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q)
    )
    return {
      success: true,
      data: results,
      message: results.length ? undefined : 'Không tìm thấy hồ sơ phù hợp.'
    }
  },

  addProfile(profile: Omit<ProfileView, 'id'>): ProfileView {
    const newProfile: ProfileView = {
      ...profile,
      id: Date.now()
    }
    profiles = [newProfile, ...profiles]
    return newProfile
  }
}
