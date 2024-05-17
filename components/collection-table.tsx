"use client"
import { CollectionDataImageGrid, CollectionsDataTable } from "@/components/data/collection-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IoIosSearch } from "react-icons/io";
import { TagSelect } from "@/components/general/tag-select";
import {
  LayoutGrid, List
} from "lucide-react"
import { useState } from "react";


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

export const CollectionTable = () => {
  const [displayState, setDisplayState] = useState<number>(1)

  return (
    <div>
        <div className="w-full">
            <h1 className='w-full font-playfair text-2xl font-bold text-center mb-5'>Collection</h1>
            <div className="flex w-full items-center space-x-4 mb-5">
                <Input type="text" placeholder="Search by title, value chain, use, e.t.c" suffixicon={<IoIosSearch />} className="w-full bg-[#fafafa] border border-[#f2f2f2] rounded-lg" />
                <Button type="submit" className="px-6">Click here to search</Button>
            </div>

            <div className="mb-5 flex justify-between items-center">
              <div className="flex gap-x-4">
                <TagSelect name="Value Chain" options={selectList} />
                <TagSelect name="Implementation phase" options={selectList} />
                <TagSelect name="Year created" options={selectList} />
                <TagSelect name="country" options={selectList} />
              </div>

              <div className="flex gap-x-2">
                <Button variant={`${displayState == 1 ? "default": "outline"}`} onClick={() => setDisplayState(2)}><LayoutGrid size={16}/></Button>
                <Button variant={`${displayState == 2 ? "default": "outline"}`} onClick={() => setDisplayState(1)}><List size={16} /></Button>
              </div>
            </div>
            <div className="mt-10 mb-[100px]">

              {
                displayState === 1 && <CollectionsDataTable />
              }

              {
                displayState === 2 && <CollectionDataImageGrid />
              }
              
            </div>
        </div>
    </div>
  )
}
