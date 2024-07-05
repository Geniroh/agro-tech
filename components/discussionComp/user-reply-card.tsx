import React from "react";
import { DateDifference } from "@/components/general/date-diff-calculator";
import { useRouter } from "next/navigation";
import { ReactionButtons } from "@/components/general/reaction-buttons";
import UserAvatar from "@/components/user-avatar";

export const UserReplyCard = ({
  discussion,
}: {
  discussion: IUserDiscussion;
}) => {
  const router = useRouter();
  return (
    <div className="py-4 pt-6 border-b">
      <div className="w-full flex flex-col gap-y-2">
        <div
          className="flex items-center gap-x-3 cursor-pointer"
          onClick={() => router.push(`/discussion/forum/${discussion.id}`)}
        >
          <UserAvatar email={discussion?.user?.email} />
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
          <ReactionButtons
            dislikes={discussion?.dislikes}
            likes={discussion?.likes}
            replies={discussion?.replies?.length}
            type="userDiscussion"
            showReplyBtn={false}
            id={discussion.id}
          />
        </div>
      </div>
    </div>
  );
};
