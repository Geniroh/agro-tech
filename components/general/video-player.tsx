import React from 'react'
import { IoPlay } from "react-icons/io5";

export const VideoPlayer = () => {
  return (
    <div className='w-full h-[380px] bg-[#f2f2f2] flex justify-center items-center'>
        <IoPlay className='text-4xl cursor-pointer' />
    </div>
  )
}