import React from 'react'
// import { FolderKanban, SendHorizontal } from 'lucide-react';
import { RiFoldersFill } from "react-icons/ri";
import { IoSendSharp } from "react-icons/io5";


interface ChatCardProps {
    username: string;
    email: string;
    id: string;
    caption?: string;
    avatar?: string;
    placeholder?: string;
}

export const ChatCard = ({ username, email, id, caption, avatar, placeholder }: ChatCardProps) => {
  return (
    <div className='w-full flex flex-col gap-y-3' key={id}>
        <div className='flex items-center gap-x-3 '>
            <div className='w-[40px] h-[40px] rounded-full bg-center bg-cover bg-no-repeat' style={avatar ? {backgroundImage: avatar} : {background: "#9430E3"}}></div>
            <div>
                <h1 className='text-lg font-semibold text-myblack'>{username}</h1>
                <h3 className='text-muted-foreground'>{caption}</h3>
            </div>
        </div>
        <div className='bg-myoffwhie py-2 px-6 rounded-3xl w-full flex items-center'>
            <input className='bg-transparent border-0 outline-none w-full' placeholder={placeholder} />
            <div className='flex text-[14px] gap-x-2'>
                <button className='p-2 flex items-center justify-center rounded-full hover:bg-white border'><RiFoldersFill /></button>
                <button className='p-2 flex items-center justify-center rounded-full hover:bg-white border'><IoSendSharp /></button>
            </div>
        </div>
    </div>
  )
}