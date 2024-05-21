"use client"
import { InnovationTableColumn, Payment, columns } from "@/components/data/collection-table/column"
import { DataTable } from "@/components/data/collection-table/data-table"
import { useEffect, useState } from "react"
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import { generateArrayFromNumber } from "@/utils/function";
import { Input } from "@/components/ui/input";
import InnovationCard from "@/components/innovation-card";

async function getData(): Promise<InnovationTableColumn[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "Innovation type",
      chain: ["Input supply", "farm production"],
      usage: "mill",
      phase: "Wide use",
      year: "2024"
    },
    {
      id: "728ed52f56",
      name: "Innovation type",
      chain: ["Input supply", "farm production"],
      usage: "mill",
      phase: "Wide use",
      year: "2024"
    },
    {
      id: "728ed52f890",
      name: "Innovation type",
      chain: ["Input supply", "farm production"],
      usage: "mill",
      phase: "Wide use",
      year: "2024"
    },
    // ...
  ]
}

const innovationList: InnovationType[] = [
    {
        name: "Powerful mill",
        usage: "Used in rice production",
        id: 1,
    },
    {
        name: "Efficient irrigation system",
        usage: "Saves water usage by 30%",
        id: 2,
    },
    {
        name: "Smart crop monitoring device",
        usage: "Real-time data on crop health",
        id: 3,
    },
    {
        name: "Smart crop monitoring device",
        usage: "Real-time data on crop health",
        id: 4,
    },

];

export function CollectionsDataTable() {
  const [tableData, setTableData] = useState<InnovationTableColumn[]>([])
  const [pageNo, setPageNo] = useState<number>(4)

  const paginationPage = generateArrayFromNumber(pageNo);

  console.log({page: paginationPage})

  const getTableData = async () => {
    const data = await getData()
    setTableData(data)
  }

  useEffect(() => {
    getTableData()
  }, [])

  return (
    <div className="">
      <DataTable columns={columns} data={tableData} />


      
      <div className="mt-10 flex justify-center w-full">

            <div className="flex items-center gap-3">
                <div>
                    <Button size="sm"><FaCaretLeft className="text-white text-sm" /></Button>
                </div>
                <div className="flex gap-x-2 items-center">
                    <div className="flex gap-x-2">
                        {
                            paginationPage.map(page => (
                                <Button size="sm" className="rounded-full" variant="outline" key={page}>{page}</Button>
                            ))
                        }
                    </div>
                    <div className="flex gap-x-2">
                        <Input placeholder="Enter page to jump to ..." size={10} className="max-w-[300px] placeholder:text-[11px]" />
                        {
                            paginationPage.length > 10 && (
                                <Button size="sm" className="rounded-full" variant="outline" key={paginationPage.length}>{paginationPage.length}</Button>
                            )
                        }

                        <Button size="sm" className="rounded-full" variant="outline" key={paginationPage.length}>20</Button>
                       
                    </div>
                </div>
                <div>
                    <Button size="sm"><FaCaretRight className="text-white text-sm" /></Button>
                </div>
            </div>
        </div>
    </div>
  )
}


export function CollectionDataImageGrid () {
    return (
        <div className="grid grid-cols-3 gap-4">
            { 
                innovationList.map((innovation, i) => (
                    <InnovationCard innovation={innovation} key={i} />
                ))
            }
        </div>
    )
}

