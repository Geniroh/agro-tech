import { useState } from "react";
import Image from "next/image";
import ReactPlayer from "react-player";
import { RenderMedia } from "./render-media";

interface RenderMediaListProps {
  media: Media[];
  featuredClassName?: string;
  showFeatured?: boolean;
  listClassName?: string;
}

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

export const MediaDisplay = ({ media, className }: RenderMediaProps) => {
  const extension = media?.url.split(".").pop()?.toLowerCase() || "";

  const imageExtensions = ["jpg", "jpeg", "png", "gif"];
  const videoExtensions = ["mp4", "webm", "ogg"];

  if (imageExtensions.includes(extension)) {
    return (
      <div
        className={`w-full bg-cover bg-center bg-no-repeat h-[350px] md:h-[450px] lg:h-[600px] `}
        style={{ backgroundImage: `url(${media.url})` }}
      ></div>
    );
  }

  if (videoExtensions.includes(extension)) {
    const videoThumbnail = `${media.url}#t=0.5`;

    return (
      <div className={`relative ${className}`}>
        <ReactPlayer
          url={media.url}
          // light={videoThumbnail}
          playing={true}
          muted={true}
          controls={true}
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

export const RenderMediaList = ({
  media,
  featuredClassName,
  listClassName,
  showFeatured = true,
}: RenderMediaListProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [mediaList, setMediaList] = useState<Media[]>(media);

  console.log(media);
  return (
    <div className="flex flex-col gap-10">
      <div className={featuredClassName}>
        {showFeatured && (
          <div>
            <MediaDisplay media={mediaList[selectedIndex]} />
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mediaList.map((media, i) => (
          <div
            key={media.url}
            className="cursor-pointer"
            onClick={() => setSelectedIndex(i)}
          >
            <RenderMedia media={media} className={listClassName} />
          </div>
        ))}
      </div>
    </div>
  );
};
