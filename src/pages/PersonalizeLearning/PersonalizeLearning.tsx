// import { useContext, useState, useEffect } from 'react'
// import { AppContext } from 'src/contexts/app.context'
// import { personalizeApi } from 'src/apis/personalize.api'
// import type {
//   LearningPreference,
//   LearningGoal,
//   Recommendation,
//   LearningProgress
// } from 'src/types/personalize.type'
// import { ThumbsUp, ThumbsDown, ChevronDown, ChevronUp } from 'lucide-react'

// export default function PersonalizeLearning() {
//   const { user } = useContext(AppContext)
//   const [preferences, setPreferences] = useState<LearningPreference[]>([])
//   const [goals, setGoals] = useState<LearningGoal[]>([])
//   const [recommendations, setRecommendations] = useState<Recommendation[]>([])
//   const [progress, setProgress] = useState<LearningProgress[]>([])
//   const [message, setMessage] = useState('')
//   const [showRecs, setShowRecs] = useState(false)

//   useEffect(() => {
//     setPreferences(personalizeApi.getPreferences())
//     setGoals(personalizeApi.getGoals())
//     setRecommendations(personalizeApi.getRecommendations())
//     setProgress(personalizeApi.getProgress())
//   }, [])

//   const handleFeedback = (id: string, type: 'up' | 'down') => {
//     const msg = personalizeApi.setFeedback(id, type)
//     setRecommendations(personalizeApi.getRecommendations())
//     setMessage(msg)
//   }

//   return (
//     <div className="p-6 space-y-6">
//       <h2 className="text-2xl font-semibold mb-4">Cá nhân hoá lộ trình học tập</h2>
//       <div className="text-gray-600 text-sm">
//         Xin chào, {user?.name}. Dưới đây là bảng điều khiển cá nhân hoá của bạn.
//       </div>

//       {message && (
//         <div className="text-sm text-green-700 bg-green-50 p-2 rounded">{message}</div>
//       )}

//       {/* --- Gợi ý tư vấn --- */}
//       <section className="bg-white p-5 rounded shadow space-y-3">
//         <div className="flex justify-between items-center mb-2">
//           <h3 className="font-semibold text-lg">🧭 Gợi ý tư vấn (Recommended for You)</h3>
//           <button
//             onClick={() => setShowRecs((prev) => !prev)}
//             className="flex items-center gap-1 px-3 py-1 border rounded hover:bg-gray-100"
//           >
//             {showRecs ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//             {showRecs ? 'Ẩn gợi ý' : 'Hiển thị gợi ý tư vấn'}
//           </button>
//         </div>

//         {showRecs && (
//           <div className="space-y-3">
//             {recommendations.map((r) => (
//               <div key={r.id} className="border rounded p-3 hover:bg-gray-50">
//                 <div className="font-medium text-base">{r.title}</div>
//                 <div className="text-sm text-gray-700 mt-1">{r.description}</div>
//                 <div className="text-xs text-gray-500 mt-1">
//                   {r.relatedSkill && <>🔖 {r.relatedSkill}</>}{' '}
//                   {r.tutor && <>• Tutor: {r.tutor}</>}
//                 </div>
//                 <div className="mt-2 flex items-center gap-2 text-sm">
//                   <span>Gợi ý này có hữu ích không?</span>
//                   <button
//                     onClick={() => handleFeedback(r.id, 'up')}
//                     className={`p-1 border rounded ${
//                       r.feedback === 'up' ? 'bg-green-100' : ''
//                     }`}
//                   >
//                     <ThumbsUp size={16} />
//                   </button>
//                   <button
//                     onClick={() => handleFeedback(r.id, 'down')}
//                     className={`p-1 border rounded ${
//                       r.feedback === 'down' ? 'bg-red-100' : ''
//                     }`}
//                   >
//                     <ThumbsDown size={16} />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* --- Mục tiêu học tập --- */}
//       <section className="bg-white p-5 rounded shadow">
//         <h3 className="font-semibold text-lg mb-3">🎯 Mục tiêu học tập của bạn</h3>
//         <ul className="list-disc ml-6 text-gray-700 text-sm space-y-1">
//           {goals.map((g) => (
//             <li key={g.id}>{g.content}</li>
//           ))}
//         </ul>
//       </section>

//       {/* --- Sở thích học tập --- */}
//       <section className="bg-white p-5 rounded shadow">
//         <h3 className="font-semibold text-lg mb-3">⚙️ Sở thích & kỹ năng đã chọn</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {preferences.map((p) => (
//             <div key={p.id} className="border p-3 rounded">
//               <div className="font-medium">{p.name}</div>
//               <div className="w-full bg-gray-200 rounded h-3 mt-2">
//                 <div
//                   className="bg-blue-600 h-3 rounded"
//                   style={{ width: `${p.level}%` }}
//                 ></div>
//               </div>
//               <div className="text-xs text-gray-500 mt-1">
//                 Mức độ tự tin: {p.level}%
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* --- Biểu đồ tiến độ --- */}
//       <section className="bg-white p-5 rounded shadow">
//         <h3 className="font-semibold text-lg mb-3">📈 Theo dõi tiến độ học tập</h3>
//         <div className="space-y-2">
//           {progress.map((p) => (
//             <div key={p.skill}>
//               <div className="text-sm font-medium">{p.skill}</div>
//               <div className="w-full bg-gray-200 h-3 rounded">
//                 <div
//                   className="bg-green-500 h-3 rounded"
//                   style={{ width: `${p.progress}%` }}
//                 ></div>
//               </div>
//               <div className="text-xs text-gray-500">{p.progress}% hoàn thành</div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   )
// }

