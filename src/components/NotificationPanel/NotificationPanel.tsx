export default function NotificationPanel({ items }: { items?: string[] }) {
  if (!items || items.length === 0) return <div className='bg-white p-4 rounded shadow'>Bạn chưa có thông báo mới.</div>
  return (
    <div className='bg-white p-4 rounded shadow space-y-2'>
      {items.map((t, i) => (
        <div key={i} className='text-sm text-gray-700'>
          {t}
        </div>
      ))}
    </div>
  )
}
