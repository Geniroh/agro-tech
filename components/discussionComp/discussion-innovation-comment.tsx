import { getFirstName } from "@/utils/function";
import { Form, Input } from "antd";
import axios from "axios";
import { MessageSquareText, ThumbsDown, ThumbsUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { IoMdArrowDropup, IoMdArrowDropdown, IoMdSend } from "react-icons/io";
import { DateDifference } from "../general/date-diff-calculator";

export const DiscussionInnovationComment = ({
  comment,
  innovationId,
}: {
  comment: IInnovationComment;
  innovationId: string;
}) => {
  const [clickedIcon, setClickedIcon] = useState<"like" | "dislike" | null>(
    null
  );
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const [replies, setReplies] = useState<IInnovationCommentReply[]>([]);
  const [showReplyField, setShowReplyField] = useState<boolean>(false);
  const [newReply, setNewReply] = useState<string>("");

  const [form] = Form.useForm();

  const handleCommentReply = async () => {
    try {
      const values = await form.validateFields();
      const { data } = await axios.post<{ message: string; reply: string }>(
        `/api/v1/innovation/${innovationId}/discussion/reply`,
        { message: values.message, commentId: comment.id }
      );

      setShowReplyField(false);

      console.log({ test2: data });
    } catch (error) {
      console.log(error);
    }
  };

  const handleReaction = (reaction: "like" | "dislike") => {
    try {
      setClickedIcon(reaction);
      setTimeout(() => setClickedIcon(null), 500);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReplies = async () => {
    try {
      const { data } = await axios.get<{
        message: string;
        replies: IInnovationCommentReply[];
      }>(`/api/v1/innovation/${innovationId}/discussion/reply`, {
        params: {
          commentId: comment.id,
        },
      });
      setReplies(data.replies);
      console.log({ test: data });
    } catch (error) {
      console.log(error);
    }

    console.log(comment);
  };

  useEffect(() => {
    fetchReplies();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-3">
            <div className="w-[32px] h-[32px] rounded-full bg-mygreen flex justify-center items-center text-white">
              {getFirstName(comment.username)[0] || ""}
            </div>
            <div>{getFirstName(comment.username) || comment.email}</div>
            {/* <div className="text-muted-foreground">Replied</div> */}
          </div>

          <div className="text-muted-foreground">
            Posted <DateDifference date={comment.createdAt || ""} />
            ago
          </div>
        </div>

        <div>{comment.message}</div>

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
              <span>{comment.likes}</span>
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
              <span>{comment.dislikes}</span>
            </button>

            <button className="flex items-center text-xs">
              <div
                onClick={() => setShowReplyField(true)}
                className="flex items-center gap-1"
              >
                <span className="p-2 rounded-full hover:bg-[#f2f2f2] flex justify-center items-center">
                  <MessageSquareText size={13} />
                </span>
                Reply
              </div>
            </button>
          </>
        </div>
        {showReplyField && (
          <div className="ml-5 md:ml-10">
            <Form form={form}>
              <Form.Item name="message">
                <Input
                  placeholder="Share your thoughts"
                  className="w-full"
                  // variant="f"
                  size="large"
                  onPressEnter={handleCommentReply}
                  suffix={
                    <IoMdSend
                      className="text-mygreen cursor-pointer"
                      onClick={handleCommentReply}
                    />
                  }
                />
              </Form.Item>
            </Form>
          </div>
        )}
        <div></div>

        <div
          className="flex items-center text-[14px] text-mygreen cursor-pointer"
          onClick={() => setShowReplies(!showReplies)}
        >
          {showReplies ? <IoMdArrowDropup /> : <IoMdArrowDropdown />} 2 Replies
        </div>
        <div className="ml-5 md:ml-10"></div>
      </div>
    </div>
  );
};

export const DiscussionInnovationReply = () => {
  const [clickedIcon, setClickedIcon] = useState<"like" | "dislike" | null>(
    null
  );
  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-3">
            <div className="w-[32px] h-[32px] rounded-full bg-mygreen flex justify-center items-center text-white">
              K
            </div>
            <div>Username</div>
            <div className="text-muted-foreground">Replied</div>
          </div>

          <div className="text-muted-foreground">Posted 2 hours ago</div>
        </div>

        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, sint.
        </div>

        <div className="flex gap-x-2 md:gap-x-4">
          <>
            <button className="flex items-center text-xs">
              <span
                className={`p-2 rounded-full hover:bg-[#f2f2f2] flex justify-center items-center transition-transform ${
                  clickedIcon === "like" ? "rotate-icon" : ""
                }`}
                // onClick={() => handleReaction("like")}
              >
                <ThumbsUp size={13} />
              </span>
              <span>0</span>
            </button>

            <button className="flex items-center text-xs">
              <span
                className={`p-2 rounded-full hover:bg-[#f2f2f2] flex justify-center items-center transition-transform ${
                  clickedIcon === "dislike" ? "rotate-icon" : ""
                }`}
                // onClick={() => handleReaction("dislike")}
              >
                <ThumbsDown size={13} />
              </span>
              <span>0</span>
            </button>

            <button className="flex items-center text-xs">
              <div
                // onClick={() => router.push(`/discussion/innovation/${id}`)}
                className="flex items-center gap-1"
              >
                <span className="p-2 rounded-full hover:bg-[#f2f2f2] flex justify-center items-center">
                  <MessageSquareText size={13} />
                </span>
                Reply
              </div>
            </button>
          </>
        </div>

        <div className="flex items-center text-[14px] text-mygreen">
          <IoMdArrowDropup /> 2 Replies
        </div>
      </div>
    </div>
  );
};
