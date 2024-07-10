// import Link from "next/link";
// import React from "react";

// export interface ImageCardProps {
//   id: number;
//   imageUrl: string;
//   title: string;
//   tags?: React.ReactNode;
// }

// const ImageCard = ({ id, imageUrl, title, tags }: ImageCardProps) => {
//   return (
//     <div
//       className="w-full h-[264px] md:h-[370px] bg-no-repeat bg-cover rounded-2xl p-8 relative object-cover"
//       style={{ backgroundImage: `url(${imageUrl})` }}
//     >
//       <div className="flex flex-col justify-between w-full h-full relative z-20">
//         <div>
//           <h1 className="font-bold text-[32px] text-white capitalize tracking-tighter">
//             {title}
//           </h1>
//           {tags}
//         </div>

//         <div>
//           <Link
//             href={`/innovations`}
//             className="bg-white text-mygreen text-[12px] md:text-[16px] px-[10px] md:px-[24px] py-[5px] md:py-[12px] rounded-md hover:bg-mygreen hover:text-white "
//           >
//             View More
//           </Link>
//         </div>
//       </div>

//       <div className="absolute top-0 left-0 w-full h-full bg-black/10 rounded-2xl"></div>
//     </div>
//   );
// };

// export default ImageCard;

import Link from "next/link";
import React from "react";
import ReactPlayer from "react-player";

export interface ImageCardProps {
  id: number;
  imageUrl?: string;
  videoUrl?: string;
  title: string;
  tags?: React.ReactNode;
}

const ImageCard = ({ id, imageUrl, videoUrl, title, tags }: ImageCardProps) => {
  const isVideo = !!videoUrl;

  return (
    <div className="w-full h-[264px] md:h-[370px] rounded-2xl p-8 relative object-cover">
      {isVideo ? (
        <ReactPlayer
          url={videoUrl}
          width="100%"
          height="100%"
          className="rounded-2xl"
          playing={true}
          muted={true}
          // loop={true}
        />
      ) : (
        <div
          className="w-full h-full bg-no-repeat bg-cover rounded-2xl"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
      )}

      <div className="absolute inset-0 flex flex-col justify-between p-8 z-20">
        <div>
          <h1 className="font-bold text-[32px] text-white capitalize tracking-tighter">
            {title}
          </h1>
          {tags}
        </div>
        <div>
          <Link
            href={`/innovations`}
            className="bg-white text-mygreen text-[12px] md:text-[16px] px-[10px] md:px-[24px] py-[5px] md:py-[12px] rounded-md hover:bg-mygreen hover:text-white"
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
