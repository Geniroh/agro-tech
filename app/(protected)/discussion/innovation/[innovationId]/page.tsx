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
import NoContent from "@/components/loaders/no-content";

const InnovationDiscussionPage = () => {
  const router = useRouter();
  const params = useParams<{ innovationId: string }>();
  const { innovationId } = params;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<IInnovationType>();
  const [discussion, setDiscussion] = useState<IInnovationDiscussion>();
  const [reactions, setReactions] = useState<IGetInnovationReactions>();
  const [clickedIcon, setClickedIcon] = useState<"like" | "dislike" | null>(
    null
  );

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

      const { data: discussion } = await axios.get(
        `/api/v1/innovation/${innovationId}/discussion`
      );

      setData(data);
      setDiscussion(discussion.discussion);
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
    <div>
      <Navbar />
      {data && (
        <main className="container">
          <BreadcrumbP
            toHref="/discussion"
            toTitle={`${data.productName} discussion`}
            fromHref="/home"
            fromTitle="Back to HomePage/ ForumPage"
          />

          <div className="max-w-[782px] mx-auto pb-20">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <span>{data?.productName}</span>
                <span className="text-muted-foreground text-[14px] flex items-center">
                  posted <DateDifference date={data?.createdAt} />
                </span>
              </div>

              <Link href={`/innovation/${data.id}`} className="text-mygreen">
                Visit innovation page
              </Link>
            </div>

            <div className="mt-5 text-muted-foreground">
              {data.productDescription}
            </div>

            <div className="mt-10">
              <RenderMedia
                media={data.productMedia[0]}
                className="max-h-[400px] w-full"
              />
            </div>

            <div className="w-full border shadow-sm rounded-md mt-5 max-w-[1000px] mx-auto h-[35px] flex items-center justify-between px-2">
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
                        // onClick={() => handleReaction("like")}
                      >
                        <ThumbsUp size={13} />
                      </span>
                      <span>{discussion?.likes}</span>
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
                      <span>{discussion?.dislikes}</span>
                    </button>

                    <button className="flex items-center text-xs">
                      <span className="p-2 rounded-full hover:bg-[#f2f2f2] flex justify-center items-center">
                        <MessageSquareText size={13} />
                      </span>
                      <span>{discussion?.comments.length}</span>
                    </button>
                  </>
                )}
              </div>

              <div className="flex gap-x-4">
                <ShareButton link={`discussion/innovation/${innovationId}`} />
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default InnovationDiscussionPage;
