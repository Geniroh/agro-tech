import Link from 'next/link';
import React from 'react'

export interface ImageCardProps {
    id: number;
    imageUrl: string;
    title:  string;
    // tags?: {name: string, bgcolor: string, textcolor: string}[]
    tags?: React.ReactNode;
}

const ImageCard = ({ id, imageUrl, title, tags }: ImageCardProps) => {
  return (
    <div className='w-full h-[370px] bg-no-repeat bg-cover bg-center rounded-2xl p-8 relative' style={{ backgroundImage: `url(${imageUrl})`,}}>
        <div className='flex flex-col justify-between w-full h-full relative z-20'>
            <div>
                <h1 className='font-bold text-[32px] text-white capitalize tracking-tighter'>{title}</h1>
                {/* <div className='flex gap-x-4'>
                    {
                        tags?.map((tag, i) => {
                                console.log(`text-[${tag.textcolor}]`)
                            return <span key={`${tag.name[0]}-${i}`} className={` py-1 px-3 rounded-xl bg-[${tag.bgcolor}] text-[${tag.textcolor}]  text-[7px] font-bold`}>{tag.name}</span>
                        })        
                    }
                </div> */}
                {tags}
            </div>

            <div>
                <Link href={`/innovations/${id}`} className='bg-white text-mygreen px-[24px] py-[12px] rounded-md hover:bg-mygreen hover:text-white '>View More</Link>
            </div>
        </div>

        <div className='absolute top-0 left-0 w-full h-full bg-black/10 rounded-2xl'></div>
    </div>
  )
}

export default ImageCard