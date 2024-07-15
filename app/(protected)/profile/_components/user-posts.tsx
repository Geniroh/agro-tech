import { DateDifference } from "@/components/general/date-diff-calculator";
import { TagSelect } from "@/components/general/tag-select";
import { UserInnovationSkeleton } from "@/components/skeletons/user-innovation-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetUserPost } from "@/hooks/useUserProfileData";
import { MessageSquareText, ThumbsDown, ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UserPosts = () => {
  const [userPost, setUserPost] = useState();
  const { data, isLoading } = useGetUserPost();
  const router = useRouter();

  if (isLoading) {
    return <UserInnovationSkeleton />;
  }

  return (
    <div>
      <TagSelect name="Sort By" options={["Recent", "Older"]} />
      <div>
        {data && (
          <div className="space-y-6 mt-10">
            {data.map((discussion) => (
              <div
                key={discussion.id}
                onClick={() => router.push(`discussion/forum/${discussion.id}`)}
              >
                <div className="flex flex-col gap-3 cursor-pointer">
                  <div className="flex flex-col md:flex-row items-start gap-2 md:gap-6 md:items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-[32px] h-[32px] rounded-full bg-mygreen flex justify-center items-center text-white"></div>
                      <div>You</div>
                      <div className="text-muted-foreground text-[14px]">
                        Created A Discussion
                      </div>
                    </div>

                    <div className="text-muted-foreground text-[14px] flex items-center gap-x-2">
                      Posted <DateDifference date={discussion.createdAt} />
                    </div>
                  </div>

                  <div>{discussion.title}</div>

                  <div className="flex gap-x-2 md:gap-x-4">
                    <>
                      <button className="flex items-center text-xs">
                        <span
                          className={`p-2 rounded-full hover:bg-[#f2f2f2] flex justify-center items-center transition-transform`}
                        >
                          <ThumbsUp size={13} />
                        </span>
                        <span>{discussion.likes}</span>
                      </button>

                      <button className="flex items-center text-xs">
                        <span
                          className={`p-2 rounded-full hover:bg-[#f2f2f2] flex justify-center items-center transition-transform`}
                        >
                          <ThumbsDown size={13} />
                        </span>
                        <span>{discussion.dislikes}</span>
                      </button>

                      <button className="flex items-center text-xs">
                        <span className="p-2 rounded-full hover:bg-[#f2f2f2] flex justify-center items-center">
                          <MessageSquareText size={13} />
                        </span>
                        <span>{discussion.replies.length}</span>
                      </button>
                    </>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPosts;
