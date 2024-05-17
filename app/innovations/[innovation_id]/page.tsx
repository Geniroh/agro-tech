import React from 'react'
import Link from 'next/link'
import { Capsule } from '@/components/general/capsule'
import { ThumbsUp, ThumbsDown, MessageSquareText, Share, Upload } from 'lucide-react'
import { VideoPlayer } from '@/components/general/video-player'

const InnovationPage = () => {
  return (
    <div className='container'>
          <div className='flex justify-center items-center text-sm gap-x-2 my-10 font-semibold'>
              <span className='text-[#888888]'>Back to HomePage</span>
              /
              <span><Link href="/upload">Upload Innovation</Link></span>
          </div>

          <div className='w-full'>
              <div>
                <h1 className='w-full text-center text-4xl font-playfair font-semibold'>Innovation Name Here</h1>
              </div>
              <div className='flex flex-wrap items-center justify-center max-w-[900px] mt-7 text-sm tracking-wide mx-auto'>
                  <div><span className='text-muted-foreground mr-2'>Inventor:</span> <span>Name of Inventor Here</span></div>
                  <div className='mx-4'>|</div>
                  <div><span className='text-muted-foreground mr-2'>Year Invented:</span> <span>2024</span></div>
                  <div className='mx-4'>|</div>
                  <div><span className='text-muted-foreground mr-2'>Country:</span> <span>Nigeria</span></div>
                  <div className='mx-4'>|</div>
                  <div><span className='text-muted-foreground mr-2'>Cost:</span> <span>1.2 Million Naira</span></div>
              </div>
              <div className='flex flex-wrap items-center justify-center max-w-[900px] mt-3 text-sm tracking-wide mx-auto ext-xs'>
                  <div className='flex items-center'><span className='text-muted-foreground mr-2'>Value Chain:</span> <span className='flex gap-x-2'><Capsule>Farm Production</Capsule> <Capsule>Supply</Capsule></span></div>
                  <div className='mx-4'>|</div>
                  <div className='flex items-center'><span className='text-muted-foreground mr-2'>Implementation Phase:</span> <span className='flex gap-x-2'><Capsule>Commercial</Capsule> </span></div>
                  <div className='mx-4'>|</div>
                  <div className='flex items-center'><span className='text-muted-foreground mr-2'>Usage:</span> <span className='flex gap-x-2'><Capsule>Mill</Capsule></span></div>

              </div>
          </div>

          <div className='w-full border shadow-sm rounded-md mt-5 max-w-[1000px] mx-auto h-[35px] flex items-center justify-between px-2'>
            <div className='flex gap-x-4'>
              <button className='flex items-center text-xs'>
                <span className='p-2 rounded-full hover:bg-[#f2f2f2] flex justify-center items-center'><ThumbsUp size={13} /></span>
                <span>100</span>
              </button>

              <button className='flex items-center text-xs'>
                <span className='p-2 rounded-full hover:bg-[#f2f2f2] flex justify-center items-center'><ThumbsDown size={13} /></span>
                <span>4</span>
              </button>

              <button className='flex items-center text-xs'>
                <span className='p-2 rounded-full hover:bg-[#f2f2f2] flex justify-center items-center'><MessageSquareText size={13} /></span>
                <span>20</span>
              </button>
            </div>

            <div className='flex gap-x-4'>
              <button className='flex items-center text-xs'>
                <span className='p-2 rounded-full hover:bg-[#f2f2f2] flex justify-center items-center'><Share size={13} /></span>
                <span>Share</span>
              </button>

              <button className='flex items-center text-xs'>
                <span className='p-2 rounded-full hover:bg-[#f2f2f2] flex justify-center items-center'><Upload size={13} /></span>
                <span>Upload Innovation</span>
              </button>

            </div>

          </div>

        <div className='mt-16'>
            <VideoPlayer />
        </div>
    </div>
  )
}

export default InnovationPage
