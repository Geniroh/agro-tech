import Link from "next/link";
import React from "react";

export interface ImageCardProps {
  id: number;
  imageUrl: string;
  title: string;
  tags?: React.ReactNode;
}

const ImageCard = ({ id, imageUrl, title, tags }: ImageCardProps) => {
  return (
    <div
      className="w-full h-[264px] md:h-[370px] bg-no-repeat bg-cover bg-center rounded-2xl p-8 relative"
      style={{ backgroundImage: `url(${imageUrl})` }}
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
            href={`/innovations/${id}`}
            className="bg-white text-mygreen text-[12px] md:text-[16px] px-[10px] md:px-[24px] py-[5px] md:py-[12px] rounded-md hover:bg-mygreen hover:text-white "
          >
            View More
          </Link>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-black/10 rounded-2xl"></div>
    </div>
  );
};

export default ImageCard;
