"use client";
import { CollectionTable } from "@/components/innovation-collection-table";
import { Navbar } from "@/components/general/navbar";
import { ColorTag } from "@/components/general/color-tags";
import { Footer } from "@/components/general/footer";
import { Button } from "@/components/ui/button";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoMdHelpCircle } from "react-icons/io";
import { Tour } from "antd";
import { useEffect, useRef, useState } from "react";
import type { TourProps } from "antd";
import { FeaturedCard } from "@/components/general/featured-card";
import { useFeaturedPosts } from "@/hooks/useFeaturedPostData";
import { Skeleton } from "@/components/ui/skeleton";
import { HomeTour } from "@/components/tours/home-tour";
import { FeaturedPosts } from "@/components/general/featured-post";

// const data = [
//   jhgjhgjjkk.
//   jhjkljkljklj;l;k.
//   jhgjkhkhljjkjj
// https://www.facebook.com/share/r/PecAWUz94bKV3dyK/
// ]

const settings = {
  dots: false,
  infinite: true,
  speed: 3500,
  slidesToShow: 3,
  autoplay: true,
  autoplaySpeed: 3000,
  cssEase: "linear",
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export default function Home() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  const [open, setOpen] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [featured, setFeatured] = useState<IFeaturedPosts[]>([]);

  const handleGetFeaturedPosts = async (data: IFeaturedPosts[]) => {
    setFeatured(data);
  };

  const { isLoading } = useFeaturedPosts(handleGetFeaturedPosts);

  const [higlightIndex, setHihlightIndex] = useState<number>(0);
  const highlightImages = [
    "/images/bg1.jpg",
    "/images/bg2.jpg",
    "/images/bg3.jpg",
  ];
  // const borderColors = ["#59a930", "#C8F479","#55A42D"];

  const sliderIndexer = () => {
    let currentIndex = 0;
    setInterval(() => {
      currentIndex = (currentIndex + 1) % highlightImages.length;
      setHihlightIndex(currentIndex);
    }, 6000);
  };

  useEffect(() => {
    sliderIndexer();
  }, []);

  const steps: TourProps["steps"] = [
    {
      title: "Sign in",
      description:
        "Sign in to access more innovations, the Discussion forum & the Analytics dashboard.",
      target: () => ref1.current,
    },
    {
      title: "Innovations",
      description: "Click to see more info about this innovation",
      target: () => ref2.current,
    },
    {
      title: "Discussion Forums",
      description: "Exchange ideas with other agro-professionals like you.",
      target: () => ref3.current,
    },
    {
      title: "Analytics",
      description: "See the latest trends on agro-technologies in Africa",
      target: () => ref3.current,
    },
  ];
  return (
    <div>
      <Navbar ref={ref1} ref2={ref3} />
      <main className="container mx-auto">
        <div className="w-full flex items-center">
          <div className="max-w-[700px] mx-auto md:mx-0">
            <h1 className="text-[32px] md:text-[42px] lg:text-[48px] font-jakara font-bold  mt-16 leading-[40px] md:leading-[60px] lg:leading-[66px] text-center md:text-left">
              Sustainable <span className="text-mygreen"> Technologies</span>{" "}
              for Agricultural Value<span className="text-mygreen">-</span>Chain
              Mechanization in Africa
            </h1>
            <h2 className="text-[14px] md:text-[18px] leading-[24px] md:leading-[27px] font-normal text-myblack mt-3 text-center md:text-left">
              Welcome to STAVMiA, the central hub for agricultural innovations
              across Africa! Helping farmers, processors, input suppliers,
              business owners, consultants, and researchers to find valuable
              technologies and methods that suit their needs easily. Our
              platform allows everyone in the agricultural value chain to
              access, share, discuss, and collaborate on technologies, boosting
              agro productivity. Join us in transforming agriculture in Africa!
            </h2>
          </div>

          <div className="hidden w-full md:flex items-center justify-center h-full mt-8 overflow-hidden">
            <div
              className="w-full py-10 bg-center bg-cover bg-no-repeat flex items-center justify-center rotate-[-35deg]"
              style={{ backgroundImage: "url('/images/leaf.png')" }}
            >
              <div
                className="h-[350px] w-[350px] rounded-full border-[7px] border-[#59a930] bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-linear relative rotate-[35deg]"
                style={{
                  backgroundImage: `url(${highlightImages[higlightIndex]})`,
                }}
              ></div>
            </div>
            {/* <div
              className="h-[350px] w-[350px] rounded-full border-[7px] border-mygreen bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-linear relative"
              style={{
                backgroundImage: `url(${highlightImages[higlightIndex]})`,
              }}
            >
             
            </div> */}
          </div>
        </div>

        <div className="mt-[100px]">
          <CollectionTable />
        </div>

        <div className="mt-[100px]">
          <FeaturedPosts />
        </div>

        <Tour open={open} onClose={() => setOpen(false)} steps={steps} />

        {/* <div className="mt-10" ref={ref2}>
          <div className="hidden md:flex flex-wrap items-center gap-3">
            {featured.map((post, i) => (
              <div
                key={i}
                //prettier-ignore
                className={`${
                  (i === 0 || i === 3) ? "w-[calc(60%)]" : "w-[calc(39%)]"
                } flex justify-center h-full px-2 md:px-4`}
              >
                <FeaturedCard
                  key={post.id}
                  url={post.mediaUrl}
                  title={post.title}
                  tags={
                    <div className="flex gap-4">
                      {post.tag.map((t, i) => (
                        <ColorTag key={i} type="blue" name={t} />
                      ))}
                    </div>
                  }
                />
              </div>
            ))}
          </div>
          {isLoading && (
            <div className="hidden md:flex flex-wrap items-center gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton
                  key={i}
                  //prettier-ignore
                  className={`${
                      (i === 0 || i === 3) ? "w-[calc(60%)]" : "w-[calc(39%)]"
                    } flex justify-center h-[350px] px-2 md:px-4`}
                />
              ))}
            </div>
          )}

          <div className="md:hidden">
            <Slider {...settings}>
              {featured.map((post, i) => (
                <div
                  key={i}
                  className="w-full flex justify-center h-full px-2 md:px-4"
                >
                  <FeaturedCard
                    key={post.id}
                    url={post.mediaUrl}
                    title={post.title}
                    tags={
                      <div className="flex gap-4">
                        {post.tag.map((t, i) => (
                          <ColorTag key={i} type="blue" name={t} />
                        ))}
                      </div>
                    }
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div> */}
      </main>

      {/* <Button
        className="flex gap-x-2 fixed top-[90%] right-0 shadow-xl text-[10px] md:text-[14px] mr-5 md:mr-0 bg-mygreen"
        variant="default"
        onClick={() => setShow(true)}
      >
        <IoMdHelpCircle className="text-[18px] text-white" />{" "}
        <span className="text-white">Help</span>
      </Button> */}

      <HomeTour show={show} setShow={setShow} />
      <Button
        className="flex gap-x-2 fixed top-[90%] right-0 shadow-xl text-[10px] md:text-[14px] mr-5 md:mr-0 bg-mygreen"
        variant="default"
        onClick={() => setOpen(true)}
      >
        <IoMdHelpCircle className="text-[18px] text-white" />{" "}
        <span className="text-white">Help</span>
      </Button>
      <Footer />
    </div>
  );
}
