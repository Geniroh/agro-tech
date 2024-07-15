"use client";
import React, { useState } from "react";
import { useFeaturedPosts } from "@/hooks/useFeaturedPostData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
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
  slidesToScroll: 1,
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

const FeaturedPostsCard = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="max-w-[150px] h-[225px] rounded-md bg-mygreen mr-3"></div>
      </DialogTrigger>
      <DialogContent className="max-w-[300px] md:max-w-[700px] max-h-[700px] mx-auto">
        <DialogHeader>
          <DialogTitle className="font-playfair text-[14px] md:text-[24px] leading-[20px] md:leading-[36px] text-[#888888]">
            Create A Discussion
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-y-4">Hello WOrld</div>
      </DialogContent>
    </Dialog>
  );
};

export const FeaturedPosts = () => {
  const [featured, setFeatured] = useState<IFeaturedPosts[]>([]);
  const handleGetFeaturedPosts = async (data: IFeaturedPosts[]) => {
    setFeatured(data);
  };

  const { isLoading, data } = useFeaturedPosts(handleGetFeaturedPosts);

  console.log(data);

  return (
    <main>
      <div>
        <h1 className="w-full font-jakara text-3xl font-bold mb-10 leading-[40px]">
          Featured Posts
        </h1>
        {/* <div className=" space-x-2">
          <Slider {...settings}>
            <FeaturedPostsCard />
            <div className="w-[200px] h-[300px] rounded-md bg-mygreen mr-3"></div>
          </Slider>
        </div> */}
      </div>
    </main>
  );
};
