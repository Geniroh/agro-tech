import React from 'react';

interface StackedProgressBarProps {
  values: number[];
  colors: string[];
}

export const StackedProgressBar: React.FC<StackedProgressBarProps> = ({ values, colors }) => {
  const total = values.reduce((sum, value) => sum + value, 0);

  return (
    <div className="flex w-full h-8 border border-gray-300 rounded overflow-hidden">
      {values.map((value, index) => (
        <div
          key={index}
          className="h-full"
          style={{
            width: `${(value / total) * 100}%`,
            backgroundColor: colors[index],
          }}
        ></div>
      ))}
    </div>
  );
};