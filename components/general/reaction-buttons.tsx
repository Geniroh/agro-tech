"use client";
import { useAppContext } from "@/context/AppContext";
import { InnovationComment } from "@prisma/client";
import { message } from "antd";
import axios from "axios";
import { MessageSquareText, ThumbsDown, ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ReactionButtonProps {
  likes: number;
  dislikes: number;
  replies: number;
  type: "innovation" | "discussion" | "comment";
  id: string;
  isCommentId?: string;
}

export const ReactionButtons = ({
  likes,
  dislikes,
  replies,
  type,
  id,
  isCommentId,
}: ReactionButtonProps) => {
  const [myLikes, setMyLikes] = useState<number>(likes);
  const [myDisLikes, setMyDisLikes] = useState<number>(dislikes);
  const [myComments, setMyComments] = useState<number>(replies);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clickedIcon, setClickedIcon] = useState<"like" | "dislike" | null>(
    null
  );

  const router = useRouter();

  const { commented, setCommented } = useAppContext();

  const handleReaction = (reaction: "like" | "dislike") => {
    try {
      setClickedIcon(reaction);
      setTimeout(() => setClickedIcon(null), 500);
      if (type === "innovation") {
        handleInnovationReaction(reaction);
      }
      if (type === "discussion") {
        handleInnovationDiscussionReaction(reaction);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInnovationReaction = async (reaction: "like" | "dislike") => {
    try {
      const { data } = await axios.post(`/api/v1/innovation/${id}/reactions`, {
        reaction,
        innovation_id: id,
      });
      setMyDisLikes(data.dislikes);
      setMyLikes(data.likes);

      if (reaction == "like") {
        message.success("liked");
      } else {
        message.error("disliked");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInnovationDiscussionReaction = async (
    reaction: "like" | "dislike"
  ) => {
    try {
      const { data } = await axios.post<{
        comment: IInnovationComment;
        message: string;
      }>(`/api/v1/innovation/${id}/discussion/reaction`, {
        commentId: isCommentId,
        reaction,
      });

      setMyDisLikes(data.comment.dislikes);
      setMyLikes(data.comment.likes);
      setCommented(data.message);
      message.info(data.message);
    } catch (error) {
      message.error("Network error");
    }
  };

  const fetchComments = async () => {
    if (type === "innovation") {
      try {
        const { data: comments } = await axios.get<{
          message: string;
          comments: IInnovationComment[];
        }>(`/api/v1/innovation/${id}/discussion`);

        setMyComments(comments.comments.length);
      } catch (error) {}
    }
  };

  useEffect(() => {
    fetchComments();
  }, [commented]);

  return (
    <div className="flex gap-x-2 md:gap-x-4">
      <>
        <button className="flex items-center text-xs">
          <span
            className={`p-2 rounded-full hover:bg-[#f2f2f2] flex justify-center items-center transition-transform ${
              clickedIcon === "like" ? "rotate-icon" : ""
            }`}
            onClick={() => handleReaction("like")}
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
            onClick={() => handleReaction("dislike")}
          >
            <ThumbsDown size={13} />
          </span>
          <span>{myDisLikes}</span>
        </button>

        <button className="flex items-center text-xs">
          {type === "discussion" ? (
            <div
              onClick={() => router.push(`/discussion/innovation/${id}`)}
              className="flex items-center gap-1"
            >
              <span className="p-2 rounded-full hover:bg-[#f2f2f2] flex justify-center items-center">
                <MessageSquareText size={13} />
              </span>{" "}
              Reply
            </div>
          ) : (
            <>
              <span className="p-2 rounded-full hover:bg-[#f2f2f2] flex justify-center items-center">
                <MessageSquareText size={13} />
              </span>
              <span>{myComments}</span>
            </>
          )}
        </button>
      </>
    </div>
  );
};
