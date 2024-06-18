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
    return (
      <section className="flex items-center h-full sm:p-16 dark:bg-gray-50 dark:text-gray-800">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-40 h-40 dark:text-gray-400"
          >
            <path
              fill="currentColor"
              d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"
            ></path>
            <rect
              width="176"
              height="32"
              x="168"
              y="320"
              fill="currentColor"
            ></rect>
            <polygon
              fill="currentColor"
              points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"
            ></polygon>
            <polygon
              fill="currentColor"
              points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"
            ></polygon>
          </svg>
          <p className="text-md">
            Looks like there was a problem getting innovation. For more
            information, please contact @help
          </p>
          <Link
            href="/"
            className="text-mygreen font-semibold hover:text-mygreen/70"
          >
            Back to home page
          </Link>
        </div>
      </section>
    );
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
                <span className="text-muted-foreground text-[14px]">
                  <DateDifference date={data?.createdAt} />
                </span>
              </div>

              <Link href={`/innovation/${data.id}`} className="text-mygreen">
                Visit innovation page
              </Link>
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
