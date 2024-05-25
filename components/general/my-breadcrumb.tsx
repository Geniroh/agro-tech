import React from 'react'
import Link from 'next/link'

interface BreadcrumbProps {
  fromHref: string;
  toHref: string;
  fromTitle: string;
  toTitle: string;
  className?: string;
}

const BreadcrumbP = ({
  fromHref, toHref, fromTitle, toTitle, className
}: BreadcrumbProps) => {
  return (
    <div className={`flex justify-center items-center text-[18px] leading-[27px] gap-x-2 my-10 font-semibold ${className} `}>

        <Link href={fromHref} className='text-[#888888] hover:text-mygreen'>{fromTitle}</Link>
        /
        <Link href={toHref} className='text-myblack hover:text-mygreen'>{toTitle}</Link>
    </div>
  )
}

export default BreadcrumbP