import { getFirstName } from "@/utils/function";
import { Form, Input, message } from "antd";
import React, { useState } from "react";
import { IoMdArrowDropup, IoMdArrowDropdown, IoMdSend } from "react-icons/io";
import { DateDifference } from "../general/date-diff-calculator";
import { useFetchInnovationReplies } from "@/hooks/useRepliesData";
import { useAddDiscussionReply } from "@/hooks/useAddComment";
import { ReactionButtons } from "../general/reaction-buttons";

export const DiscussionInnovationComment = ({
  comment,
  innovationId,
}: {
  comment: IInnovationComment;
  innovationId: string;
}) => {
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const [replies, setReplies] = useState<IInnovationCommentReply[]>([]);
  const [showReplyField, setShowReplyField] = useState<boolean>(false);

  const [form] = Form.useForm();

  const handleCommentReply = async () => {
    try {
      const values = await form.validateFields();
      addReply(
        {
          commentId: comment.id,
          innovationId,
          message: values.message,
        },
        {
          onSuccess: (data) => {
            setShowReplyField(false);
            setReplies((prev) => [...prev, data.reply]);
            message.info("Commented");
            form.resetFields();
          },
          onError: (error) => {
            message.error("Network error");
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetReplySuccess = (data: IGetInnovationDisussionReplies) =>
    setReplies(data.replies);

  const { isLoading } = useFetchInnovationReplies(
    innovationId,
    comment.id,
    handleGetReplySuccess
  );
  const { mutate: addReply } = useAddDiscussionReply();

  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="flex items-center gap-3">
            <div className="w-[32px] h-[32px] rounded-full bg-mygreen flex justify-center items-center text-white">
              {getFirstName(comment.username)[0] || ""}
            </div>
            <div>{comment.username || comment.email}</div>
          </div>

          <div className="text-muted-foreground text-[14px] flex items-center gap-x-2">
            Posted <DateDifference date={comment.createdAt || ""} />
          </div>
        </div>

        <div>{comment.message}</div>

        <div className="flex gap-x-2 md:gap-x-2 items-center">
          <ReactionButtons
            dislikes={comment.dislikes}
            id={innovationId}
            likes={comment.likes}
            type="innovationDiscussion"
            isCommentId={comment.id}
            key={comment.id}
            replies={replies.length}
            showReplyBtn={false}
          />
          <span
            className="text-xs cursor-pointer"
            onClick={() => setShowReplyField(!showReplyField)}
          >
            Reply
          </span>
        </div>
        {showReplyField && (
          <div className="ml-5 md:ml-10">
            <Form form={form}>
              <Form.Item name="message">
                <Input
                  placeholder="Share your thoughts"
                  className="w-full my-0 py-0"
                  size="middle"
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
          className="flex items-center text-[14px] text-mygreen cursor-pointer mt-[-10px]"
          onClick={() => setShowReplies(!showReplies)}
        >
          {showReplies ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}{" "}
          {replies.length} Replies
        </div>
        <div className="ml-5 md:ml-10 space-y-4">
          {showReplies && (
            <>
              {replies.map((reply, i) => (
                <DiscussionInnovationReply
                  reply={reply}
                  innovationId={innovationId}
                  key={reply.id}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const DiscussionInnovationReply = ({
  reply,
  innovationId,
}: {
  reply: IInnovationCommentReply;
  innovationId: string;
}) => {
  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-3">
            <div className="w-[32px] h-[32px] rounded-full bg-mygreen flex justify-center items-center text-white">
              {getFirstName(reply?.User?.name || "")[0] || "I"}
            </div>
            <div>{reply?.User?.name || reply?.User?.email}</div>
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
              id={innovationId}
              likes={reply.likes}
              type="innovationDiscussionReply"
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
