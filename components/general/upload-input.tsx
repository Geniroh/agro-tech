// "use client";
// import React, { useRef, useState } from "react";
// import { CiImageOn } from "react-icons/ci";
// import { BarLoader } from "react-spinners";

// interface StyledFileInputProps {
//   id: string;
//   name: string;
//   onChange: (fileData: {
//     url: string | null;
//     name: string | null;
//     size: number | null;
//     type: string | null;
//   }) => void;
//   placeholder?: string;
//   className?: string;
//   defaultValue?: string;
// }

// export const StyledFileInput: React.FC<StyledFileInputProps> = ({
//   id,
//   name,
//   onChange,
//   placeholder,
//   className,
//   defaultValue,
// }) => {
//   const [fileName, setFileName] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const handleFileChange = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files?.[0] || null;
//     if (file) {
//       setFileName(file.name);
//       setIsLoading(true);
//       try {
//         const formData = new FormData();
//         formData.append("file", file);

//         // const BACKEND_API =
//         //   process.env.NEXT_PUBLIC_BACKEND_API || "http://localhost:8080";

//         const response = await fetch(`/api/v1/upload`, {
//           method: "POST",
//           body: formData,
//         });

//         if (response.ok) {
//           const data = await response.json();
//           const fileUrl = data.url;
//           onChange({
//             url: fileUrl,
//             name: file.name,
//             size: file.size,
//             type: file.type,
//           });
//         } else {
//           console.error("File upload failed.");
//           onChange({ url: null, name: null, size: file.size, type: file.type });
//         }
//       } catch (error) {
//         console.error("An error occurred while uploading the file:", error);
//         onChange({ url: null, name: null, size: file.size, type: file.type });
//       } finally {
//         setIsLoading(false);
//       }
//     } else {
//       setFileName(null);
//       onChange({ url: null, name: null, size: null, type: null });
//     }
//   };

//   return (
//     <div
//       className={`relative ${className} bg-[#fafafa] w-full min-h-[90px] flex items-center justify-center`}
//     >
//       <input
//         id={id}
//         name={name}
//         type="file"
//         ref={fileInputRef}
//         onChange={handleFileChange}
//         className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//       />
//       <div className="flex justify-center items-center h-full">
//         {isLoading ? (
//           <span className="">
//             <BarLoader />
//           </span>
//         ) : (
//           <span className="flex gap-x-2 items-center text-muted-foreground text-[14px] leading-[24px]">
//             {defaultValue || fileName || placeholder || "Upload a file"}{" "}
//             <CiImageOn />
//           </span>
//         )}
//       </div>
//     </div>
//   );
// };

"use client";
import React, { useRef, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { BarLoader } from "react-spinners";

interface StyledFileInputProps {
  id: string;
  name: string;
  onChange: (
    filesData: {
      url: string | null;
      name: string | null;
      size: number | null;
      type: string | null;
    }[]
  ) => void;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
}

export const StyledFileInput: React.FC<StyledFileInputProps> = ({
  id,
  name,
  onChange,
  placeholder,
  className,
  defaultValue,
}) => {
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileList = Array.from(files);
      setFileNames(fileList.map((file) => file.name));
      setIsLoading(true);

      const fileDataArray: {
        url: string | null;
        name: string | null;
        size: number | null;
        type: string | null;
      }[] = [];

      try {
        await Promise.all(
          fileList.map(async (file) => {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch(`/api/v1/upload`, {
              method: "POST",
              body: formData,
            });

            if (response.ok) {
              const data = await response.json();
              console.log(data.files);
              const fileUrl = data.files[0].url;
              fileDataArray.push({
                url: fileUrl,
                name: file.name,
                size: file.size,
                type: file.type,
              });
            } else {
              console.error("File upload failed.");
              fileDataArray.push({
                url: null,
                name: null,
                size: file.size,
                type: file.type,
              });
            }
          })
        );

        onChange(fileDataArray);
      } catch (error) {
        console.error("An error occurred while uploading the file(s):", error);
        onChange(
          fileList.map((file) => ({
            url: null,
            name: file.name,
            size: file.size,
            type: file.type,
          }))
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      setFileNames([]);
      onChange([]);
    }
  };

  return (
    <div
      className={`relative ${className} bg-[#fafafa] w-full min-h-[90px] flex items-center justify-center`}
    >
      <input
        id={id}
        name={name}
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        multiple
      />
      <div className="flex justify-center items-center h-full">
        {isLoading ? (
          <span className="">
            <BarLoader />
          </span>
        ) : (
          <span className="flex gap-x-2 items-center text-muted-foreground text-[14px] leading-[24px]">
            {defaultValue ||
              fileNames.join(", ") ||
              placeholder ||
              "Upload files"}{" "}
            <CiImageOn />
          </span>
        )}
      </div>
    </div>
  );
};

// "use client"
// import React, { useRef, useState, useEffect } from 'react';
// import { CiImageOn } from "react-icons/ci";

// interface StyledFileInputProps {
//   id: string;
//   name: string;
//   onChange: (file: { url: string, name: string } | null) => void;
//   placeholder?: string;
//   className?: string;
//   defaultFileName?: string; // Add this line
// }

// export const StyledFileInput: React.FC<StyledFileInputProps> = ({ id, name, onChange, placeholder, className, defaultFileName }) => {
//   const [fileName, setFileName] = useState<string | null>(defaultFileName || null);
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   useEffect(() => {
//     setFileName(defaultFileName || null);
//   }, [defaultFileName]);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0] || null;
//     setFileName(file ? file.name : null);
//     if (file) {
//       // Simulate file upload and get URL
//       const url = URL.createObjectURL(file);
//       onChange({ url, name: file.name });
//     } else {
//       onChange(null);
//     }
//   };

//   return (
//     <div className={`relative ${className} bg-[#fafafa] w-full min-h-[90px] flex items-center justify-center`} >
//       <input
//         id={id}
//         name={name}
//         type="file"
//         ref={fileInputRef}
//         onChange={handleFileChange}
//         className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//       />
//       <div className="flex justify-center items-center h-full">
//         <span className='flex gap-x-2 items-center text-muted-foreground text-[14px] leading-[24px]'>
//           {fileName || placeholder || 'Upload a file'} <CiImageOn />
//         </span>
//       </div>
//     </div>
//   );
// };
