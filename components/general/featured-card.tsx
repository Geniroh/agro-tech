import React from "react";
import ReactPlayer from "react-player";
import Link from "next/link";

interface FeaturedCardsProps {
  url: string;
  title: string;
  tags?: React.ReactNode;
  className?: string;
}

export const FeaturedCard = ({
  url,
  title,
  tags,
  className,
}: FeaturedCardsProps) => {
  const extension = url.split(".").pop()?.toLowerCase() || "";

  const imageExtensions = ["jpg", "jpeg", "png", "gif"];
  const videoExtensions = ["mp4", "webm", "ogg"];

  if (imageExtensions.includes(extension)) {
    return (
      <div
        className="w-full h-[264px] md:h-[400px] bg-no-repeat bg-cover bg-center rounded-2xl p-8 relative"
        style={{ backgroundImage: `url(${url})` }}
      >
        <div className="flex flex-col justify-between w-full h-full relative z-20">
          <div>
            <h1 className="font-bold text-[32px] text-white capitalize tracking-tighter">
              {title}
            </h1>
            {tags}
          </div>

          <div>
            <Link
              href={`/innovations`}
              className="bg-mygreen text-white text-[12px] md:text-[16px] px-[10px] md:px-[24px] py-[5px] md:py-[12px] rounded-md hover:bg-white hover:text-mygreen "
            >
              View More
            </Link>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full bg-black/10 rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div
      className={`relative rounded-2xl h-[264px] md:h-[400px] w-full overflow-hidden ${className}`}
    >
      <video width="320" height="240" controls>
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        style={{ borderRadius: "16px", zIndex: 10 }}
        muted={true}
        playing={true}
        loop={true}
        controls={false}
        config={{
          youtube: {
            playerVars: {
              showinfo: 0,
              controls: 0,
              modestbranding: 1,
            },
          },
        }}
      /> */}
      <div className="absolute top-0 left-0 w-full h-full p-8">
        <div className="flex flex-col justify-between w-full h-full relative z-20">
          <div>
            <h1 className="font-bold text-[32px] text-white capitalize tracking-tighter">
              {title}
            </h1>
            {tags}
          </div>

          <div>
            <Link
              href={`/innovations`}
              className="bg-mygreen text-white text-[12px] md:text-[16px] px-[10px] md:px-[24px] py-[5px] md:py-[12px] rounded-md hover:bg-white hover:text-mygreen "
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
