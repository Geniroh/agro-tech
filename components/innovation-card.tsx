import Link from "next/link";
import React from "react";
import { ColorTag } from "./general/color-tags";

interface InnovationCardProps {
  innovation: IInnovationType;
}

const InnovationCard: React.FC<InnovationCardProps> = ({ innovation }) => {
  const mediaUrl = innovation.productMedia[0].url;
  const isVideo = /\.(mp4|webm|ogg)$/.test(mediaUrl); // Check if the media is a video

  return (
    <div className="">
      <Link href={`/innovations/${innovation.id}`}>
        <div
          className={`w-full max-w-[378px] mx-auto h-[230px] md:h-[250px] bg-no-repeat bg-cover bg-center rounded-2xl bg-[#a8cda1] relative`}
        >
          {isVideo ? (
            <video
              className="w-full h-full object-cover rounded-2xl"
              src={mediaUrl}
              // controls
              muted
              autoPlay
              loop
            />
          ) : (
            <div
              className="w-full h-full bg-no-repeat bg-cover bg-center rounded-2xl"
              style={{ backgroundImage: `url(${mediaUrl})` }}
            />
          )}

          <div className="flex flex-col justify-end w-full  absolute top-[80%] left-[10px] max-w-[300px] z-20">
            <div className="flex items-center gap-3 flex-wrap">
              {innovation.productUse.split(",").map((use, i) => (
                <span
                  key={i}
                  className="bg-white text-[12px] leading-[19px] py-[3px] px-[8px] rounded-md text-center"
                >
                  {use}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>

      <div className="mt-5 max-w-[378px] mx-auto">
        <div className="flex items-start justify-between mb-4">
          <Link href={`/innovations/${innovation.id}`}>
            <h1 className="text-[18px] leading-[27px] font-semibold md:underline">
              {innovation.productName}
            </h1>
          </Link>
          <h3 className="text-muted-foreground text-[14px] leading-[24px] text-nowrap">
            Created {innovation.yearInvented}
          </h3>
        </div>
        <div>
          <h2 className="text-[14px]">Value Chain:</h2>
          <div className="flex gap-x-2">
            {innovation.productChain.map((chain, i) => (
              <p key={i}>
                <ColorTag type="green" key={i} name={chain} />
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnovationCard;
