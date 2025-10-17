import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import RegisterForm from '../components/auth/RegisterForm'

const Register = () => {
  const { user } = useAuth()

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-800">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  )
}

export default Register