import { useContext, useState, useEffect } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { personalizeApi } from 'src/apis/personalize.api'
import type {
  LearningPreference,
  LearningGoal,
  Recommendation,
  LearningProgress
} from 'src/types/personalize.type'
import { ThumbsUp, ThumbsDown, ChevronDown, ChevronUp } from 'lucide-react'

export default function PersonalizeLearning() {
  const { user } = useContext(AppContext)
  const [preferences, setPreferences] = useState<LearningPreference[]>([])
  const [goals, setGoals] = useState<LearningGoal[]>([])
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [progress, setProgress] = useState<LearningProgress[]>([])
  const [message, setMessage] = useState('')
  const [showRecs, setShowRecs] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const [prefRes, goalRes, recRes, progRes] = await Promise.all([
          personalizeApi.getPreferences(),
          personalizeApi.getGoals(),
          personalizeApi.getRecommendations(),
          personalizeApi.getProgress()
        ])
        setPreferences(prefRes.data.data || [])
        setGoals(goalRes.data.data || [])
        setRecommendations(recRes.data.data || [])
        setProgress(progRes.data.data || [])
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error)
      }
    }
    fetchData()
  }, [])

  const handleFeedback = async (id: string, type: 'up' | 'down') => {
    try {
      const res = await personalizeApi.setFeedback(id, type)
      setMessage(res.data.message || 'Ghi nhận phản hồi thành công')
      
      const recRes = await personalizeApi.getRecommendations()
      setRecommendations(recRes.data.data || [])
    } catch (error) {
      console.error('Lỗi khi gửi phản hồi:', error)
      setMessage('Lỗi khi gửi phản hồi')
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Cá nhân hoá lộ trình học tập</h2>
      <div className="text-gray-600 text-sm">
        Xin chào, {user?.name}. Dưới đây là bảng điều khiển cá nhân hoá của bạn.
      </div>

      {message && (
        <div className="text-sm text-green-700 bg-green-50 p-2 rounded">{message}</div>
      )}

      {/* --- Gợi ý tư vấn --- */}
      <section className="bg-white p-5 rounded shadow space-y-3">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-lg">🧭 Gợi ý tư vấn (Recommended for You)</h3>
          <button
            onClick={() => setShowRecs((prev) => !prev)}
            className="flex items-center gap-1 px-3 py-1 border rounded hover:bg-gray-100"
          >
            {showRecs ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            {showRecs ? 'Ẩn gợi ý' : 'Hiển thị gợi ý tư vấn'}
          </button>
        </div>

        {showRecs && (
          <div className="space-y-3">
            {recommendations.map((r) => (
              <div key={r.id} className="border rounded p-3 hover:bg-gray-50">
                <div className="font-medium text-base">{r.title}</div>
                <div className="text-sm text-gray-700 mt-1">{r.description}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {r.relatedSkill && <>🔖 {r.relatedSkill}</>}{' '}
                  {r.tutor && <>• Tutor: {r.tutor}</>}
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <span>Gợi ý này có hữu ích không?</span>
                  <button
                    onClick={() => handleFeedback(r.id, 'up')}
                    className={`p-1 border rounded ${
                      r.feedback === 'up' ? 'bg-green-100' : ''
                    }`}
                  >
                    <ThumbsUp size={16} />
                  </button>
                  <button
                    onClick={() => handleFeedback(r.id, 'down')}
                    className={`p-1 border rounded ${
                      r.feedback === 'down' ? 'bg-red-100' : ''
                    }`}
                  >
                    <ThumbsDown size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* --- Mục tiêu học tập --- */}
      <section className="bg-white p-5 rounded shadow">
        <h3 className="font-semibold text-lg mb-3">🎯 Mục tiêu học tập của bạn</h3>
        <ul className="list-disc ml-6 text-gray-700 text-sm space-y-1">
          {goals.map((g) => (
            <li key={g.id}>{g.content}</li>
          ))}
        </ul>
      </section>

      {/* --- Sở thích học tập --- */}
      <section className="bg-white p-5 rounded shadow">
        <h3 className="font-semibold text-lg mb-3">⚙️ Sở thích & kỹ năng đã chọn</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {preferences.map((p) => (
            <div key={p.id} className="border p-3 rounded">
              <div className="font-medium">{p.name}</div>
              <div className="w-full bg-gray-200 rounded h-3 mt-2">
                <div
                  className="bg-blue-600 h-3 rounded"
                  style={{ width: `${p.level}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Mức độ tự tin: {p.level}%
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Biểu đồ tiến độ --- */}
      <section className="bg-white p-5 rounded shadow">
        <h3 className="font-semibold text-lg mb-3">📈 Theo dõi tiến độ học tập</h3>
        <div className="space-y-2">
          {progress.map((p) => (
            <div key={p.skill}>
              <div className="text-sm font-medium">{p.skill}</div>
              <div className="w-full bg-gray-200 h-3 rounded">
                <div
                  className="bg-green-500 h-3 rounded"
                  style={{ width: `${p.progress}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500">{p.progress}% hoàn thành</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}