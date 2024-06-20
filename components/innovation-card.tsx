import Link from "next/link";
import React from "react";
import { ColorTag } from "./general/color-tags";

interface InnovationCardProps {
  innovation: IInnovationType;
}

const InnovationCard: React.FC<InnovationCardProps> = ({ innovation }) => {
  return (
    <div>
      <Link href={`/innovation/${innovation.id}`}>
        <div
          className={`w-full max-w-[378px] mx-auto h-[230px] md:h-[250px] bg-no-repeat bg-cover bg-center rounded-2xl p-8 relative ${
            !innovation.productMedia[0].url && "bg-[#a8cda1]"
          }`}
          style={{ backgroundImage: `url(${innovation.productMedia[0].url})` }}
        >
          <div className="flex flex-col justify-end w-full h-full relative z-20">
            <div className="flex items-center gap-3 flex-wrap">
              {innovation.productUse.split(",").map((use, i) => (
                <span
                  key={i}
                  className="bg-white text-[12px] md:text-[14px] leading-[16px] md:leading-[19px] py-[3px] px-[8px] rounded-md text-center"
                >
                  {use}
                </span>
              ))}
            </div>
          </div>

          <div className="absolute top-0 left-0 w-full h-full bg-black/10 rounded-2xl"></div>
        </div>
      </Link>
      <div className="mt-5 max-w-[378px] mx-auto">
        <div className="flex items-center justify-between mb-4">
          <Link href={`/innovation/${innovation.id}`}>
            <h1 className="text-[18px] leading-[27px] font-semibold md:underline">
              {innovation.productName}
            </h1>
          </Link>
          <h3 className="text-muted-foreground text-[16px] leading-[24px]">
            Created {innovation.yearInvented}
          </h3>
        </div>
        <div>
          <h2>Value Chain</h2>
          {innovation.productChain.map((chain, i) => (
            <p key={i}>
              <ColorTag type="purple" key={i} name={chain} />
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InnovationCard;
