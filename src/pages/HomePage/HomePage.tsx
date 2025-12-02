import { motion } from 'framer-motion'
import logo from 'src/assets/images/logobachkhoa.png'
import { useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { useState } from 'react'

export default function HomePage() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLoginClick = () => {
    setLoading(true)
    setTimeout(() => navigate(path.sso), 500)
  }

  if (loading) {
    return <div className='min-h-screen bg-white transition-all duration-100' />
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center'>
      <motion.img
        src={logo}
        alt='BK HCMUT'
        className='w-40 mb-6'
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      />
      <h2 className='text-xl text-blue-700 font-medium mb-2'>
        Chương trình Tutor/Mentor hỗ trợ sinh viên
      </h2>
      <h1 className='text-3xl font-bold text-blue-800 mb-6'>
        HCMUT Tutor Support System
      </h1>

      <p className='max-w-lg text-gray-600 mb-8'>
        Hệ thống giúp sinh viên kết nối với tutor/mentor để được hướng dẫn học tập,
        quản lý buổi gặp và nhận phản hồi. Tích hợp HCMUT_SSO nhằm đảm bảo bảo mật và đồng bộ học vụ.
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className='bg-blue-700 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-800'
        onClick={handleLoginClick}
      >
        Đăng nhập
      </motion.button>
    </div>
  )
}
