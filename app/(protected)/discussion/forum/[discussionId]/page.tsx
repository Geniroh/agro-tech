"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import BreadcrumbP from "@/components/general/my-breadcrumb";
import { DateDifference } from "@/components/general/date-diff-calculator";
import { Skeleton } from "@/components/ui/skeleton";
import { ShareButton } from "@/components/general/share-button";
import { useGetUserDiscussion } from "@/hooks/useDiscussionData";
import { Form, Input, message } from "antd";
import NoContent from "@/components/loaders/no-content";
import { IoMdSend } from "react-icons/io";
import { ReactionButtons } from "@/components/general/reaction-buttons";
import { useAddUserDiscussionComment } from "@/hooks/useAddDiscussion";
import { DiscussionUserReply } from "@/components/discussionComp/discussion-user-comment";
import UserAvatar from "@/components/user-avatar";

const UserDiscussionPage = () => {
  const params = useParams<{ discussionId: string }>();
  const { discussionId } = params;
  const [form] = Form.useForm();
  const [discussion, setDiscussion] = useState<IUserDiscussion>();
  const [comments, setComments] = useState<IInnovationComment[]>([]);

  const handleGetSuccess = (data: IUserDiscussion) => {
    setDiscussion(data);
  };
  const handleGetError = (error: unknown) =>
    message.error("Network Error, Please try again!");

  const { isLoading, isError, refetch } = useGetUserDiscussion(
    discussionId,
    handleGetSuccess,
    handleGetError
  );

  const { mutate: addComment } = useAddUserDiscussionComment();

  const handleComments = async () => {
    try {
      const values = await form.validateFields();
      addComment(
        { id: discussionId, message: values.message },
        {
          onSuccess: (data) => {
            message.success("Comment added");
            form.resetFields();
            refetch();
          },
          onError: () => {
            message.error("Network error");
          },
        }
      );
    } catch (error) {
      message.error("You didn't enter any message");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-3 w-full container">
        <Skeleton className="h-[300px] w-full mt-10" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  if (isError) {
    return <NoContent message="Page not found!" />;
  }

  return (
    <>
      <main className="container pb-20">
        <div>
          <BreadcrumbP
            toHref="/discussion"
            toTitle={`Discussion`}
            fromHref="/discussion"
            fromTitle="Back to HomePage/ ForumPage"
          />

          <div className="max-w-[782px] mx-auto">
            <div className="flex items-center gap-x-4">
              {/* <div className="w-[32px] h-[32px] rounded-full bg-mygreen"></div> */}
              <UserAvatar email={discussion?.user?.email || ""} />
              <div>{discussion?.user?.name || discussion?.user?.email}</div>
              <div className="text-[14px]">Created A Discussion posted </div>
              <div className="text-muted-foreground text-[14px]">
                <DateDifference date={discussion?.createdAt || ""} />
              </div>
            </div>

            <div className="mt-5">
              <h1 className="text-[18px]">{discussion?.title}</h1>
              <p className="text-muted-foreground mt-3 leading-[24px]">
                {discussion?.message}
              </p>
            </div>

            <div className="w-full border shadow-sm rounded-md mt-5 max-w-[1000px] mx-auto h-[35px] flex items-center justify-between px-2">
              <ReactionButtons
                dislikes={discussion?.dislikes || 0}
                likes={discussion?.likes || 0}
                type="userDiscussion"
                id={discussionId}
                replies={discussion?.replies.length}
              />

              <div className="flex gap-x-4">
                <ShareButton link={`discussion/innovation/${discussionId}`} />
              </div>
            </div>

            <hr className="my-3" />

            <div className="mt-5">
              <Form form={form}>
                <Form.Item name="message">
                  <Input
                    placeholder="Add a comment"
                    className="w-full"
                    size="large"
                    onPressEnter={handleComments}
                    suffix={
                      <IoMdSend
                        className="text-mygreen cursor-pointer"
                        onClick={handleComments}
                      />
                    }
                  />
                </Form.Item>
              </Form>
            </div>

            <div className="space-y-6">
              {discussion?.comments?.map((reply, i) => (
                <DiscussionUserReply
                  discussionId={discussionId}
                  reply={reply}
                  key={reply.id}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default UserDiscussionPage;
