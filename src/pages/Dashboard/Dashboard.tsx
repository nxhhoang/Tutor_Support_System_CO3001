import HomeImg from 'src/assets/images/Home_minimize.png'

export default function Dashboard() {
  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-50">
      <img
        src={HomeImg}
        alt="Tutor Support System Home"
        className="max-w-full max-h-screen object-contain"
      />
    </div>
  )
}
