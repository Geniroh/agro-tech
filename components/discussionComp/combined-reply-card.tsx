import React from "react";
import {
  ThumbsUp,
  ThumbsDown,
  MessageSquareText,
  Share,
  Upload,
} from "lucide-react";
import { DateDifference } from "../general/date-diff-calculator";

interface CombinedDiscussionType {
  createdAt: string | Date;
  dislikes: number;
  id: string;
  innovation_id: string;
  likes: number;
  topComment: any;
  updatedAt: string | Date;
  comments?: any[];
  message: string;
  title: string;
  userId: string;
  user?: any;
  replies: any[];
}

interface ReplyCardPros {
  discussion: CombinedDiscussionType;
}

export const CombinedReplyCard = ({
  discussion,
}: {
  discussion: ICombinedDiscussion;
}) => {
  return (
    <div className="py-4 pt-6 border-b">
      {discussion.userId ? (
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
              {/* <span className='text-muted-foreground text-xs'>{}</span> */}
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
      ) : (
        <div className="w-full flex flex-col gap-y-6">
          <div className="flex items-center gap-x-3 ">
            <div
              className="w-[30px] h-[30px] bg-center bg-cover bg-no-repeat"
              style={{ background: "#329632" }}
            ></div>
            <div className="flex flex-wrap gap-x-4 items-center">
              <h1 className="text-lg font-semibold text-myblack">
                {discussion.title}
              </h1>
              <span className="text-muted-foreground text-xs">Hello</span>
            </div>
          </div>

          <div className="text-sm ">{discussion.message}</div>

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
              <span>{discussion?.dislikes}</span>
            </button>

            <button className="flex items-center text-xs">
              <span className="p-2 rounded-full hover:bg-[#f2f2f2] flex justify-center items-center">
                <MessageSquareText size={13} />
              </span>
              <span>{discussion?.comments?.length}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
