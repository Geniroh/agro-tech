"use client";
import { message } from "antd";
import axios from "axios";
import { MessageSquareText, ThumbsDown, ThumbsUp } from "lucide-react";
import React, { useEffect, useState } from "react";

interface ReactionButtonProps {
  likes: number;
  dislikes: number;
  replies: number;
  type: "innovation" | "discussion" | "comment";
  id: string;
}

export const ReactionButtons = ({
  likes,
  dislikes,
  replies,
  type,
  id,
}: ReactionButtonProps) => {
  const [myLikes, setMyLikes] = useState<number>(likes);
  const [myDisLikes, setMyDisLikes] = useState<number>(dislikes);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clickedIcon, setClickedIcon] = useState<"like" | "dislike" | null>(
    null
  );

  const handleReaction = (reaction: "like" | "dislike") => {
    try {
      setClickedIcon(reaction);
      setTimeout(() => setClickedIcon(null), 500);
      if (type === "innovation") {
        handleInnovationReaction(reaction);
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
          <span className="p-2 rounded-full hover:bg-[#f2f2f2] flex justify-center items-center">
            <MessageSquareText size={13} />
          </span>
          <span>{replies}</span>
        </button>
      </>
    </div>
  );
};
