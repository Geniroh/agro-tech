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
} from "@/components/ui/dialog";
import ReactPlayer from "react-player";

const settings = {
  dots: true,
  arrow: true,
  infinite: true,
  speed: 1000,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 6,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: "10px",
  responsive: [
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        centerPadding: "10px",
        centerMode: true,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        centerPadding: "10px",
        slidesToScroll: 1,
        centerMode: true,
      },
    },
  ],
};

const FeaturedPostsCard = ({ post }: { post: IFeaturedPosts }) => {
  const [open, setOpen] = useState<boolean>(false);
  const extension = post?.mediaUrl?.split(".").pop()?.toLowerCase() || "";

  const imageExtensions = ["jpg", "jpeg", "png", "gif"];
  const videoExtensions = ["mp4", "webm", "ogg"];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className="mx-10 w-[350px] h-[300px] rounded-md bg-cover bg-no-repeat bg-center cursor-pointer"
          style={{
            backgroundImage: `url(${post?.thumbnailImage || post?.mediaUrl})`,
            marginInline: "10px",
          }}
        ></div>
      </DialogTrigger>
      <DialogContent className="max-w-[300px] md:max-w-[700px] max-h-[700px] mx-auto">
        <DialogHeader>
          <DialogTitle className="font-playfair text-[14px] md:text-[24px] leading-[20px] md:leading-[36px]">
            {post?.title}
          </DialogTitle>
          <DialogDescription>
            <div>
              <div className="min-h-[350px]">
                {imageExtensions.includes(extension) ? (
                  <div
                    className="min-h-[350px] w-full bg-cover bg-no-repeat"
                    style={{ backgroundImage: `url(${post.mediaUrl})` }}
                  ></div>
                ) : (
                  <ReactPlayer
                    url={post.mediaUrl}
                    light={post.thumbnailImage}
                    width="100%"
                    height={350}
                  />
                )}
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
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

  return (
    <main>
      <div className="mb-10">
        <h1 className="w-full font-jakara text-[24px] md:text-2xl font-bold text-left mb-10 leading-[32px]">
          Featured Posts
        </h1>

        <div className="slider-container">
          <Slider {...settings}>
            {featured.map((post) => (
              <div key={post.id} style={{ marginInline: "15px" }}>
                <FeaturedPostsCard post={post} key={post.id} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </main>
  );
};
