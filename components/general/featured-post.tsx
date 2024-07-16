"use client";
import React, { useState } from "react";
import { useFeaturedPosts } from "@/hooks/useFeaturedPostData";
import Autoplay from "embla-carousel-autoplay";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import ReactPlayer from "react-player";
import { FeaturedCardSkeleton } from "@/components/skeletons/featured-card-skeleton";
import { ColorTag } from "@/components/general/color-tags";
import { useAppContext } from "@/context/AppContext";

const FeaturedPostsCard = ({ post }: { post: IFeaturedPosts }) => {
  const [open, setOpen] = useState<boolean>(false);
  const extension = post?.mediaUrl?.split(".").pop()?.toLowerCase() || "";

  const imageExtensions = ["jpg", "jpeg", "png", "gif"];
  const videoExtensions = ["mp4", "webm", "ogg"];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div>
          <div
            className=" w-full h-[200px] md:h-[300px] rounded-md bg-cover bg-no-repeat bg-center cursor-pointer mb-2"
            style={{
              backgroundImage: `url(${post?.thumbnailImage || post?.mediaUrl})`,
              // marginInline: "10px",
            }}
          ></div>
          <div className="px-4 space-y-3">
            <div>{post.title}</div>
            <div className="flex gap-1 items-center text-wrap">
              {post.tag.map((tag, i) => (
                <ColorTag type="purple" name={tag} key={i} />
              ))}
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[300px] md:max-w-[700px] max-h-[700px] mx-auto">
        <DialogHeader>
          <DialogTitle className="font-playfair text-[14px] md:text-[24px] leading-[20px] md:leading-[36px]">
            {post?.title}
          </DialogTitle>
          <DialogDescription>
            <div className="flex gap-1 items-center text-wrap mb-5">
              {post.tag.map((tag, i) => (
                <ColorTag type="purple" name={tag} key={i} />
              ))}
            </div>
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
  const { featuredPosts } = useAppContext();
  const [featured, setFeatured] = useState<IFeaturedPosts[]>(featuredPosts);
  const handleGetFeaturedPosts = async (data: IFeaturedPosts[]) => {
    setFeatured(data);
  };

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const { isLoading } = useFeaturedPosts(handleGetFeaturedPosts);

  if (isLoading && featuredPosts.length < 1) {
    return <FeaturedCardSkeleton />;
  }

  return (
    <main>
      <div className="mb-10">
        <h1 className="w-full font-jakara text-[24px] md:text-2xl font-bold text-left mb-10 leading-[32px]">
          Featured Posts
        </h1>
        <div className="px-10">
          <Carousel
            className="w-full"
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="-ml-1">
              {featured.map((post) => (
                <CarouselItem
                  key={post.id}
                  className="pl-1 sm:basis-1/2 lg:basis-1/4"
                >
                  <div className="p-1">
                    <FeaturedPostsCard post={post} key={post.id} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </main>
  );
};
