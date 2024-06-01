import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="w-full bg-mygreen px-10 pt-10 pb-5 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-5 py-10">
        <div className="flex flex-col gap-4">
          <div className="bg-white text-mygreen px-[16px] py-[5px] text-[28px] leading-[32px] w-fit rounded-[8px] font-playfair font-bold">
            STAVMiA
          </div>
          <div className="text-[14px] leading-[27px]">
            Repository is supported by the Royal Academy of Engineering (RAEng)
            &Copy; Afro AgEng (PASAE) 2024
          </div>
        </div>
        <div className="hidden md:block">
          <h1 className="text-[28px] leading-[32px] mb-3">Navigate</h1>
          <div className="flex flex-col gap-y-3 text-[14px] leading-[27px]">
            <Link href="/" className="text-white hover:underline">
              Home
            </Link>
            <Link href="/discussion" className="text-white hover:underline">
              Discussion Forum
            </Link>
            <Link href="/analytics" className="text-white hover:underline">
              Analytics
            </Link>
          </div>
        </div>
        <div>
          <h1 className="text-[28px] leading-[32px] mb-3">Contact Us</h1>
          <div className="text-[14px] leading-[27px]">
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
