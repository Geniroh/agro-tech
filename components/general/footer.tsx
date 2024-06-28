import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="w-full bg-mygreen px-10 pt-10 pb-5 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-5 py-10 gap-y-6 gap-x-5">
        <div className="flex flex-col gap-4">
          <div className="bg-white text-mygreen px-[16px] py-[5px] text-[20px] leading-[25px] md:text-[28px] md:leading-[32px] w-fit rounded-[8px] font-black-ops">
            STAVMiA
          </div>
          <div className="text-[16px] leading-[22px] font-semibold space-y-1 font-open-sans md:max-w-[370px]">
            Repository is supported by the Royal Academy of Engineering (RAEng)
            &copy; Afro AgEng (PASAE) 2024
          </div>
        </div>
        <div className="hidden md:block font-open-sans">
          <h1 className="text-[24px] md:text-[28px] leading-[32px] mb-3 font-bold">
            Navigate
          </h1>
          <div className="text-[16px] leading-[22px] font-semibold space-y-1">
            <Link href="/" className="text-white hover:underline">
              <p>Home</p>
            </Link>
            <Link href="/" className="text-white hover:underline">
              <p>Discussion Forum</p>
            </Link>
            <Link href="/" className="text-white hover:underline">
              <p>Analytics</p>
            </Link>
          </div>
        </div>
        <div>
          <h1 className="text-[24px] md:text-[28px] leading-[32px] mb-3 font-bold">
            Contact Us
          </h1>
          <div className="text-[16px] leading-[22px] font-semibold space-y-1">
            <p>E-mail: administrator@pasae.org.za</p>
            <p>Phone Number:071 460 9788</p>
            <p>Mail Address:PO Box 912719</p>
            <p>Address Details: Silverton, Pretoria,South Africa, 0127</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center px-5 gap-y-4">
        <hr className="max-w-[850px] w-full" />
        <div>Developed by Qinsight</div>
      </div>
    </div>
  );
};
