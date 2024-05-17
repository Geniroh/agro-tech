import React from 'react'
import { LoginForm } from '@/components/auth/login-form'

const SignInPage = () => {
  return (
    <div className="w-screen h-screen bg-black/50 absolute top-0 flex justify-center items-center transition-all duration-300 ease-in-out">
      <LoginForm />
    </div>
  )
}

export default SignInPage