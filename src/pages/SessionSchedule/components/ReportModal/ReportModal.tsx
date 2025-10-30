import React from 'react'
import type { Session } from 'src/types/session.type'

type Props = {
  open: boolean
  session: Session | null
  reportText: string
  onChangeReportText: (v: string) => void
  onClose: () => void
  onSubmit: () => void
}

const ReportModal: React.FC<Props> = ({ open, session, reportText, onChangeReportText, onClose, onSubmit }) => {
  if (!open || !session) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-start md:items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-2xl rounded shadow-lg overflow-auto max-h-[90vh] p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium">📝 Biên bản cuộc họp — Program #{session.programId}</h3>
          <button className="px-2 py-1 border rounded" onClick={onClose}>Đóng</button>
        </div>

        <textarea
          value={reportText}
          onChange={(e) => onChangeReportText(e.target.value)}
          className="w-full border p-2 rounded"
          rows={10}
          placeholder="Ghi nội dung cuộc họp, kết quả thảo luận, hành động tiếp theo..."
        />

        <div className="flex justify-end gap-2 mt-3">
          <button className="px-3 py-1 border rounded" onClick={onClose}>Hủy</button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={onSubmit}>Lưu biên bản</button>
        </div>
      </div>
    </div>
  )
}

export default ReportModal
