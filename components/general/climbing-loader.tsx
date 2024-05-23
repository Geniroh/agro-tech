"use client"
import React from 'react'
import { ClimbingBoxLoader} from "react-spinners"

export const ClimbingLoaderP = () => {
  return (
    <div className='bg-white w-full h-screen flex flex-col justify-center items-center'>
        <ClimbingBoxLoader color='#36d7b7' speedMultiplier={1} />
        <h1 className='text-[#36d7b7] text-2xl'>Loading ...</h1>
    </div>
  )
}