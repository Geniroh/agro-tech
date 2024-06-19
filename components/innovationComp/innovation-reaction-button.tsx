// "use client";
// import axios from "axios";
// import { MessageSquareText, ThumbsDown, ThumbsUp } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { ClipLoader } from "react-spinners";
// import { toast } from "sonner";

// export const InnovationReactions = ({
//   innovationId,
// }: {
//   innovationId: string;
// }) => {
//   const [isError, setIsError] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [reactions, setReactions] = useState<IGetInnovationReactions>();

//   const handleReaction = async (reaction: "like" | "dislike") => {
//     if (innovationId) {
//       try {
//         const { data } = await axios.post(
//           `/api/v1/innovation/reactions/${innovationId}`,
//           { reaction }
//         );
//         fetchReactions();
//         console.log(data);
//       } catch (error) {
//         setIsError(true);
//       }
//     }
//   };

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
//   return (
//     <div className="flex gap-x-4">
//       {loading ? (
//         <ClipLoader size={13} />
//       ) : (
//         <>
//           <button className="flex items-center text-xs">
//             <span className="p-2 rounded-full hover:bg-[#f2f2f2] flex justify-center items-center">
//               <ThumbsUp size={13} onClick={() => handleReaction("like")} />
//             </span>
//             <span>{reactions?.totalLikes}</span>
//           </button>

//           <button className="flex items-center text-xs">
//             <span className="p-2 rounded-full hover:bg-[#f2f2f2] flex justify-center items-center">
//               <ThumbsDown size={13} onClick={() => handleReaction("dislike")} />
//             </span>
//             <span>{reactions?.totalDislikes}</span>
//           </button>

//           <button className="flex items-center text-xs">
//             <span className="p-2 rounded-full hover:bg-[#f2f2f2] flex justify-center items-center">
//               <MessageSquareText size={13} />
//             </span>
//             <span>{reactions?.totalComments}</span>
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

"use client";
import axios from "axios";
import { MessageSquareText, ThumbsDown, ThumbsUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

export const InnovationReactions = ({
  innovationId,
}: {
  innovationId: string;
}) => {
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reactions, setReactions] = useState<IGetInnovationReactions>();
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

  const fetchReactions = async () => {
    setLoading(true);
    try {
      // const { data } = await axios.get(
      //   `/api/v1/innovation/reactions/${innovationId}`
      // );
      // setReactions(data);
    } catch (error) {
      setIsError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReactions();
  }, []);

  return (
    <div className="flex gap-x-4">
      {loading ? (
        <ClipLoader size={13} />
      ) : (
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
            <span>{reactions?.totalLikes}</span>
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
            <span>{reactions?.totalDislikes}</span>
          </button>

          <button className="flex items-center text-xs">
            <span className="p-2 rounded-full hover:bg-[#f2f2f2] flex justify-center items-center">
              <MessageSquareText size={13} />
            </span>
            <span>{reactions?.totalComments}</span>
          </button>
        </>
      )}
    </div>
  );
};
