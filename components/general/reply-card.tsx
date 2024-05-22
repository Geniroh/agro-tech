import React from 'react'
import { ThumbsUp, ThumbsDown, MessageSquareText, Share, Upload } from 'lucide-react'

interface ReplyCardProps {
    avatar?: string;
    username: string;
    postedby?: string;
    likes?: number;
    dislikes?: number;
    comments?: number;
    id: string;
    message?: string
}

export const ReplyCard = ({ avatar, username, postedby, message }: ReplyCardProps) => {
  return (
    <div className='w-full flex flex-col gap-y-6'>
        <div className='flex items-center gap-x-3 '>
            <div className='w-[40px] h-[40px] rounded-full bg-center bg-cover bg-no-repeat' style={avatar ? {backgroundImage: avatar} : {background: "#9430E3"}}></div>
            <div className='flex flex-wrap gap-x-4 items-center'>
                <h1 className='text-lg font-semibold text-myblack'>{username}</h1>
                <span className='text-muted-foreground text-xs'>{postedby}</span>
            </div>
        </div>

        <div className='text-sm '>{message}</div>

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
    </div>
  )
}