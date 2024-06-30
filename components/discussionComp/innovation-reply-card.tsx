import React from "react";
import { DateDifference } from "../general/date-diff-calculator";
import { useRouter } from "next/navigation";
import { ReactionButtons } from "../general/reaction-buttons";

export const InnovationReplyCard = ({
  discussion,
}: {
  discussion: IInnovationDiscussion;
}) => {
  const router = useRouter();

  return (
    <div className="py-4 pt-6 border-b">
      <div
        className="w-full flex flex-col gap-y-6 cursor-pointer"
        onClick={() =>
          router.push(`/discussion/innovation/${discussion.innovation_id}`)
        }
      >
        <div className="flex items-center gap-x-3 ">
          <div
            className="w-[30px] h-[30px] bg-center bg-cover bg-no-repeat rounded-sm"
            style={{ background: "#329632" }}
          ></div>
          <div
            className="flex flex-wrap gap-x-4 items-center cursor-pointer"
            onClick={() =>
              router.push(`/discussion/innovation/${discussion.innovation_id}`)
            }
          >
            <h1 className="text-lg font-semibold text-myblack">
              {discussion?.Innovation?.productName}
            </h1>
            <h1 className="text-[14px] leading-[20px] font-semibold text-muted-foreground">
              <DateDifference date={discussion.createdAt} />
            </h1>
          </div>
        </div>

        {/* <div className="text-sm ">{discussion?.comments[0]?.message}</div> */}

        <div className="flex gap-x-4">
          <ReactionButtons
            dislikes={discussion.Innovation?.dislikes || discussion.likes}
            likes={discussion.Innovation?.likes || discussion.likes}
            type="innovation"
            id={discussion.innovation_id}
            replies={discussion?.comments?.length}
          />
        </div>
      </div>
    </div>
  );
};
