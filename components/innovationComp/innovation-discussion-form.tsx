"use client";
import { useAppContext } from "@/context/AppContext";
import { Form, Input, message, Button } from "antd";
import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { ReactionButtons } from "../general/reaction-buttons";
import { useAddDiscussionComment } from "@/hooks/useAddComment";
import Link from "next/link";
import { useFetchInnovationReplies } from "@/hooks/useRepliesData";
import { RiExternalLinkFill } from "react-icons/ri";
import UserAvatar from "@/components/user-avatar";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

const InnovationDiscussionComment = ({
  comment,
  innovationId,
}: {
  comment: IInnovationComment;
  innovationId: string;
}) => {
  const [replies, setReplies] = useState<IInnovationCommentReply[]>([]);

  const handleGetReplySuccess = (data: IGetInnovationDisussionReplies) =>
    setReplies(data.replies);

  const { isLoading } = useFetchInnovationReplies(
    innovationId,
    comment.id,
    handleGetReplySuccess
  );

  const router = useRouter();
  return (
    <div
      className="min-h-[56px] flex flex-col md:flex-row items-start md:items-end justify-between"
      key={comment.id}
    >
      <div className="flex items-start gap-3">
        <UserAvatar email={comment.email || comment.username} />

        <div
          className="flex flex-col justify-between text-[16px] leading-[24px] cursor-pointer"
          onClick={() => router.push(`/discussion/innovation/${innovationId}`)}
        >
          <span className="font-semibold">{comment.username}</span>
          <span>{comment.message}</span>
        </div>
      </div>

      <div className="flex items-center">
        <ReactionButtons
          dislikes={comment.dislikes || 0}
          likes={comment.likes || 0}
          replies={replies.length || 0}
          type="innovationDiscussion"
          id={innovationId}
          isCommentId={comment.id}
          showReplyBtn={false}
        />
      </div>
    </div>
  );
};

export const InnovationDiscussionForum = ({
  innovationId,
  comments,
}: {
  innovationId: string;
  comments: IInnovationComment[];
}) => {
  const [form] = Form.useForm();
  const [myComments, setMyComments] = useState<IInnovationComment[]>(comments);
  const [displayedComments, setDisplayedComments] = useState<number>(5);

  const { mutate: addComment, data, isLoading } = useAddDiscussionComment();

  const handleDiscussions = async () => {
    try {
      const values = await form.validateFields();
      addComment(
        { id: innovationId, message: values.message },
        {
          onSuccess: (data) => {
            form.resetFields();
            setMyComments(data.comments);
            message.info("Commented");
          },
          onError: (error) => {
            message.error("Network error");
          },
        }
      );
    } catch (error) {
      message.error("Network error");
    }
  };

  const showMoreComments = () => {
    setDisplayedComments((prev) => prev + 10);
  };

  return (
    <div className="mt-5">
      <Form form={form}>
        <Form.Item name="message">
          <Input
            placeholder="Share your thoughts"
            className="w-full"
            variant="filled"
            size="large"
            disabled={isLoading}
            onPressEnter={handleDiscussions}
            suffix={
              <div>
                {isLoading ? (
                  <span>
                    <ClipLoader size={15} />
                  </span>
                ) : (
                  <IoMdSend
                    className="text-mygreen cursor-pointer"
                    onClick={handleDiscussions}
                  />
                )}
              </div>
            }
          />
        </Form.Item>
      </Form>

      {/* COMMENTS */}
      <>
        <div className="md:ml-10 space-y-10">
          {myComments.slice(0, displayedComments).map((comment, i) => (
            <InnovationDiscussionComment
              comment={comment}
              innovationId={innovationId}
              key={i}
            />
          ))}
        </div>

        <div className="text-center mt-4">
          <Button type="link">
            <Link href={`/discussion/innovation/${innovationId}`}>
              <h2 className="text-lg text-muted-foreground mt-10 flex gap-4 items-center">
                Join this discussion
                <RiExternalLinkFill size={15} />
              </h2>
            </Link>
          </Button>
        </div>

        {myComments.length > displayedComments && (
          <div className="text-center mt-4">
            <Button onClick={showMoreComments} type="default">
              Show More
            </Button>
          </div>
        )}
      </>
    </div>
  );
};
