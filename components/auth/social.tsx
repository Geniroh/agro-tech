"use client"
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub, FaApple } from 'react-icons/fa'
import { FaSquareFacebook } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { signIn } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { useRouter } from 'next/navigation';


export const Social = () => {
    const router = useRouter()
    const handleSocialLogin = (provider: SocialProvidersType) => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        })
    }
  return (
    <div>
        <div className='flex flex-col w-full gap-y-2 pb-5 border-b'>
            <Button
                size="lg"
                className='w-full'
                variant="outline"
                onClick={() => handleSocialLogin('google')}
            >
                <div className='flex gap-x-2'>
                    <FcGoogle className='h-5 w-5' />
                    <span>Sign In with Google</span>
                </div>
            </Button>
            {/* <Button
                size="lg"
                className='w-full'
                variant="outline"
                onClick={() => handleSocialLogin('github')}
            >
                <div className='flex gap-x-2'>
                    <FaGithub className='h-5 w-5' />
                    <span>Sign In with Github</span>
                </div>
            </Button> */}

            <Button
                size="lg"
                className='w-full'
                variant="outline"
                onClick={() => handleSocialLogin('facebook')}
            >
                <div className='flex gap-x-2'>
                    <FaSquareFacebook className='h-5 w-5 text-[#1877f2]' />
                    <span>Sign In with Facebook</span>
                </div>
            </Button>

            {/* <Button
                size="lg"
                className='w-full'
                variant="outline"
                onClick={() => handleSocialLogin('apple')}
            >
                <div className='flex gap-x-2'>
                    <FaApple className='h-5 w-5 text-[#000]' />
                    <span>Sign In with Apple</span>
                </div>
            </Button> */}

            <Button
                size="lg"
                className='w-full'
                variant="outline"
                onClick={() => router.push("login/signin")}
            >
                <div className='flex gap-x-2'>
                    <IoMdMail className='h-5 w-5 text-[#000]' />
                    <span>Sign In with Email</span>
                </div>
            </Button>
        </div>

        <div>
            <h1 className='w-full text-center mt-3 font-semibold'>Or</h1>
        </div>
    </div>
  )
}