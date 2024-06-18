import React from "react";
import { ThumbsUp, ThumbsDown, MessageSquareText } from "lucide-react";
import { DateDifference } from "@/components/general/date-diff-calculator";

export const UserReplyCard = ({
  discussion,
}: {
  discussion: IUserDiscussion;
}) => {
  return (
    <div className="py-4 pt-6 border-b">
      <div className="w-full flex flex-col gap-y-2">
        <div className="flex items-center gap-x-3 ">
          <div
            className="w-[30px] h-[30px] rounded-full bg-center bg-cover bg-no-repeat"
            style={{ background: "#329632" }}
          ></div>
          <div className="flex flex-wrap gap-x-2 items-center">
            <h1 className="text-[16px] leading-[24px] font-semibold text-myblack">
              {discussion?.user?.name}
            </h1>
            <h1 className="text-[14px] leading-[20px] font-semibold text-myblack">
              {discussion?.title}
            </h1>
            <h1 className="text-[14px] leading-[20px] font-semibold text-muted-foreground">
              <DateDifference date={discussion.createdAt} />
            </h1>
          </div>
        </div>

        <div className="text-sm ">{discussion?.message}</div>

        <div className="flex gap-x-4">
          <button className="flex items-center text-xs">
            <span className="p-2 rounded-full hover:bg-[#f2f2f2] flex justify-center items-center">
              <ThumbsUp size={13} />
            </span>
            <span>{discussion?.likes}</span>
          </button>

          <button className="flex items-center text-xs">
            <span className="p-2 rounded-full hover:bg-[#f2f2f2] flex justify-center items-center">
              <ThumbsDown size={13} />
            </span>
            <span>{discussion?.likes}</span>
          </button>

          <button className="flex items-center text-xs">
            <span className="p-2 rounded-full hover:bg-[#f2f2f2] flex justify-center items-center">
              <MessageSquareText size={13} />
            </span>
            <span>{discussion?.replies?.length}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
