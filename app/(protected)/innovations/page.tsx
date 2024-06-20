import { CollectionTable } from "@/components/innovation-collection-table";
import Image from "next/image";
import React from "react";

const InnovationPage = () => {
  return (
    <main className="container">
      <div
        className="mt-10 w-full h-[200px] md:h-[300px] max-w-[1200px] mx-auto bg-center bg-cover bg-no-repeat relative flex justify-center items-center"
        style={{ backgroundImage: "url('/images/agro-people-bg.png')" }}
      >
        <div className="absolute top-0 left-0 bg-black/60 h-full w-full"></div>

        <div className="max-w-[700px] mx-auto flex flex-col gap-y-10 items-center justify-center relative">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-x-6">
            <Image
              alt="Innovation page"
              src="/images/logo-white.png"
              width={200}
              height={200}
              className="w-[80px]"
            />
            <h1 className="font-black-ops text-[24px] md:text-[36px] text-white">
              Welcome to STAVMiA
            </h1>
          </div>
          <p className="text-center text-[12px] leading-[20px] text-muted hidden md:block">
            {` your go-to source for agricultural innovations across Africa! Here,
            you'll find a wealth of information on useful technologies and
            methods that can help you, whether you're a farmer, processor, input
            supplier, business owner, consultant, or researcher. Our platform is
            designed for everyone in the agricultural value chain to access,
            share, discuss, and collaborate on technologies that improve
            operations and boost productivity. No matter your role or level of
            expertise, STAVMiA has something valuable to offer you. Join us in
            transforming agriculture in Africa! `}
          </p>
        </div>
      </div>

      <div className="mt-[100px] pb-[120px]">
        <CollectionTable />
      </div>
    </main>
  );
};

export default InnovationPage;
