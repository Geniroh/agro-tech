import React from "react";

export const FeaturedCardSkeleton = () => {
  return (
    <main>
      <div className="mb-10">
        <h1 className="w-full font-jakara text-[24px] md:text-2xl font-bold text-left mb-10 leading-[32px]">
          Featured Posts
        </h1>

        <div className=" space-x-4">
          {/* <Slider {...settings}>
      <div
          className="w-[350px] h-[300px] rounded-md bg-cover bg-no-repeat bg-center mr-3 cursor-pointer mx-3"
          style={{
            backgroundImage: `url(${post?.thumbnailImage || post?.mediaUrl})`,
          }}
        ></div>
      </Slider> */}
        </div>
      </div>
    </main>
  );
};
