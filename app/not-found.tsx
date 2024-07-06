import React from "react";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col items-center">
        <Image
          src="/images/404_animation.gif"
          alt="Not found"
          width={150}
          height={150}
          className="object-contain w-[250px] h-[250px] md:w-[400px] md:h-[350px]"
        />

        <h1 className="text-xl md:text-3xl text-black">
          Oops!!! Page not found
        </h1>
        <Link
          href="/"
          className="text-xl text-mygreen underline hover:text-black"
        >
          Go back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
