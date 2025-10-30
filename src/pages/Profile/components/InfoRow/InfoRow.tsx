export default function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  )
}