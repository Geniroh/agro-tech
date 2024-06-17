import React, { useState, useEffect } from "react";
import { IoSendSharp } from "react-icons/io5";
import { getRandomColor } from "@/utils/function";
import { ThumbsDown, ThumbsUp } from "lucide-react";

const InnovationCommentCard = ({
  comments,
}: {
  comments: IInnovationComment;
}) => {
  let color = getRandomColor();
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clickedIcon, setClickedIcon] = useState<"like" | "dislike" | null>(
    null
  );

  const handleReaction = async (reaction: "like" | "dislike") => {
    setClickedIcon(reaction);
    setTimeout(() => setClickedIcon(null), 500);
    // if (innovationId) {
    //   try {
    //     const { data } = await axios.post<IInnovationType>(
    //       `/api/v1/innovation/reactions/${innovationId}`,
    //       { reaction }
    //     );
    //     toast.success(`${reaction}d ${data.productName}`);
    //     fetchReactions();
    //     console.log(data);
    //   } catch (error) {
    //     setIsError(true);
    //   }
    // }
  };

  //   const fetchReactions = async () => {
  //     setLoading(true);
  //     try {
  //       const { data } = await axios.get(
  //         `/api/v1/innovation/reactions/${innovationId}`
  //       );
  //       setReactions(data);
  //     } catch (error) {
  //       setIsError(true);
  //     }
  //     setLoading(false);
  //   };

  //   useEffect(() => {
  //     fetchReactions();
  //   }, []);
  return (
    <div className="flex justify-between items-end">
      <div>
        <div className="flex items-center gap-x-3 ">
          <div
            className="w-[40px] h-[40px] rounded-full bg-center bg-cover bg-no-repeat flex items-center justify-center"
            style={{ background: color }}
          >
            {comments.username[0]}
          </div>
          <div>
            <h1 className="text-[14px] leading-[20px] font-semibold text-myblack">
              {comments.username}
            </h1>
            <h3 className="text-muted-foreground text-[12px] leading-[20px]">
              {comments.message}
            </h3>
          </div>
        </div>
      </div>

      <div className="flex gap-x-4">
        <button className="flex items-center text-xs">
          <span
            className={`p-2 rounded-full hover:bg-[#f2f2f2] flex justify-center items-center transition-transform ${
              clickedIcon === "like" ? "rotate-icon" : ""
            }`}
            onClick={() => handleReaction("like")}
          >
            <ThumbsUp size={13} />
          </span>
          <span>{comments.likes}</span>
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
          <span>{comments.dislikes}</span>
        </button>

        {/* <button className="flex items-center text-xs">
            <span className="p-2 rounded-full hover:bg-[#f2f2f2] flex justify-center items-center">
              <MessageSquareText size={13} />
            </span>
            <span>{reactions?.totalComments}</span>
          </button> */}
      </div>
    </div>
  );
};

export default InnovationCommentCard;
