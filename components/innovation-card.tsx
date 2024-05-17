import Link from 'next/link';
import React from 'react'

interface InnovationCardProps {
    innovation: InnovationType;
}

const InnovationCard: React.FC<InnovationCardProps>  = ({ innovation }) => {
  return (
    <div className='bg-[#FCFED7] min-h-[350px] w-full mb-5 flex items-end justify-start p-5'>
        <div className='flex flex-col gap-4 '>
            <div className='bg-white px-3 py-2 rounded-2xl text-myblack'>{innovation?.usage}</div>
            <div className='text-lg font-semibold'>{innovation?.name}</div>
            <Link href={`/innovations/${innovation?.id}`} className='text-mypurple'>Check out</Link>
        </div>
    </div>
  )
}

export default InnovationCard