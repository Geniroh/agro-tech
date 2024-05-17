import { CollectionsDataTable } from "@/components/data/collection-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IoIosSearch } from "react-icons/io";
import { TagSelect } from "@/components/general/tag-select";


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
  return (
    <div>
        <div className="w-full">
            <h1 className='w-full font-playfair text-2xl font-bold text-center mb-5'>Collection</h1>
            <div className="flex w-full items-center space-x-4 mb-5">
                <Input type="text" placeholder="Search by title, value chain, use, e.t.c" suffixicon={<IoIosSearch />} className="w-full bg-[#fafafa] border border-[#f2f2f2] rounded-lg" />
                <Button type="submit" className="px-6">Click here to search</Button>
            </div>

            <div>
                <TagSelect name="Value Chain" options={selectList} />
            </div>
            <CollectionsDataTable />
        </div>
    </div>
  )
}
