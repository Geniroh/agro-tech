"use client";
import { CollectionTable } from "@/components/innovation-collection-table";
import { Navbar } from "@/components/general/navbar";
import { Footer } from "@/components/general/footer";
import { Button } from "@/components/ui/button";
import { IoMdHelpCircle } from "react-icons/io";
import { useState } from "react";
import { HomeTour } from "@/components/tours/home-tour";
import { FeaturedPosts } from "@/components/general/featured-post";
import { useSetDefaultStates } from "@/hooks/useSetDefault";

export default function Home() {
  const [show, setShow] = useState<boolean>(false);
  useSetDefaultStates();

  return (
    <div>
      <Navbar />
      <main className="container mx-auto">
        <div className="w-full py-16">
          <div className="">
            <h1 className="text-[24px] md:text-[32px] font-jakara font-bold  leading-[32px] md:leading-[42px] text-center md:text-left">
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
        </div>

        <div className="mt-[20px]">
          <CollectionTable />
        </div>

        <div className="mt-[100px]">
          <FeaturedPosts />
        </div>
      </main>

      <Button
        className="flex gap-x-2 fixed top-[90%] right-0 shadow-xl text-[10px] md:text-[14px] mr-5 md:mr-0 bg-mygreen"
        variant="default"
        onClick={() => setShow(true)}
      >
        <IoMdHelpCircle className="text-[18px] text-white" />{" "}
        <span className="text-white">Help</span>
      </Button>

      <HomeTour show={show} setShow={setShow} />
      <Footer />
    </div>
  );
}
