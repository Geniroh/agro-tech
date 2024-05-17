import React from 'react'

interface CapsuleProps {
  children: React.ReactNode;
  className?: string; 
}

export const Capsule: React.FC<CapsuleProps> = ({ children, className = '' }) => {
  return (
    <div className={`w-fit py-[3px] px-[8px] rounded-[32px] bg-[#f2f2f2] text-[10px] min-w-[20px] ${className}`}>
      {children}
    </div>
  );
}
