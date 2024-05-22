import React from 'react'
import Link from 'next/link'

const BreadcrumbP = () => {
  return (
    <div className='flex justify-center items-center text-sm gap-x-2 my-10 font-semibold'>
        <span className='text-[#888888]'>Back to HomePage</span>
        /
        <span><Link href="/upload">Upload Invention Page</Link></span>
    </div>
  )
}

export default BreadcrumbP