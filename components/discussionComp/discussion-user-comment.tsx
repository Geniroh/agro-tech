import React, { useState } from "react";
import { DateDifference } from "../general/date-diff-calculator";
// import { ReactionButtons } from "../general/reaction-buttons";
import UserAvatar from "@/components/user-avatar";
import { IoMdArrowDropdown, IoMdArrowDropup, IoMdSend } from "react-icons/io";
import { MessageSquareText } from "lucide-react";
import {
  useGetDiscussionCommentReply,
  useAddDiscussionCommentReply,
} from "@/hooks/useDiscussionData";
import { Form, Input, message } from "antd";
import { ClipLoader } from "react-spinners";
import dayjs from "dayjs";

export const DiscussionUserReply = ({
  reply,
  discussionId,
}: {
  reply: IUserDiscussionReply;
  discussionId: string;
}) => {
  const [showReplyField, setShowReplyField] = useState<boolean>(false);
  const [discussionComment, setDiscussionComment] =
    useState<IUserDiscussionReply>();

  useGetDiscussionCommentReply(
    discussionId,
    reply.id,
    (data: IUserDiscussionReply) => {
      console.log(data);
      setDiscussionComment(data);
    }
  );

  const [form] = Form.useForm();

  const { mutateAsync, isLoading: isLoadingReply } =
    useAddDiscussionCommentReply();

  const handleCommentReply = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      mutateAsync(
        {
          discussionId,
          replyId: reply.id,
          reply: values.reply,
        },
        {
          onSuccess: (data) => {
            console.log(data);
            message.success("Reply added");
            if (data) {
              setDiscussionComment(data);
              form.resetFields();
            }
          },
          onError: (error) => {
            message.error("Could not reply!");
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-3">
            <UserAvatar email={reply?.user?.email || ""} />
            <div>{reply?.user?.name || reply?.user?.email}</div>
            <div className="text-muted-foreground text-[14px]">Replied</div>
          </div>

          <div className="text-muted-foreground text-[14px] flex items-center gap-x-2">
            Posted <DateDifference date={reply.createdAt || ""} />
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div className="flex flex-wrap">{reply.message}</div>
          <div
            className="flex items-center text-[14px] cursor-pointer mt-[-10px] gap-2"
            onClick={() => setShowReplyField(!showReplyField)}
          >
            <MessageSquareText size={13} />
            {discussionComment?.subReplies?.length}{" "}
            {showReplyField ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
          </div>
        </div>
        <div className="ml-5 md:ml-10 space-y-4">
          {showReplyField && (
            <>
              <div className="flex flex-col gap-2 md:gap-3">
                {discussionComment &&
                  discussionComment?.subReplies?.map((reply, i) => (
                    <div
                      key={i}
                      className="text-[14px] leading-[20px] flex justify-between"
                    >
                      <div className="flex gap-2 items-center">
                        <span>
                          {" "}
                          <UserAvatar email={reply?.email || ""} />
                        </span>
                        <span>{reply?.message}</span>
                      </div>
                      <div>{dayjs(reply?.createdAt).format("DD-MMM-YYYY")}</div>
                    </div>
                  ))}
              </div>
              <Form form={form}>
                <Form.Item name="reply" rules={[{ required: true }]}>
                  <Input
                    placeholder=""
                    className="w-full my-0 py-0"
                    size="middle"
                    onPressEnter={handleCommentReply}
                    disabled={isLoadingReply}
                    suffix={
                      <div>
                        {isLoadingReply ? (
                          <ClipLoader size={12} />
                        ) : (
                          <IoMdSend
                            className="text-mygreen cursor-pointer"
                            onClick={handleCommentReply}
                          />
                        )}
                      </div>
                    }
                  />
                </Form.Item>
              </Form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
