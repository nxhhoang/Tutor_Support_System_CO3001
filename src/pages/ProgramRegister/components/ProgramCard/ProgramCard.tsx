import type { Program } from 'src/types/program.type'

export default function ProgramCard({
  program,
  onViewDetail,
}: {
  program: Program
  onViewDetail: () => void
  onRegister?: () => void
}) {
  return (
    <div className='border rounded p-4 shadow-sm flex flex-col justify-between'>
      <div>
        <h3 className='text-lg font-medium'>{program.title}</h3>
        <div className='text-sm text-gray-600'>
          {program.field} • {program.category}
        </div>
        <p className='text-sm mt-2 line-clamp-3'>{program.description}</p>
      </div>

      <div className='mt-4 flex items-center justify-between'>
        <div className='text-sm'>
          <div>
            Số chỗ còn lại: <span className='font-semibold'>{program.availableSlots}</span>
          </div>
          <div>
            Trạng thái: <span className='capitalize'>{program.status}</span>
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <button className='px-3 py-1 bg-blue-600 text-white rounded' onClick={onViewDetail}>
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  )
}