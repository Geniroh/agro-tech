import React from 'react'
import { StackedProgressBar } from '@/components/data/charts/StackedProgressBar'
import { ProgressLineP } from '@/components/data/charts/ProgressLineP';

const data = [
    { title: 'Segment 1', value: 20, color: '#4caf50' },
    { title: 'Segment 2', value: 30, color: '#2196f3' },
    { title: 'Segment 3', value: 25, color: '#ffeb3b' },
    { title: 'Segment 4', value: 25, color: '#f44336' },
  ];

export const InnovationBar = () => {
    const values = [20, 30, 60, 25]; // Example values
  const colors = ['#9430E3', '#D19FF9', '#ECDAFB', '#DBB3C2']; // Example colors
  return (
    <div className='w-full bg-myoffwhie min-h-[150px] rounded-lg p-5 flex flex-col gap-y-8'>
        <h1 className='text-black text-[16px] font-semibold leading-[21px]'>Total innovations and implementation phase</h1>

        <div className='flex gap-x-4 items-center'>
            <div className='h-full flex flex-col justify-between'>
                <div className='text-[30px] font-bold leading-[40px]'>
                    32k
                </div>
                <div className='text-[14px] leading-[21px]'>
                    Innovations
                </div>
            </div>

            <div className='w-full'>
                <StackedProgressBar values={values} colors={colors} />
                <ProgressLineP data={data} />
            </div>
        </div>
    </div>
  )
}
