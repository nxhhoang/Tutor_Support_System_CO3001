import React, { useState, useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { useNavigate } from 'react-router-dom'
import path from 'src/constants/path'


export default function LoginForm() {
  const { login } = useContext(AppContext)
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const success = login(username, password)
    if (success) {
      navigate(path.dashboard)
    } else {
      setError('Sai tên đăng nhập hoặc mật khẩu')
    }
  }

  return (
    <div className='w-full max-w-md bg-white p-6 rounded-lg shadow'>
      <h2 className='text-xl font-semibold mb-4 text-center text-blue-700'>Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <label className='text-sm'>Tên đăng nhập</label>
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='w-full border p-2 rounded mt-1 mb-3 border-gray-300'
          placeholder='username'
        />

        <label className='text-sm'>Mật khẩu</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full border p-2 rounded mt-1 mb-4 border-gray-300'
          placeholder='password'
        />

        {error && <p className='text-red-500 text-sm mb-3'>{error}</p>}

        <button
          type='submit'
          className='w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800'
        >
          Đăng nhập
        </button>
      </form>
    </div>
  )
}
