"use client";
import { CollectionTable } from "@/components/innovation-collection-table";
import { Navbar } from "@/components/general/navbar";
import ImageCard from "@/components/general/image-card";
import { ColorTag } from "@/components/general/color-tags";
import { Footer } from "@/components/general/footer";
import { Button } from "@/components/ui/button";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoMdHelpCircle } from "react-icons/io";
import { Tour } from "antd";
import { useRef, useState } from "react";
import type { TourProps } from "antd";
import { FeaturedCard } from "@/components/general/featured-card";

const innovations = [
  {
    id: 1,
    imgUrl: "/images/image2.jpg",
    title: "Cowpea Thresher",
    tags: ["Processing"],
  },
  {
    id: 2,
    imgUrl: "/images/image2.jpg",
    title: "Locally Fabricated Maize Planter",
    tags: ["Production"],
  },
  {
    id: 3,
    imgUrl: "/images/Image3.jpg",
    title: "Yam Pounding Machine",
    tags: ["Processing"],
  },
  {
    id: 4,
    imgUrl: "/images/image4.jpg",
    title: "Circular Maize Dryer",
    tags: ["Processing"],
  },
];

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
        <h1 className="text-[24px] md:text-[32px] font-jakara font-bold  mt-14 leading-[32px] md:leading-[42px] text-center md:text-left">
          Sustainable Technologies for Agricultural Value-Chain Mechanization in
          Africa
        </h1>
        <h2 className="text-[16px] md:text-[18px] leading-[24px] md:leading-[27px] font-normal text-[#242424] mt-3 text-center md:text-left">
          Welcome to STAVMiA, the central hub for agricultural innovations
          across Africa! Helping farmers, processors, input suppliers, business
          owners, consultants, and researchers to find valuable technologies and
          methods that suit their needs easily. Our platform allows everyone in
          the agricultural value chain to access, share, discuss, and
          collaborate on technologies, boosting agro productivity. Join us in
          transforming agriculture in Africa!
        </h2>

        <Tour open={open} onClose={() => setOpen(false)} steps={steps} />

        <div className="mt-10" ref={ref2}>
          <div className="hidden md:flex flex-wrap items-center gap-3">
            {innovations.map((innovation, i) => (
              <div
                key={i}
                //prettier-ignore
                className={`${
                  (i === 0 || i === 3) ? "w-[calc(60%)]" : "w-[calc(39%)]"
                } flex justify-center h-full px-2 md:px-4`}
              >
                <FeaturedCard
                  key={innovation.id}
                  url={innovation.imgUrl}
                  title={innovation.title}
                  tags={
                    <div className="flex gap-4">
                      {innovation.tags.map((tag, i) => (
                        <ColorTag key={i} type="blue" name={tag} />
                      ))}
                    </div>
                  }
                />
              </div>
            ))}
          </div>

          <div className="md:hidden">
            <Slider {...settings}>
              {innovations.map((innovation, i) => (
                <div
                  key={i}
                  className="w-full flex justify-center h-full px-2 md:px-4"
                >
                  <FeaturedCard
                    key={innovation.id}
                    url={innovation.imgUrl}
                    title={innovation.title}
                    tags={
                      <div className="flex gap-4">
                        {innovation.tags.map((tag, i) => (
                          <ColorTag key={i} type="blue" name={tag} />
                        ))}
                      </div>
                    }
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        <div className="mt-[100px]">
          <CollectionTable />
        </div>
      </main>

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
