import React from 'react'
import Image from 'next/image';

interface ImageListProps {
    imgUrl: string;
    text: string;
    className?: string;
}

export const ImageList = ({ imgUrl, text, className}: ImageListProps) => {
  return (
    <div className={`w-full flex items-center gap-x-2 ${className}`}>
        <Image src={imgUrl} alt={text} width={40} height={40} className='w-[40px] h-[40px] rounded-md' />
        <span>{text}</span>
    </div>
  )
}