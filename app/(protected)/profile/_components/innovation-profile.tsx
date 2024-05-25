import React, { useState} from 'react'
import { TagSelect } from '@/components/general/tag-select'


const selectList: { name: string, value:string}[] = [
    {
      name: "first item",
      value: "first"
    },
    {
      name: "second item",
      value: "second"
    },
    {
      name: "third item",
      value: "third"
    },
  ]

export const InnovationProfile = () => {
    const [activeSection, setActiveSection] = useState<number>(1)
  return (
    <div>
         <div className='pt-10 mt-10 pb-4 border-b flex justify-between'>
                <div className='flex gap-4'>
                   <button className={`${activeSection == 1 ? "text-white bg-black" : "bg-transparent text-black"} py-1 px-6 rounded-3xl`} onClick={() => setActiveSection(1)}>All</button>
                   <button className={`${activeSection == 2 ? "text-white bg-black" : "bg-transparent text-black"} py-1 px-6 rounded-3xl`} onClick={() => setActiveSection(2)}>Innovations</button>
                   <button className={`${activeSection == 3 ? "text-white bg-black" : "bg-transparent text-black"} py-1 px-6 rounded-3xl`} onClick={() => setActiveSection(3)}>Discussion</button>
                </div>
                <div>
                    <TagSelect name="Filter By" options={selectList} />
                </div>
            </div>
    </div>
  )
}