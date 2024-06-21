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

const innovations = [
  {
    id: 1,
    imgUrl: "/images/farm-automation.jpeg",
    title: "Farm Automation",
    tags: ["Self driving tractors", "Smart sprinklers"],
  },
  {
    id: 2,
    imgUrl: "/images/green-house.jpeg",
    title: "Green House",
    tags: ["Self driving tractors", "Smart sprinklers"],
  },
  {
    id: 3,
    imgUrl: "/images/animal-farm.jpeg",
    title: "Farm Automation",
    tags: ["Self driving tractors", "Smart sprinklers"],
  },
  {
    id: 4,
    imgUrl: "/images/plantation.jpeg",
    title: "Farm Automation",
    tags: ["Self driving tractors", "Smart sprinklers"],
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
  return (
    <div>
      <Navbar />
      <main className="container mx-auto">
        <h1 className="text-[24px] md:text-[32px] font-jakara font-bold  mt-14 leading-[32px] md:leading-[42px] text-center md:text-left">
          Sustainable Technologies for Agricultural Value-Chain Mechanization in
          Africa
        </h1>
        <h2 className="text-[16px] md:text-[18px] leading-[24px] md:leading-[27px] font-normal text-[#242424] mt-3 text-center md:text-left">
          Welcome to STAVMiA, the central hub for agricultural innovations
          across Africa! Helping farmers, processors, input suppliers, business
          owners, consultants, and researchers find valuable technologies and
          methods easily. Our platform allows everyone in the agricultural value
          chain to access, share, discuss, and collaborate on technologies,
          boosting agro productivity. Join us in transforming agriculture in
          Africa!
        </h2>

        {/* <div className="mt-10">
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-span-2">
              <ImageCard
                id={1}
                imageUrl="/images/farm-automation.jpeg"
                title="Farm Automation"
                tags={
                  <div className="flex gap-4">
                    {" "}
                    <ColorTag type="blue" name="Self driving tractors" />{" "}
                    <ColorTag type="yellow" name="Smart sprinklers" />
                  </div>
                }
              />
            </div>
            <div>
              <ImageCard
                id={1}
                imageUrl="/images/green-house.jpeg"
                title="Green House"
                tags={
                  <div className="flex gap-4">
                    {" "}
                    <ColorTag type="blue" name="Pest control" />{" "}
                    <ColorTag type="purple" name="Disease control" />
                  </div>
                }
              />
            </div>

            <div>
              <ImageCard
                id={2}
                imageUrl="/images/animal-farm.jpeg"
                title="Green House"
                tags={
                  <div className="flex gap-4">
                    {" "}
                    <ColorTag type="purple" name="Economy" />{" "}
                    <ColorTag type="yellow" name="Dairy processor" />
                  </div>
                }
              />
            </div>

            <div className="col-span-2">
              <ImageCard
                id={3}
                imageUrl="/images/plantation.jpeg"
                title="Green House"
                tags={
                  <div className="flex gap-4">
                    {" "}
                    <ColorTag type="blue" name="Sustainable" />{" "}
                    <ColorTag type="yellow" name="Food security" />
                  </div>
                }
              />
            </div>
          </div>

          <div className="md:hidden">
            <Slider {...settings}>
              {innovations.map((innovation, i) => (
                <div
                  key={i}
                  className="w-full flex justify-center h-full px-2 md:px-4"
                >
                  <ImageCard
                    id={innovation.id}
                    imageUrl={innovation.imgUrl}
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
        </div> */}

        <div className="mt-[100px]">
          <CollectionTable />
        </div>
      </main>
      <Button
        className="flex gap-x-2 fixed top-[90%] right-0 shadow-xl text-[10px] md:text-[14px] mr-5 md:mr-0"
        variant="outline"
      >
        <IoMdHelpCircle className="text-[18px]" /> <span>Help</span>
      </Button>
      <Footer />
    </div>
  );
}
