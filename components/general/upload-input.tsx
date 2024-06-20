"use client";
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

      if (fileList.length > 7) {
        message.error("Sorry but you cannot upload more than 7 files");
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
            <BarLoader color="#53a350" />
          </span>
        ) : (
          <span className="flex gap-x-2 items-center text-muted-foreground text-[14px] leading-[24px]">
            {Array.isArray(defaultValue)
              ? defaultValue.map((value) => `${value.name}, `)
              : "hgjhgjhg" ||
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
