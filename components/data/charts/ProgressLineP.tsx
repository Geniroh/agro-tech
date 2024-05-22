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
    <div className="flex w-full h-8 border border-gray-300 overflow-hidden">
      {data.map((item, index) => (
        <div
          key={index}
          className="h-full"
          style={{
            width: `${(item.value / total) * 100}%`,
            backgroundColor: item.color || '#cccccc', // Default color if none is provided
          }}
          title={item.title} // Optional: Show the title on hover
        ></div>
      ))}
    </div>
  );
};
