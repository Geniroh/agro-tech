import React from "react";
import { DateDifference } from "@/components/general/date-diff-calculator";
import { ReactionButtons } from "@/components/general/reaction-buttons";
import Link from "next/link";

export const CombinedReplyCard = ({
  discussion,
}: {
  discussion: ICombinedDiscussion;
}) => {
  return (
    <div className="py-4 pt-6 border-b">
      {discussion.userId ? (
        <div className="w-full flex flex-col gap-y-2">
          <Link href={`/discussion/forum/${discussion?.id}`}>
            <div className="flex items-center gap-x-3 cursor-pointer">
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
          </Link>

          <div className="text-sm ">{discussion?.message}</div>

          <div className="flex gap-x-4">
            <ReactionButtons
              dislikes={discussion.dislikes}
              likes={discussion.likes}
              id={discussion.id}
              type="userDiscussion"
              key={discussion.id}
              replies={discussion?.replies?.length}
            />
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-y-6 cursor-pointer">
          <Link href={`/discussion/innovation/${discussion?.innovation_id}`}>
            <div className="flex items-center gap-x-3 ">
              <div
                className="w-[30px] h-[30px] bg-center bg-cover bg-no-repeat rounded-sm"
                style={{ background: "#329632" }}
              ></div>
              <div className="flex flex-wrap gap-x-4 items-center">
                <h1 className="text-lg font-semibold text-myblack">
                  {discussion.Innovation?.productName}
                </h1>
                <h1 className="text-[14px] leading-[20px] font-semibold text-muted-foreground">
                  <DateDifference date={discussion.createdAt} />
                </h1>
                <span className="text-muted-foreground text-xs">
                  {discussion.title}
                </span>
              </div>
            </div>
          </Link>

          <div className="text-sm ">{discussion.message}</div>

          <div className="flex gap-x-4">
            <ReactionButtons
              dislikes={discussion?.Innovation?.likes || discussion?.dislikes}
              replies={discussion?.comments?.length}
              likes={discussion?.Innovation?.dislikes || discussion?.likes}
              id={discussion?.innovation_id}
              type="innovation"
            />
          </div>
        </div>
      )}
    </div>
  );
};
