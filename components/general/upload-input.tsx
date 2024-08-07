// "use client";
// import { message } from "antd";
// import React, { useRef, useState } from "react";
// import { CiImageOn } from "react-icons/ci";
// import { BarLoader } from "react-spinners";

// interface StyledFileInputProps {
//   id: string;
//   name: string;
//   onChange: (
//     filesData: {
//       url: string | null;
//       name: string | null;
//       size: number | null;
//       type: string | null;
//     }[]
//   ) => void;
//   placeholder?: string;
//   className?: string;
//   defaultValue?: string;
//   max?: number;
// }

// export const StyledFileInput: React.FC<StyledFileInputProps> = ({
//   id,
//   name,
//   onChange,
//   placeholder,
//   className,
//   defaultValue,
//   max = 7,
// }) => {
//   const [fileNames, setFileNames] = useState<string[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [uploadProgress, setUploadProgress] = useState<number>(0);
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const handleFileChange = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const files = event.target.files;
//     if (files && files.length > 0) {
//       const fileList = Array.from(files);
//       setFileNames(fileList?.map((file) => file.name));
//       setIsLoading(true);
//       const fileDataArray: {
//         url: string | null;
//         name: string | null;
//         size: number | null;
//         type: string | null;
//       }[] = [];

//       if (fileList.length > max) {
//         message.error(`Sorry but you cannot upload more than ${max} files`);
//         fileDataArray.push({
//           url: null,
//           name: null,
//           size: null,
//           type: null,
//         });
//         setIsLoading(false);
//         return fileDataArray;
//       }

//       try {
//         await Promise.all(
//           fileList?.map(async (file) => {
//             const formData = new FormData();
//             formData.append("file", file);

//             const xhr = new XMLHttpRequest();
//             xhr.open("POST", "/api/v1/upload");

//             // Track upload progress
//             xhr.upload.onprogress = (event) => {
//               if (event.lengthComputable) {
//                 const progress = (event.loaded / event.total) * 100;
//                 setUploadProgress(progress);
//               }
//             };

//             xhr.onload = () => {
//               const response = JSON.parse(xhr.responseText);
//               if (xhr.status === 200) {
//                 response.files?.map((file: any) => {
//                   const fileUrl = file.url;
//                   fileDataArray.push({
//                     url: fileUrl,
//                     name: file.name,
//                     size: file.size,
//                     type: file.type,
//                   });
//                 });
//               } else {
//                 fileDataArray.push({
//                   url: null,
//                   name: null,
//                   size: file.size,
//                   type: file.type,
//                 });
//               }
//             };

//             xhr.onerror = () => {
//               message.error(
//                 "An error occurred while uploading the file(s): Please Check your network"
//               );
//             };

//             xhr.send(formData);

//             // Wait for the upload to complete
//             await new Promise((resolve) => {
//               xhr.onloadend = resolve;
//             });
//           })
//         );

//         onChange(fileDataArray);
//       } catch (error) {
//         message.error(
//           "An error occurred while uploading the file(s): Please Check your network"
//         );
//         console.error("An error occurred while uploading the file(s):", error);
//         onChange(
//           fileList?.map((file) => ({
//             url: null,
//             name: file.name,
//             size: file.size,
//             type: file.type,
//           }))
//         );
//       } finally {
//         setIsLoading(false);
//         setUploadProgress(0);
//       }
//     } else {
//       setFileNames([]);
//       onChange([]);
//     }
//   };

