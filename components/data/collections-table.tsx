"use client"
import React from 'react';
import { ColumnProps, TableP } from "@/components/general/p-table";
import { ImageList } from '@/components/general/image-list';
import { ColorTag } from '@/components/general/color-tags';
import { useEffect, useState } from "react"
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import { generateArrayFromNumber } from "@/utils/function";
import { Input } from "@/components/ui/input";

interface DataType {
  id: string;
  innovation: string;
  imageUrl: string;
  valueChain: string | string[];
  usage: string;
  implementationPhase: string;
  year: string;
}

const columns2: ColumnProps[] = [
  {
    header: "#",
    accessor: "id",
    render: (val, row, i) => {
      return i + 1;
    }
  },
  {
    header: 'Innovation',
    accessor: 'innovation',
    render: (name, record) => {
      return (
        <ImageList text={name} imgUrl={record.imageUrl} />
      );
    }
  },
  {
    header: 'Value Chain',
    accessor: 'valueChain',
    render: (value: string | string[], record) => {
      const valueChainArray = Array.isArray(value) ? value : [value];
      return (
        <div className='flex gap-x-1'>
          {valueChainArray.map((item, i) => (
            <ColorTag name={item} type='purple' key={i} />
          ))}
        </div>
      );
    }
  },
  {
    header: 'Use',
    accessor: 'usage',
  },
  {
    header: 'Implementation Phase',
    accessor: 'implementationPhase',
  },
  {
    header: 'Year',
    accessor: "year",
  },
];

const data2: DataType[] = [
  {
    id: "1",
    innovation: 'Vertical Farming',
    imageUrl: "/images/green-house.jpeg",
    valueChain: ["Input supply", "farm production"],
    usage: "Rice Mill",
    implementationPhase: "Wide Use",
    year: "2024",
  },
  {
    id: "2",
    innovation: 'Vertical Farming',
    imageUrl: "/images/green-house.jpeg",
    valueChain: ["Input supply", "farm production"],
    usage: "Rice Mill",
    implementationPhase: "Wide Use",
    year: "2024",
  },
  {
    id: "3",
    innovation: 'Vertical Farming',
    imageUrl: "/images/green-house.jpeg",
    valueChain: ["Input supply", "farm production"],
    usage: "Rice Mill",
    implementationPhase: "Wide Use",
    year: "2024",
  },
];

export const CollectionDataTableP = () => {
  const [pageNo, setPageNo] = useState<number>(4)

  const paginationPage = generateArrayFromNumber(pageNo);


  return (
    <div>
      <div className='w-full h-full mt-10'>
        <TableP columns={columns2} data={data2} />
      </div>

      <div className="mt-20 flex justify-center w-full">

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
  );
}
