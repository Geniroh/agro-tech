import { NewPasswordForm } from '@/components/auth/new-password-form'
import { ClimbingLoaderP } from '@/components/general/climbing-loader'
import React, { Suspense } from 'react'

const NewPasswordPage = () => {
  return (
    <Suspense fallback={<ClimbingLoaderP />}>
      <div className='w-screen h-screen bg-black/50 flex justify-center items-center'>
          <NewPasswordForm />
      </div>
    </Suspense>
  )
}

export default NewPasswordPage