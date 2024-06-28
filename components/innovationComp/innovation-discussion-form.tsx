import { useAppContext } from "@/context/AppContext";
import { Form, Input, message, Button } from "antd";
import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { ReactionButtons } from "../general/reaction-buttons";
import { getFirstName } from "@/utils/function";
import { useAddDiscussionComment } from "@/hooks/useAddComment";
import Link from "next/link";

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
  const { setCommented } = useAppContext();

  const { mutate: addComment, data } = useAddDiscussionComment();

  const handleDisucssions = async () => {
    try {
      const values = await form.validateFields();
      addComment(
        { id: innovationId, message: values.message },
        {
          onSuccess: (data) => {
            setCommented(values.message);
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
    setDisplayedComments((prev) => prev + 10); // Increase the number of displayed comments by 10
  };

  console.log(comments);

  return (
    <div className="mt-5">
      <Form form={form}>
        <Form.Item name="message">
          <Input
            placeholder="Share your thoughts"
            className="w-full"
            variant="filled"
            size="large"
            onPressEnter={handleDisucssions}
            suffix={
              <IoMdSend
                className="text-mygreen cursor-pointer"
                onClick={handleDisucssions}
              />
            }
          />
        </Form.Item>
      </Form>

      {/* COMMENTS */}
      <>
        <div className="md:ml-10 space-y-10">
          {myComments.slice(0, displayedComments).map((comment, i) => (
            <div
              className="min-h-[56px] flex items-end justify-between"
              key={i}
            >
              <div className="flex items-center gap-3">
                <div className="w-[40px] h-[40px] rounded-full bg-mygreen flex justify-center items-center text-white">
                  {getFirstName(comment.username)[0]}
                </div>

                <div className="flex flex-col justify-between text-[16px] leading-[24px]">
                  <span className="font-semibold">{comment.username}</span>
                  <span>{comment.message}</span>
                </div>
              </div>

              <div className="flex items-center">
                <ReactionButtons
                  dislikes={comment.dislikes || 0}
                  likes={comment.likes || 0}
                  // replies={0}
                  type="innovationDiscussion"
                  id={innovationId}
                  isCommentId={comment.id}
                  showReplyBtn={false}
                />

                <Link href={`/discussion/innovation/${innovationId}`}>
                  <span className="text-xs cursor-pointer">Reply</span>
                </Link>
              </div>
            </div>
          ))}
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
