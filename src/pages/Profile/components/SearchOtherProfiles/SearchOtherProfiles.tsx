import { useContext, useEffect, useState } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { ProfileViewAPI } from 'src/apis/profileView.api'
import type { ProfileView } from 'src/types/profileView.type'

export default function SearchOtherProfiles() {
  const { user } = useContext(AppContext)
  const [query, setQuery] = useState('')
  const [profiles, setProfiles] = useState<ProfileView[]>([])
  const [filteredProfiles, setFilteredProfiles] = useState<ProfileView[]>([])
  const [loading, setLoading] = useState(true)

  // 🔹 Lấy danh sách hồ sơ khi component mount
  useEffect(() => {
    ProfileViewAPI.getAll().then((res) => {
      if (res.success) {
        setProfiles(res.data)
        setFilteredProfiles(res.data) // ban đầu hiển thị toàn bộ
      }
      setLoading(false)
    })
  }, [])

  // 🔹 Lọc danh sách theo từng ký tự nhập (live search)
  useEffect(() => {
    const q = query.trim().toLowerCase()
    if (!q) {
      setFilteredProfiles(profiles)
      return
    }

    const results = profiles.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q)
    )

    setFilteredProfiles(results)
  }, [query, profiles])

  return (
    <div className="mt-6 border-t pt-4">
      <h3 className="font-semibold text-blue-700 mb-2 text-center">
        Tra cứu hồ sơ {user?.role === 'student' ? 'Tutor' : 'Sinh viên'} / Tutor
      </h3>

      {/* 🔍 Ô tìm kiếm */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Nhập tên ${user?.role === 'student' ? 'tutor' : 'sinh viên'}...`}
          className="flex-1 border p-2 rounded text-sm"
        />
        <button
          onClick={() => setQuery('')}
          className="px-3 py-2 border rounded bg-gray-200 hover:bg-gray-300"
        >
          Xóa
        </button>
      </div>

      {/* 🔹 Danh sách hồ sơ */}
      <h4 className="font-semibold text-blue-700 mb-2">
        {query ? 'Kết quả tìm kiếm' : 'Danh sách hồ sơ'}
      </h4>

      {loading ? (
        <p className="text-sm text-gray-500 italic">Đang tải dữ liệu...</p>
      ) : filteredProfiles.length ? (
        <ul className="space-y-3 max-h-96 overflow-y-auto bg-white p-3 rounded border">
          {filteredProfiles.map((p) => (
            <li
              key={p.id}
              className="border p-3 rounded hover:bg-blue-50 transition"
            >
              <div className="font-medium text-blue-800">{p.name}</div>
              <div className="text-sm text-gray-600">{p.email}</div>
              <div className="text-xs text-gray-500">
                {p.role === 'tutor'
                  ? `Tutor - ${p.expertise || 'Chưa có chuyên môn'}`
                  : `Sinh viên - ${p.major || 'Chưa rõ ngành'}`}
              </div>
              <button className="mt-2 px-3 py-1 bg-blue-700 text-white text-sm rounded">
                Xem hồ sơ
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 italic">Không tìm thấy hồ sơ phù hợp.</p>
      )}
    </div>
  )
}
