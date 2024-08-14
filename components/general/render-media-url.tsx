import React from "react";
import Image from "next/image";
import ReactPlayer from "react-player";

export const RenderMediaUrl = ({
  url,
  className,
}: {
  url: string;
  className?: string;
}) => {
  const extension = url.split(".").pop()?.toLowerCase() || "";

  const imageExtensions = ["jpg", "jpeg", "png", "gif"];
  const videoExtensions = ["mp4", "webm", "ogg"];

  if (imageExtensions.includes(extension)) {
    return (
      <Image
        src={url}
        alt={"image"}
        width={200}
        height={200}
        className={className}
      />
    );
  }

  if (videoExtensions.includes(extension)) {
    const videoThumbnail = `${url}#t=0.5`;

    return (
      <div className={`relative ${className}`}>
        <ReactPlayer
          url={url}
          // light={videoThumbnail}
          controls={true}
          playing={true}
          muted={true}
          width="100%"
          height="100%"
        />
      </div>
    );
  }

  return (
    <div className="text-center text-muted-foreground h-[100px] flex justify-center items-center">
      --- No data ----
    </div>
  );
};
