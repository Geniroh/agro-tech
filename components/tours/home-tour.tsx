"use client";
import React, { useRef, useState, useEffect } from "react";
import { Tour } from "antd";
import type { TourProps } from "antd";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaUser } from "react-icons/fa";
import { LoginButton } from "@/components/auth/login-button";
import { RegisterButton } from "@/components/auth/register-button";
import { LayoutGrid, List, Menu } from "lucide-react";
// import { CollectionTable } from "@/components/innovation-collection-table";
import { FeaturedPosts } from "@/components/general/featured-post";
import { IoIosSearch } from "react-icons/io";
import { TagSelect } from "../general/tag-select";
import { innovationMock } from "@/mocks/innovationMock";
// import InnovationCard from "../innovation-card";
import { ColorTag } from "../general/color-tags";

export const HomeTour = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: (value: boolean) => void;
}) => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  const steps: TourProps["steps"] = [
    {
      title: "Sign in",
      description:
        "Sign in to access more innovations, the Discussion forum & the Analytics dashboard.",
      target: () => ref1.current,
    },
    {
      title: "Innovations",
      description: "Click an innovation to see more info about it",
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
      target: () => ref4.current,
    },
  ];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth <= 900);

      const handleResize = () => {
        setIsMobile(window.innerWidth <= 900);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
  return (
    <>
      {show && (
        <div className="fixed top-0 left-0 w-screen h-full z-50 bg-white overflow-auto">
          <div>
            <div className="border-b shadow-sm border-b-white relative md:sticky top-0 bg-white z-40 px-5">
              <nav className="w-full h-[70px] grid grid-cols-3 items-center max-w-[1200px] mx-auto">
                <div className="flex items-center gap-3">
                  <Button variant="outline" className="lg:hidden">
                    <Menu />
                  </Button>
                  <div>
                    <div className="px-3 py-2 text-[28px] font-black-ops w-fit rounded-lg tracking-wider text-mygreen">
                      STAVMiA
                    </div>
                  </div>
                </div>

                <div>
                  <div className="hidden lg:flex gap-6 text-[16px] justify-center">
                    <Link
                      href="/"
                      className={"text-mygreen font-open-sans font-semibold"}
                    >
                      Home
                    </Link>
                    <Link
                      href="/"
                      className={
                        "text-mygray hover:text-mygreen font-open-sans font-semibold"
                      }
                      ref={!isMobile ? ref3 : null}
                    >
                      Discussion
                    </Link>
                    <Link
                      href="/"
                      className={
                        "text-mygray hover:text-mygreen font-open-sans font-semibold"
                      }
                      ref={!isMobile ? ref4 : null}
                    >
                      Analytics
                    </Link>
                  </div>
                </div>

                <div className="flex justify-end items-center">
                  <div className="flex gap-x-3">
                    <div
                      className="flex items-center gap-3"
                      ref={!isMobile ? ref1 : null}
                    >
                      <LoginButton>
                        <Button variant="outline" className="hidden md:flex">
                          Sign In
                        </Button>
                        <Button className="bg-mygreen md:hidden">
                          Sign In
                        </Button>
                      </LoginButton>
                      <RegisterButton>
                        <Button className="hidden md:flex gap-x-2 bg-mygreen">
                          Create an account <FaUser />
                        </Button>
                      </RegisterButton>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>

          <div>
            <main className="container mx-auto">
              <div className="w-full py-16">
                <div className="">
                  <h1 className="text-[24px] md:text-[32px] font-jakara font-bold  leading-[32px] md:leading-[42px] text-center md:text-left">
                    Sustainable{" "}
                    <span className="text-mygreen"> Technologies</span> for
                    Agricultural Value<span className="text-mygreen">-</span>
                    Chain Mechanization in Africa
                  </h1>

                  <h2 className="text-[14px] md:text-[18px] leading-[24px] md:leading-[27px] font-normal text-myblack mt-3 text-center md:text-left">
                    Welcome to STAVMiA, the central hub for agricultural
                    innovations across Africa! Helping farmers, processors,
                    input suppliers, business owners, consultants, and
                    researchers to find valuable technologies and methods that
                    suit their needs easily. Our platform allows everyone in the
                    agricultural value chain to access, share, discuss, and
                    collaborate on technologies, boosting agro productivity.
                    Join us in transforming agriculture in Africa!
                  </h2>
                </div>
              </div>

              <div className="flex flex-col justify-center items-center md:hidden">
                <div className="w-1 h-1" ref={isMobile ? ref1 : null}></div>
                <div className="w-1 h-1" ref={isMobile ? ref2 : null}></div>
                <div className="w-1 h-1" ref={isMobile ? ref3 : null}></div>
                <div className="w-1 h-1" ref={isMobile ? ref4 : null}></div>
              </div>

              {/* <div className="mt-[20px]" ref={!isMobile ? ref2 : null}>
                <CollectionTable />
              </div> */}

              <div className="mt-[20px]">
                <div>
                  <div className="w-full">
                    <h1 className="w-full font-jakara text-[24px] md:text-2xl font-bold text-center mb-10 leading-[32px]">
                      Collections
                    </h1>
                    <div className="flex flex-col md:flex-row gap-y-4 w-full items-center space-x-4 mb-10">
                      <div className="w-full py-2 px-6 rounded-xl flex gap-x-3 items-center bg-[#fafafa]">
                        <IoIosSearch />
                        <input
                          type="text"
                          className="border-0 outline-none bg-transparent w-full placeholder:text-[#888888]"
                          placeholder="Search by title ..."
                        />
                      </div>
                      <Button type="submit" className="px-6 bg-mygreen">
                        Click here to search
                      </Button>
                    </div>
                    <div className="mb-5 flex flex-col gap-4 md:flex-row justify-between items-center">
                      <div className="flex gap-x-3 md:gap-x-7 flex-wrap gap-y-4 justify-between md:justify-normal">
                        <TagSelect
                          name="Implementation phase"
                          optionsName="All"
                          options={[]}
                        />
                        <TagSelect
                          name="Year created"
                          optionsName="All"
                          options={[]}
                        />
                        <TagSelect
                          name="Country"
                          optionsName="All"
                          options={[]}
                        />
                        <TagSelect
                          name="Value Chain"
                          optionsName="All"
                          options={[]}
                        />
                      </div>

                      <div className="flex gap-x-2 justify-end w-full md:w-fit">
                        <Button variant={"default"} className={"bg-mygreen"}>
                          <LayoutGrid size={16} />
                        </Button>
                        <Button variant={"outline"} className={"bg-mygreen"}>
                          <List size={16} />
                        </Button>
                      </div>
                    </div>

                    <div className="mt-10">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                        {innovationMock.map((innovation, i) => (
                          <div key={i} ref={i == 1 && !isMobile ? ref2 : null}>
                            <Link href="">
                              <div
                                className={`w-full max-w-[378px] mx-auto h-[230px] md:h-[250px] bg-no-repeat bg-cover bg-center rounded-2xl p-8 relative bg-[#a8cda1]`}
                                style={{
                                  backgroundImage: `url(${innovation.productMedia[0].url})`,
                                }}
                              >
                                <div className="flex flex-col justify-end w-full h-full relative z-20">
                                  <div className="flex items-center gap-3 flex-wrap">
                                    {innovation.productUse
                                      .split(",")
                                      .map((use, i) => (
                                        <span
                                          key={i}
                                          className="bg-white text-[12px] md:text-[14px] leading-[16px] md:leading-[19px] py-[3px] px-[8px] rounded-md text-center"
                                        >
                                          {use}
                                        </span>
                                      ))}
                                  </div>
                                </div>

                                <div className="absolute top-0 left-0 w-full h-full bg-black/10 rounded-2xl"></div>
                              </div>
                            </Link>
                            <div className="mt-5 max-w-[378px] mx-auto">
                              <div className="flex items-start justify-between mb-4">
                                <Link href={`/innovation/${innovation.id}`}>
                                  <h1 className="text-[18px] leading-[27px] font-semibold md:underline">
                                    {innovation.productName}
                                  </h1>
                                </Link>
                                <h3 className="text-muted-foreground text-[14px] leading-[24px] text-nowrap">
                                  Created {innovation.yearInvented}
                                </h3>
                              </div>
                              <div>
                                <h2 className="text-[14px]">Value Chain:</h2>
                                <div className="flex gap-x-2">
                                  {innovation.productChain.map((chain, i) => (
                                    <p key={i}>
                                      <ColorTag
                                        type="green"
                                        key={i}
                                        name={chain}
                                      />
                                    </p>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-[100px]">
                <FeaturedPosts />
              </div>
            </main>
          </div>
          <Tour
            open={show}
            onClose={() => setShow(false)}
            steps={steps}
            arrow={!isMobile}
          />
        </div>
      )}
    </>
  );
};
