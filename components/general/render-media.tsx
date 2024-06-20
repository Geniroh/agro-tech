// import React from "react";
// import Image from "next/image";

// interface IMedia {
//   name: string;
//   url: string;
//   type?: string;
//   size?: string;
// }

// interface RenderMediaProps {
//   media: IMedia;
//   className?: string;
// }

// export const RenderMedia = ({ media, className }: RenderMediaProps) => {
//   const extension = media?.url.split(".").pop()?.toLowerCase() || "";

//   const imageExtensions = ["jpg", "jpeg", "png", "gif"];
//   const videoExtensions = ["mp4", "webm", "ogg"];

//   if (imageExtensions.includes(extension)) {
//     return (
//       <Image
//         src={media.url}
//         alt={media.name}
//         width={200}
//         height={200}
//         className={` ${className}`}
//       />
//     );
//   }

//   if (videoExtensions.includes(extension)) {
//     return (
//       <video controls width="200" height="200" className={`${className}`}>
//         <source src={media.url} type={`video/${extension}`} />
//         Your browser does not support the video tag.
//       </video>
//     );
//   }

//   return null;
// };

import React from "react";
import Image from "next/image";
import ReactPlayer from "react-player";

interface IMedia {
  name: string;
  url: string;
  type?: string;
  size?: number;
}

interface RenderMediaProps {
  media: IMedia;
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
        className={className}
      />
    );
  }

  if (videoExtensions.includes(extension)) {
    const videoThumbnail = `${media.url}#t=0.5`; // Attempt to get the video thumbnail

    return (
      <div className={`relative ${className}`}>
        <ReactPlayer
          url={media.url}
          light={videoThumbnail}
          controls
          width="200px"
          height="200px"
        />
      </div>
    );
  }

  return null;
};
