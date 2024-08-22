import React from "react";
import { Divider } from "antd";
import { Navbar2 } from "@/components/general/home-navbar";

const HomeHero = () => {
  return (
    <div className="h-screen w-full relative">
      <div
        className="h-full w-full bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(/images/hero-bg.png)` }}
      >
        <Navbar2 />
        <div className="w-full relative z-10 px-3 md:px-10 h-full container flex items-center justify-center">
          <div>
            <h2 className="text-[26px] leading-[32px] md:text-[38px] md:leading-[48px] lg:text-[48px] lg:leading-[60px] font-extrabold text-center max-w-[1000px] mx-auto text-white relative">
              Sustainable Technologies for Agricultural Value-Chain
              Mechanization in Africa
            </h2>
            <div className="max-w-[700px] mx-auto">
              <Divider
                className="text-white"
                style={{ borderColor: "#ffffff" }}
              >
                <span className="text-white text-[14px] md:text-[20px] leading-[16px] md:leading-[24px] text-wrap md:text-nowrap font-[350]">
                  Your Central Hub for Agricultural Innovation
                </span>
              </Divider>
            </div>
            <p className="text-white max-w-[900px] mx-auto text-[12px] leading-[16px] md:text-[14px] md:leading-[20px] text-center">
              Our platform connects key players in agriculture—farmers,
              processors, suppliers, and researchers—with cutting-edge
              technologies. Easily access, share, and collaborate to enhance
              productivity. Join us in transforming agriculture across Africa!
            </p>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-b from-[#000000]/10 to-[#000000] z-0"></div>
    </div>
  );
};

export default HomeHero;
