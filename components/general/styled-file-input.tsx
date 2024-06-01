// components/StyledFileInput.tsx
import React, { useRef } from 'react';
import { CiImageOn } from "react-icons/ci";

interface StyledFileInputProps {
  id: string;
  className?: string;
  placeholder?: string;
}

export const StyledFileInput: React.FC<StyledFileInputProps> = ({ id, className, placeholder }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={`relative ${className}`} >
      <input
        id={id}
        type="file"
        ref={fileInputRef}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="flex justify-center items-center h-full">
        {/* You can replace this with any custom text or image */}
        <span className='flex gap-x-2 items-center text-muted-foreground'>{placeholder || 'Upload a file'} <CiImageOn size={16} /></span>
      </div>
    </div>
  );
};

