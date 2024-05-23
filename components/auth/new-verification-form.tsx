"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { useSearchParams } from 'next/navigation'
import { newVerification } from '@/actions/new-verification'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'

import { CardWrapper } from '@/components/auth/card-wrapper'

const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()
    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if (!token) {
            setError("Missing token!")
            return
        }
        newVerification(token)
            .then((data) => {
                setError(data.error);
                setSuccess(data.success)
            })
            .catch(() => {
                setError("Something went wrong")
            })
    }, [token])


    useEffect(() => {
        onSubmit()
    }, [onSubmit])

  return (
    <div>
        <CardWrapper
            headerLabel='Confirming your verification'
            backButtonLabel='Back to login'
            backButtonHref='/auth/login/signin'
            actionTitle='Email Verification'
            backButtonVariant='link'
        >
            <div className='flex items-center w-full justify-center'>
                {
                  (!success && !error) &&   <BeatLoader />
                }

                <FormError message={error} />
                <FormSuccess message={success} />
            </div>
        </CardWrapper>
    </div>
  )
}

export default NewVerificationForm