"use client";
import { Navbar } from "@/components/general/navbar";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import BreadcrumbP from "@/components/general/my-breadcrumb";
import { DateDifference } from "@/components/general/date-diff-calculator";
import Link from "next/link";
import { RenderMedia } from "@/components/general/render-media";
import { Skeleton } from "@/components/ui/skeleton";
import { ShareButton } from "@/components/general/share-button";
import { ClipLoader } from "react-spinners";
import { MessageSquareText, ThumbsDown, ThumbsUp } from "lucide-react";
import { Form, Input, message } from "antd";
import NoContent from "@/components/loaders/no-content";
import { IoMdSend } from "react-icons/io";
import { ReactionButtons } from "@/components/general/reaction-buttons";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { DiscussionInnovationComment } from "@/components/discussionComp/discussion-innovation-comment";

const InnovationDiscussionPage = () => {
  const router = useRouter();
  const params = useParams<{ innovationId: string }>();
  const { innovationId } = params;
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<IInnovationType>();
  const [discussion, setDiscussion] = useState<IInnovationDiscussion>();
  const [comments, setComments] = useState<IInnovationComment[]>([]);
  const [reactions, setReactions] = useState<IGetInnovationReactions>();
  const [clickedIcon, setClickedIcon] = useState<"like" | "dislike" | null>(
    null
  );

  const handleDisucssions = async () => {
    try {
      const values = await form.validateFields();
      const { data } = await axios.post<{
        comment: IInnovationComment;
        comments: IInnovationComment[];
        message: string;
      }>(`/api/v1/innovation/${innovationId}/discussion`, {
        innovation_id: innovationId,
        message: values.message,
      });

      console.log(data);
      // setCommented(values.message);
      form.resetFields();
      // setMyComments(data.comments); // Update the comments with the new list from the response
      message.info("Commented");
    } catch (error) {
      message.error("Network error");
    }
  };

  const fetchData = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.get<IInnovationType>(
        `/api/v1/innovation/${id}`
      );
      // const { data: comments } = await axios.get<{
      //   message: string;
      //   comments: IInnovationComment[];
      // }>(`/api/v1/innovation/${innovationId}/discussion`);

      const { data: discussion } = await axios.get<{
        comments: IInnovationComment[];
        discussion: IInnovationDiscussion;
        message: string;
      }>(`/api/v1/innovation/${innovationId}/discussion`);

      setData(data);
      setDiscussion(discussion.discussion);
      setComments(discussion.comments);
      console.log(discussion.comments);
      console.log({ data, discussion });
    } catch (error) {
      setError("Network Error, please try again!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(innovationId);
  }, []);

  if (loading) {
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

  if (error) {
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
              <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                  <span>{data?.productName}</span>
                  <span className="text-muted-foreground text-[14px] flex items-center">
                    posted <DateDifference date={data?.createdAt || ""} />
                  </span>
                </div>

                <Link href={`/innovation/${data?.id}`} className="text-mygreen">
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
                  dislikes={discussion?.dislikes || 0}
                  likes={discussion?.likes || 0}
                  type="comment"
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

              {/* <div>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-6 items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-[32px] h-[32px] rounded-full bg-mygreen flex justify-center items-center text-white">
                        K
                      </div>
                      <div>Username</div>
                      <div className="text-muted-foreground">Replied</div>
                    </div>

                    <div className="text-muted-foreground">
                      Posted 2 hours ago
                    </div>
                  </div>

                  <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Optio, sint.
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

                  <div className="flex items-center">
                    <IoMdArrowDropup /> 2 Replies
                  </div>
                </div>
              </div> */}
              <DiscussionInnovationComment
                comment={comments[0]}
                innovationId={data.id}
              />
            </div>
          </div>

          <div></div>
        </main>
      ) : (
        <NoContent message="No discussion found!" />
      )}
    </>
  );
};

export default InnovationDiscussionPage;