//   return (
//     <div>
//       <div
//         className={`relative ${className} bg-[#f0f0f0] w-full min-h-[120px] md:min-h-[150px] rounded-md flex items-center justify-center`}
//       >
//         <input
//           id={id}
//           name={name}
//           type="file"
//           ref={fileInputRef}
//           onChange={handleFileChange}
//           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//           multiple
//         />
//         <div className="flex justify-center items-center h-full">
//           {isLoading ? (
//             <div className="flex flex-col">
//               <span className="text-center text-[12px] leading-[18px]">
//                 {uploadProgress < 100 ? (
//                   <span>Uploading {uploadProgress.toFixed(2)}%</span>
//                 ) : (
//                   <span>Please wait...</span>
//                 )}
//               </span>
//               <BarLoader color="#53a350" />
//             </div>
//           ) : (
//             <span className="flex gap-x-2 items-center justify-center text-[#b4b4b4] text-[14px] leading-[24px]">
//               {(defaultValue && defaultValue?.length > 1) ||
//               fileNames.length > 1 ? (
//                 <span className="max-w-[150px] mx-auto text-[12px] text-wrap text-center flex flex-col items-center">
//                   {Array.isArray(defaultValue)
//                     ? defaultValue?.flat()?.map((value) => `${value.name}, `)
//                     : defaultValue || fileNames.join(", ")}
//                 </span>
//               ) : (
//                 <div>
//                   {placeholder ? (
//                     <span className="flex gap-x-2 items-center w-full">
//                       {placeholder || "Upload files"} <CiImageOn />
//                     </span>
//                   ) : (
//                     <span className="flex gap-x-2 items-center w-full">
//                       {"Upload files"} <CiImageOn />
//                     </span>
//                   )}
//                 </div>
//               )}
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

import axios, { AxiosProgressEvent } from "axios";
import { message } from "antd";
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
  max?: number;
}

export const StyledFileInput: React.FC<StyledFileInputProps> = ({
  id,
  name,
  onChange,
  placeholder,
  className,
  defaultValue,
  max = 7,
}) => {
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileList = Array.from(files);
      setFileNames(fileList?.map((file) => file.name));
      setIsLoading(true);
      const fileDataArray: {
        url: string | null;
        name: string | null;
        size: number | null;
        type: string | null;
      }[] = [];

      if (fileList.length > max) {
        message.error(`Sorry but you cannot upload more than ${max} files`);
        fileDataArray.push({
          url: null,
          name: null,
          size: null,
          type: null,
        });
        setIsLoading(false);
        return fileDataArray;
      }

      try {
        await Promise.all(
          fileList?.map(async (file) => {
            const formData = new FormData();
            formData.append("file", file);

            const config = {
              onUploadProgress: (progressEvent: any) => {
                const progress = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                setUploadProgress(progress);
              },
            };

            const response = await axios.post(
              "/api/v1/upload",
              formData,
              config
            );

            if (response.status === 200) {
              response.data.files?.map((file: any) => {
                const fileUrl = file.url;
                fileDataArray.push({
                  url: fileUrl,
                  name: file.name,
                  size: file.size,
                  type: file.type,
                });
              });
            } else {
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
        message.error(
          "An error occurred while uploading the file(s): Please Check your network"
        );
        console.error("An error occurred while uploading the file(s):", error);
        onChange(
          fileList?.map((file) => ({
            url: null,
            name: file.name,
            size: file.size,
            type: file.type,
          }))
        );
      } finally {
        setIsLoading(false);
        setUploadProgress(0);
      }
    } else {
      setFileNames([]);
      onChange([]);
    }
  };

  return (
    <div>
      <div
        className={`relative ${className} bg-[#f0f0f0] w-full min-h-[120px] md:min-h-[150px] rounded-md flex items-center justify-center`}
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
            <div className="flex flex-col">
              <span className="text-center text-[12px] leading-[18px]">
                {uploadProgress < 100 ? (
                  <span>Uploading {uploadProgress.toFixed(2)}%</span>
                ) : (
                  <span>Please wait...</span>
                )}
              </span>
              <BarLoader color="#53a350" />
            </div>
          ) : (
            <span className="flex gap-x-2 items-center justify-center text-[#b4b4b4] text-[14px] leading-[24px]">
              {(defaultValue && defaultValue?.length > 1) ||
              fileNames.length > 1 ? (
                <span className="max-w-[150px] mx-auto text-[12px] text-wrap text-center flex flex-col items-center">
                  {Array.isArray(defaultValue)
                    ? defaultValue?.flat()?.map((value) => `${value.name}, `)
                    : defaultValue || fileNames.join(", ")}
                </span>
              ) : (
                <div>
                  {placeholder ? (
                    <span className="flex gap-x-2 items-center w-full">
                      {placeholder || "Upload files"} <CiImageOn />
                    </span>
                  ) : (
                    <span className="flex gap-x-2 items-center w-full">
                      {"Upload files"} <CiImageOn />
                    </span>
                  )}
                </div>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
