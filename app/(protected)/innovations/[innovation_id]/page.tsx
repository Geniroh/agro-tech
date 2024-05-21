import React from 'react'
import Link from 'next/link'
import { Capsule } from '@/components/general/capsule'
import { ThumbsUp, ThumbsDown, MessageSquareText, Share, Upload } from 'lucide-react'
import { VideoPlayer } from '@/components/general/video-player'
import { IoPlay } from "react-icons/io5";
import { GrImage } from "react-icons/gr";
import { FaCheckCircle } from "react-icons/fa";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ForumChats } from '@/components/general/forum-chats'

const InnovationPage = () => {
  return (
    <div className='container pb-20'>
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

        <div>
          <div className='grid grid-cols-4 gap-6 mt-10'>
            <div className='bg-[#f2f2f2] rounded-md h-[200px] w-full flex justify-center items-center'>
                <IoPlay />
            </div>
            <div className='bg-[#f2f2f2] rounded-md h-[200px] w-full flex justify-center items-center'>
                <GrImage />
            </div>
            <div className='bg-[#f2f2f2] rounded-md h-[200px] w-full flex justify-center items-center'>
                <GrImage />
            </div>
            <div className='bg-[#f2f2f2] rounded-md h-[200px] w-full flex justify-center items-center'>
                <GrImage />
            </div>
          </div>

          <div className='mt-10'>
              <h2 className='text-2xl text-muted-foreground'>Description</h2>
              <p className='leading-8'>
              Lorem ipsum dolor sit amet consectetur. Gravida nunc cursus dolor feugiat dignissim id quam. Id rhoncus erat sit ut velit. Elit diam bibendum malesuada blandit convallis porttitor. Eu adipiscing nisl risus nunc neque at. Egestas velit pellentesque massa ipsum varius orci facilisis vehicula in. Ut accumsan fringilla posuere consequat ultricies eget.
              </p>
          </div>

          <div className='mt-10'>
            <h2 className='text-2xl text-muted-foreground'>Additional Info</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className='px-3 font-semibold'>How to Use</AccordionTrigger>
                  <AccordionContent className='mt-5 px-6'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, assumenda!
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus corporis expedita optio totam nobis architecto aperiam praesentium alias at nam?
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className='px-3 font-semibold'>Contact Supplier</AccordionTrigger>
                  <AccordionContent className='mt-5 px-6'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, assumenda!
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus corporis expedita optio totam nobis architecto aperiam praesentium alias at nam?
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className='px-3 font-semibold'>Contact Inventor</AccordionTrigger>
                  <AccordionContent className='mt-5 px-6'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, assumenda!
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus corporis expedita optio totam nobis architecto aperiam praesentium alias at nam?
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className='px-3 font-semibold'>Usuage Examples</AccordionTrigger>
                  <AccordionContent className='mt-5 px-6'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, assumenda!
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus corporis expedita optio totam nobis architecto aperiam praesentium alias at nam?
                  </AccordionContent>
                </AccordionItem>
              
              </Accordion>
          </div>

          <div className='mt-10'>
            <h2 className='text-2xl text-muted-foreground'>Gender Friendly</h2>

            <button className='flex gap-x-1 items-center text-sm'>Yes <FaCheckCircle /></button>
          </div>

          <div className='w-full border shadow-sm rounded-md mt-5 h-[35px] flex items-center justify-between px-2'>
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

            </div>

          </div>

          <h2 className='text-lg text-muted-foreground mt-10'>Join the community (100)</h2>
          <ForumChats />
        </div>
    </div>
  )
}

export default InnovationPage
