import React from "react";
import Image from "next/image";

interface Imedia {
  name: string;
  url: string;
}

interface RenderMediaProps {
  media: Imedia;
  className?: string;
}

export const RenderMedia = ({ media, className }: RenderMediaProps) => {
  const extension = media?.url.split(".").pop()?.toLowerCase() || "";

  const imageExtensions = ["jpg", "jpeg", "png", "gif"];
  const videoExtensions = ["mp4", "webm", "ogg"];

  if (imageExtensions.includes(extension)) {
    return (
      <Image
        src={media.url}
        alt={media.name}
        width={200}
        height={200}
        className={` ${className}`}
      />
    );
  }

  if (videoExtensions.includes(extension)) {
    return (
      <video controls width="200" height="200" className={`${className}`}>
        <source src={media.url} type={`video/${extension}`} />
        Your browser does not support the video tag.
      </video>
    );
  }

  return null; // Optionally handle unknown file types
};
