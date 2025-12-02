import { useEffect, useState } from 'react'
import { profileApi } from 'src/apis/profileView.api' 
import type { ProfileView } from 'src/types/profileView.type'
import logo from 'src/assets/images/logobachkhoa.png'

export default function ProfileViewer() {
  const [query, setQuery] = useState('')
  const [profiles, setProfiles] = useState<ProfileView[]>([])
  const [filteredProfiles, setFilteredProfiles] = useState<ProfileView[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    profileApi.getAll()
      .then((res) => {
        const data = res.data.data
        setProfiles(data)
        setFilteredProfiles(data)
      })
      .catch((error) => {
        console.error('Failed to fetch profiles', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const q = query.trim().toLowerCase()
    if (!q) {
      setFilteredProfiles(profiles)
      return
    }

    const results = profiles.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
    )

    setFilteredProfiles(results)
  }, [query, profiles])

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-10 px-6">
      <div className="flex items-center mb-6">
        <img src={logo} alt="BK HCMUT" className="w-20 mr-4" />
        <h1 className="text-2xl font-semibold text-blue-700">
          Tra cứu hồ sơ
        </h1>
      </div>

      <div className="bg-white shadow-md p-6 rounded w-full max-w-xl">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nhập tên hoặc email..."
            className="flex-1 border p-2 rounded text-sm"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="bg-gray-200 hover:bg-gray-300 px-3 rounded text-sm"
            >
              Xóa
            </button>
          )}
        </div>

        <h3 className="font-semibold text-blue-700 mb-2">
          {query ? 'Kết quả tìm kiếm' : 'Danh sách hồ sơ'}
        </h3>

        {loading ? (
          <p className="text-sm text-gray-500 italic">Đang tải dữ liệu...</p>
        ) : filteredProfiles.length ? (
          <ul className="space-y-3 max-h-96 overflow-y-auto">
            {filteredProfiles.map((p) => (
              <li
                key={p.id}
                className="border p-3 rounded hover:bg-slate-100 transition"
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
          <p className="text-sm text-gray-500 italic">
            Không tìm thấy hồ sơ phù hợp.
          </p>
        )}
      </div>
    </div>
  )
}