"use client";
import { message } from "antd";
import { MessageSquareText, ThumbsDown, ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useHandleReaction } from "@/hooks/useAddReaction";
import { useFetchInnovationComments } from "@/hooks/useCommentsData";

interface ReactionButtonProps {
  likes: number;
  dislikes: number;
  replies?: number;
  type:
    | "innovation"
    | "userDiscussion"
    | "innovationDiscussion"
    | "innovationDiscussionReply"
    | "userDiscussionReply";
  id: string;
  isCommentId?: string;
  isReplyId?: string;
  showReplyBtn?: boolean;
}

export const ReactionButtons = ({
  likes,
  dislikes,
  replies,
  type,
  id,
  isCommentId,
  isReplyId,
  showReplyBtn = true,
}: ReactionButtonProps) => {
  const [myLikes, setMyLikes] = useState<number>(likes);
  const [myDisLikes, setMyDisLikes] = useState<number>(dislikes);
  const [clickedIcon, setClickedIcon] = useState<"like" | "dislike" | null>(
    null
  );
  const router = useRouter();

  const { mutate: handleReaction } = useHandleReaction();
  const { data: comments, refetch: refetchComments } =
    useFetchInnovationComments(id);

  const onReaction = (reaction: "like" | "dislike") => {
    setClickedIcon(reaction);
    setTimeout(() => setClickedIcon(null), 500);

    handleReaction(
      { id, reaction, type, isCommentId, isReplyId },
      {
        onSuccess: (data) => {
          console.log(data);
          let customMessage = data?.message;
          if (type === "innovationDiscussion") {
            setMyLikes(data.comment.likes);
            setMyDisLikes(data.comment.dislikes);
          } else if (type === "innovationDiscussionReply") {
            setMyLikes(data.replylikes);
            setMyDisLikes(data.reply.dislikes);
          } else {
            setMyLikes(data.likes);
            setMyDisLikes(data.dislikes);
          }

          if (reaction === "like") {
            message.success(customMessage || "liked");
          } else {
            message.info(customMessage || "disliked");
          }
        },
        onError: () => {
          message.error("Network error");
        },
      }
    );
  };

  return (
    <div className="flex gap-x-2 md:gap-x-4">
      <>
        <button className="flex items-center text-xs">
          <span
            className={`p-2 rounded-full hover:bg-[#f2f2f2] flex justify-center items-center transition-transform ${
              clickedIcon === "like" ? "rotate-icon" : ""
            }`}
            onClick={() => onReaction("like")}
          >
            <ThumbsUp size={13} />
          </span>
          <span>{myLikes}</span>
        </button>

        <button className="flex items-center text-xs">
          <span
            className={`p-2 rounded-full hover:bg-[#f2f2f2] flex justify-center items-center transition-transform ${
              clickedIcon === "dislike" ? "rotate-icon" : ""
            }`}
            onClick={() => onReaction("dislike")}
          >
            <ThumbsDown size={13} />
          </span>
          <span>{myDisLikes}</span>
        </button>

        <button className="flex items-center text-xs">
          {!showReplyBtn ? (
            <div className="flex items-center gap-1">
              <span className="p-2 rounded-full hover:bg-[#f2f2f2] flex justify-center items-center">
                <MessageSquareText size={13} />
              </span>{" "}
              {replies}
            </div>
          ) : (
            <>
              {type === "innovationDiscussionReply" ? (
                <></>
              ) : (
                <>
                  <span className="p-2 rounded-full hover:bg-[#f2f2f2] flex justify-center items-center">
                    <MessageSquareText size={13} />
                  </span>
                  <span>{comments?.length || 0}</span>
                </>
              )}
            </>
          )}
        </button>
      </>
    </div>
  );
};
