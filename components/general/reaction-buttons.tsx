"use client";
import axios from "axios";
import { MessageSquareText, ThumbsDown, ThumbsUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

interface ReactionButtonProps {
  likes: number;
  dislikes: number;
  replies: number;
  type: "innovation" | "discussion" | "comment";
}

export const ReactionButtons = ({
  likes,
  dislikes,
  replies,
  type,
}: ReactionButtonProps) => {
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clickedIcon, setClickedIcon] = useState<"like" | "dislike" | null>(
    null
  );

  const handleReaction = (reaction: "like" | "dislike") => {
    try {
      setClickedIcon(reaction);
      setTimeout(() => setClickedIcon(null), 500);
    } catch (error) {}
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
          <span>{likes}</span>
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
          <span>{dislikes}</span>
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
