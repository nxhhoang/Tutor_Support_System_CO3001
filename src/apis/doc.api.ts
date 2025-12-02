// import type { DocItem } from 'src/types/doc.type'

// const docs: DocItem[] = [
//   {
//     id: 'd1',
//     title: 'Giáo trình Cấu trúc dữ liệu.pdf',
//     size: '2.1MB',
//     uploadedAt: '2024-09-10',
//     author: 'TS. Nguyễn Văn A',
//     subject: 'Cấu trúc dữ liệu & Giải thuật',
//     topic: 'Cấu trúc dữ liệu cơ bản',
//     keywords: ['CTDL', 'Linked List', 'Tree', 'Stack', 'Queue'],
//   },
//   {
//     id: 'd2',
//     title: 'Bài giảng Toán rời rạc.docx',
//     size: '1.5MB',
//     uploadedAt: '2024-08-25',
//     author: 'PGS. Trần Minh B',
//     subject: 'Toán rời rạc',
//     topic: 'Logic và Tập hợp',
//     keywords: ['logic', 'tập hợp', 'đồ thị', 'rời rạc'],
//   },
//   {
//     id: 'd3',
//     title: 'Slide Hệ điều hành.pptx',
//     size: '4.2MB',
//     uploadedAt: '2024-09-20',
//     author: 'ThS. Lê Hoàng C',
//     subject: 'Hệ điều hành',
//     topic: 'Quản lý tiến trình',
//     keywords: ['process', 'thread', 'scheduling', 'mutex', 'OS'],
//   },
//   {
//     id: 'd4',
//     title: 'Tài liệu Mạng máy tính.pdf',
//     size: '3.8MB',
//     uploadedAt: '2024-10-02',
//     author: 'TS. Nguyễn Quốc D',
//     subject: 'Mạng máy tính',
//     topic: 'Giao thức TCP/IP',
//     keywords: ['network', 'TCP', 'UDP', 'IP', 'socket'],
//   },
//   {
//     id: 'd5',
//     title: 'Hướng dẫn lập trình C cơ bản.pdf',
//     size: '2.9MB',
//     uploadedAt: '2024-09-18',
//     author: 'ThS. Trần Thu E',
//     subject: 'Ngôn ngữ C',
//     topic: 'Cơ bản về C',
//     keywords: ['C', 'programming', 'syntax', 'variable', 'loop'],
//   },
//   {
//     id: 'd6',
//     title: 'Đề thi OOP 2023.docx',
//     size: '800KB',
//     uploadedAt: '2024-08-15',
//     author: 'Khoa CNTT',
//     subject: 'Lập trình Hướng đối tượng',
//     topic: 'Kế thừa & Đa hình',
//     keywords: ['OOP', 'C++', 'inheritance', 'polymorphism', 'encapsulation'],
//   },
//   {
//     id: 'd7',
//     title: 'Lab Machine Learning.zip',
//     size: '6.5MB',
//     uploadedAt: '2024-10-05',
//     author: 'TS. Đinh Thanh F',
//     subject: 'Machine Learning',
//     topic: 'Linear Regression',
//     keywords: ['AI', 'ML', 'supervised', 'model', 'training'],
//   },
//   {
//     id: 'd8',
//     title: 'Báo cáo Kỹ thuật phần mềm.pdf',
//     size: '1.2MB',
//     uploadedAt: '2024-09-30',
//     author: 'SV Nguyễn Văn G',
//     subject: 'Kỹ thuật phần mềm',
//     topic: 'Phân tích yêu cầu',
//     keywords: ['SWE', 'requirement', 'use case', 'uml'],
//   },
//   {
//     id: 'd9',
//     title: 'Thực hành Cấu trúc máy tính.docx',
//     size: '900KB',
//     uploadedAt: '2024-09-11',
//     author: 'PGS. Phạm Quang H',
//     subject: 'Kiến trúc máy tính',
//     topic: 'Bộ nhớ và CPU',
//     keywords: ['computer', 'architecture', 'memory', 'CPU'],
//   },
//   {
//     id: 'd10',
//     title: 'Hướng dẫn sử dụng Git.pdf',
//     size: '3.1MB',
//     uploadedAt: '2024-10-10',
//     author: 'CLB Dev HCMUT',
//     subject: 'Công cụ lập trình',
//     topic: 'Quản lý mã nguồn',
//     keywords: ['git', 'github', 'commit', 'branch', 'merge'],
//   },
// ]

// export const docApi = {
//   getAllDocs: (): DocItem[] => docs,

//   searchDocs: (keyword: string): DocItem[] => {
//     if (!keyword.trim()) return docs
//     const lower = keyword.toLowerCase()
//     return docs.filter((d) =>
//       [
//         d.title,
//         d.author,
//         d.subject,
//         d.topic,
//         ...(d.keywords || []),
//       ]
//         .join(' ')
//         .toLowerCase()
//         .includes(lower)
//     )
//   },

//   downloadDoc: (id: string): string => {
//     const found = docs.find((d) => d.id === id)
//     if (!found) return 'Không tìm thấy tài liệu.'
//     return `Đang tải xuống "${found.title}"...`
//   },
// }

import http from 'src/utils/http'
import type { DocItem } from 'src/types/doc.type'
import type { SuccessResponse } from 'src/types/utils.type'

const URL = 'docs'

export const docApi = {
  getAllDocs() {
    return http.get<SuccessResponse<DocItem[]>>(URL)
  },

  searchDocs(keyword: string) {
    return http.get<SuccessResponse<DocItem[]>>(`${URL}/search`, {
      params: {
        keyword
      }
    })
  },

  downloadDoc(id: string) {
    return http.get<SuccessResponse<null>>(`${URL}/${id}/download`)
  }
}