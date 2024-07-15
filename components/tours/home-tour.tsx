"use client";
import React, { useRef, useState, useEffect } from "react";
import { Tour } from "antd";
import type { TourProps } from "antd";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaUser } from "react-icons/fa";
import { LoginButton } from "@/components/auth/login-button";
import { RegisterButton } from "@/components/auth/register-button";
import { Menu } from "lucide-react";
import { CollectionTable } from "@/components/innovation-collection-table";
import { FeaturedPosts } from "@/components/general/featured-post";

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
      target: () => ref4.current,
    },
  ];

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
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

          <div className="flex flex-col justify-center items-center md:hidden">
            <div className="w-1 h-1" ref={isMobile ? ref1 : null}></div>
            <div className="w-1 h-1" ref={isMobile ? ref2 : null}></div>
            <div className="w-1 h-1" ref={isMobile ? ref3 : null}></div>
            <div className="w-1 h-1" ref={isMobile ? ref4 : null}></div>
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

              <div className="mt-[20px]" ref={!isMobile ? ref2 : null}>
                <CollectionTable />
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
