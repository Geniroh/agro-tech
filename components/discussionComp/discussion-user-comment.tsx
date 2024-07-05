import { getFirstName } from "@/utils/function";
import React, { useState } from "react";
import { DateDifference } from "../general/date-diff-calculator";
import { ReactionButtons } from "../general/reaction-buttons";
import UserAvatar from "@/components/user-avatar";

export const DiscussionUserReply = ({
  reply,
  discussionId,
}: {
  reply: IUserDiscussionReply;
  discussionId: string;
}) => {
  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-3">
            <UserAvatar email={reply?.user?.email || ""} />
            {/* <div className="w-[32px] h-[32px] rounded-full bg-mygreen flex justify-center items-center text-white">
              {getFirstName(reply.user?.name || reply?.user?.email)[0]}
            </div> */}
            <div>{reply?.user?.name || reply?.user?.email}</div>
            <div className="text-muted-foreground text-[14px]">Replied</div>
          </div>

          <div className="text-muted-foreground text-[14px] flex items-center gap-x-2">
            Posted <DateDifference date={reply.createdAt || ""} />
          </div>
        </div>

        <div>{reply.message}</div>

        <div className="flex gap-x-2 md:gap-x-4">
          <>
            <ReactionButtons
              dislikes={reply.dislikes}
              id={discussionId}
              likes={reply.likes}
              type="userDiscussionReply"
              replies={0}
              isReplyId={reply.id}
              showReplyBtn={false}
            />
          </>
        </div>
      </div>
    </div>
  );
};
