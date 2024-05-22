import { getRandomColor, knumberformatter } from '@/utils/function';
import React from 'react';

interface ProgressLineDataProps {
    title: string;
    value: number;
    color?: string;
}

interface ProgressLineProps {
    data: ProgressLineDataProps[];
}

export const ProgressLineP: React.FC<ProgressLineProps> = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div>
        <div className='flex gap-x-6'>
            {
                data.map((item, i) => (
                    <div className='mb-3 flex flex-col gap-y-3 items-center' key={i}>
                        <div className='flex-[14px] font-bold text-center'>
                            { knumberformatter(item.value)}
                        </div>
                        <div className='flex gap-x-1 items-center'>
                            <span className={`w-[16px] h-[16px] rounded-md `} style={{ background: item.color }}></span>
                            <span className='text-[12px]'>{item.title}</span>
                        </div>
                    </div>
                ))
            }
        </div>
      <div className="flex w-full h-8 border border-gray-300 overflow-hidden cursor-pointer">
        
        {data.map((item, index) => (
          <div
            key={index}
            className="h-full"
            style={{
              width: `${(item.value / total) * 100}%`,
              backgroundColor: item.color || getRandomColor(),
            }}
            title={item.title}
          ></div>
        ))}
      </div>
    </div>
  );
};
