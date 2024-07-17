"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import BreadcrumbP from "@/components/general/my-breadcrumb";
import { DateDifference } from "@/components/general/date-diff-calculator";
import Link from "next/link";
import { RenderMedia } from "@/components/general/render-media";
import { Skeleton } from "@/components/ui/skeleton";
import { ShareButton } from "@/components/general/share-button";
import { useGetInnovationById } from "@/hooks/useInnovationData";
import { useAddDiscussionComment } from "@/hooks/useAddComment";
import { useGetInnovationDiscussion } from "@/hooks/useDiscussionData";
import { Form, Input, message } from "antd";
import NoContent from "@/components/loaders/no-content";
import { IoMdSend } from "react-icons/io";
import { ReactionButtons } from "@/components/general/reaction-buttons";
import { DiscussionInnovationComment } from "@/components/discussionComp/discussion-innovation-comment";
import { InnovationSkeleton } from "@/components/skeletons/innovation-skeleton";

const InnovationDiscussionPage = () => {
  const params = useParams<{ innovationId: string }>();
  const { innovationId } = params;
  const [form] = Form.useForm();
  const [data, setData] = useState<IInnovationType>();
  const [discussion, setDiscussion] = useState<IInnovationDiscussion>();
  const [comments, setComments] = useState<IInnovationComment[]>([]);

  const handleGetInnovationSuccess = (data: IInnovationType) => setData(data);
  const handleGetInnovationError = (error: unknown) =>
    message.error("Network Error, Please try again!");
  const handleGetDiscussion = (data: IGetInnovationDiscussionResponse) => {
    setDiscussion(data.discussion);
    setComments(data.comments);
  };
  const handleGetDiscussionError = (error: unknown) =>
    message.error("Could not get discussions for this innovation");

  const { isLoading, isError } = useGetInnovationById(
    innovationId,
    handleGetInnovationSuccess,
    handleGetInnovationError
  );
  const { mutate: addComment } = useAddDiscussionComment();
  const { isLoading: isDiscussionLoading } = useGetInnovationDiscussion(
    innovationId,
    handleGetDiscussion,
    handleGetDiscussionError
  );

  const handleDisucssions = async () => {
    try {
      const values = await form.validateFields();
      addComment(
        { id: innovationId, message: values.message },
        {
          onSuccess: (data) => {
            form.resetFields();
            setComments(data.comments);
            message.info("Commented");
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

  if (isLoading || isDiscussionLoading) {
    return <InnovationSkeleton />;
  }

  if (isError) {
    return <NoContent message="Page not found!" />;
  }

  return (
    <>
      {data ? (
        <main className="container pb-20">
          <div>
            <BreadcrumbP
              toHref="/discussion"
              toTitle={`${data.productName} discussion`}
              fromHref="/home"
              fromTitle="Back to HomePage/ ForumPage"
            />

            <div className="max-w-[782px] mx-auto">
              <div className="flex flex-col md:flex-col items-start md:items-center justify-between">
                <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                  <span className="text-[18px] font-semibold">
                    {data?.productName}
                  </span>
                  <span className="text-muted-foreground text-[14px] flex items-center gap-2">
                    Posted <DateDifference date={data?.createdAt || ""} />
                  </span>
                </div>

                <Link
                  href={`/innovations/${data?.id}`}
                  className="text-mygreen flex justify-end w-full"
                >
                  Visit innovation page
                </Link>
              </div>

              <div className="mt-5 text-muted-foreground">
                {data?.productDescription}
              </div>

              <div className="mt-10">
                <RenderMedia
                  media={data?.productMedia[0]}
                  className="max-h-[400px] w-full"
                />
              </div>

              <div className="w-full border shadow-sm rounded-md mt-5 max-w-[1000px] mx-auto h-[35px] flex items-center justify-between px-2">
                <ReactionButtons
                  dislikes={data?.dislikes || 0}
                  likes={data?.likes || 0}
                  type="innovation"
                  id={data.id}
                  replies={discussion?.comments.length || 0}
                />

                <div className="flex gap-x-4">
                  <ShareButton link={`discussion/innovation/${innovationId}`} />
                </div>
              </div>

              <div className="mt-5">
                <Form form={form}>
                  <Form.Item name="message">
                    <Input
                      placeholder="Add a comment"
                      className="w-full"
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
              </div>

              <div className="space-y-6">
                {comments?.map((comment, i) => (
                  <DiscussionInnovationComment
                    comment={comment}
                    innovationId={data.id}
                    key={comment.id}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      ) : (
        <InnovationSkeleton />
      )}
    </>
  );
};

export default InnovationDiscussionPage;
