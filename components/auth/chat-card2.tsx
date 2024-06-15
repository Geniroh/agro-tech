import { useCurrentUser } from "@/hooks/current-user";
import React from "react";
import { IoSendSharp } from "react-icons/io5";
import { RiFolder2Fill } from "react-icons/ri";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getFirstName } from "@/utils/function";
import Image from "next/image";

export const ChatCard2 = () => {
  const user = useCurrentUser();

  console.log(user);
  return (
    <div className="w-full flex flex-col gap-y-3">
      <div className="flex items-center gap-x-3 ">
        {user?.image ? (
          <Image
            src={user?.image || ""}
            className="rounded-full"
            alt=""
            width={40}
            height={40}
          />
        ) : (
          <Avatar className=" w-[40px] h-[40px]">
            <AvatarImage src={user?.image || ""} alt="profile" />
            <AvatarFallback className="bg-[#9430E3] text-white">
              {getFirstName(user?.name)[0]}
            </AvatarFallback>
          </Avatar>
        )}
        <div>
          <h1 className="text-sm font-semibold text-myblack">{user?.name}</h1>
          {/* <h3 className="text-muted-foreground">caption</h3> */}
        </div>
      </div>
      <div className="bg-myoffwhie py-2 px-6 rounded-3xl w-full flex items-center">
        <input
          className="bg-transparent border-0 outline-none w-full"
          title="Start typing to start a discussion"
        />
        <div className="flex text-[14px] gap-x-2">
          <button className="p-2 flex items-center justify-center rounded-full hover:bg-white border">
            <RiFolder2Fill />
          </button>
          <button className="p-2 flex items-center justify-center rounded-full hover:bg-white border">
            <IoSendSharp />
          </button>
        </div>
      </div>
    </div>
  );
};
