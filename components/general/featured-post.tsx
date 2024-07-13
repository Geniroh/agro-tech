"use client";
import React, { useState } from "react";
import { useFeaturedPosts } from "@/hooks/useFeaturedPostData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FeaturedCard } from "./featured-card";
import { ColorTag } from "./color-tags";

const settings = {
  dots: false,
  infinite: true,
  speed: 1000,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 6,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  centerMode: true,
  centerPadding: "10px",
  responsive: [
    // {
    //   breakpoint: 1024,
    //   settings: {
    //     slidesToShow: 3,
    //     slidesToScroll: 3,
    //     infinite: true,
    //     dots: true,
    //   },
    // },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        centerPadding: "10px",
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        centerPadding: "10px",
        slidesToScroll: 1,
      },
    },
  ],
};

// const settings = {
//   dots: false,
//   infinite: true,
//   speed: 3500,
//   slidesToShow: 3,
//   autoplay: true,
//   autoplaySpeed: 3000,
//   cssEase: "linear",
//   slidesToScroll: 1,
//   initialSlide: 0,
//   responsive: [
//     {
//       breakpoint: 1024,
//       settings: {
//         slidesToShow: 3,
//         slidesToScroll: 3,
//         infinite: true,
//         dots: true,
//       },
//     },
//     {
//       breakpoint: 900,
//       settings: {
//         slidesToShow: 2,
//         slidesToScroll: 1,
//         initialSlide: 2,
//       },
//     },
//     {
//       breakpoint: 480,
//       settings: {
//         slidesToShow: 1,
//         slidesToScroll: 1,
//       },
//     },
//   ],
// };

export const FeaturedPosts = () => {
  const [featured, setFeatured] = useState<IFeaturedPosts[]>([]);
  const handleGetFeaturedPosts = async (data: IFeaturedPosts[]) => {
    setFeatured(data);
  };

  const { isLoading } = useFeaturedPosts(handleGetFeaturedPosts);

  return (
    <main>
      <div>
        <h1 className="w-full font-jakara text-3xl font-bold mb-10 leading-[40px]">
          Featured Posts
        </h1>
        <div className=" space-x-2">
          {/* <Slider {...settings}>
            {featured.map((post, i) => (
              <div key={i} className="w-[200px] h-[200px] bg-mygreen m-5"></div>
            ))}
          </Slider> */}
          <Slider {...settings}>
            <div className="max-w-[150px] h-[225px] rounded-md bg-mygreen mr-3"></div>
            <div className="max-w-[150px] h-[225px] rounded-md bg-mygreen mr-3"></div>
          </Slider>
        </div>
      </div>
    </main>
  );
};
