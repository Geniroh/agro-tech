import { DiscussionUserReply } from "@/components/discussionComp/discussion-user-comment";
import { TagSelect } from "@/components/general/tag-select";
import { useGetUserPost } from "@/hooks/useUserProfieData";
import React from "react";

const UserPosts = () => {
  const { data } = useGetUserPost();

  //   console.log({ post: ProfilePost });
  return (
    <div>
      <TagSelect name="Sort By" options={["Recent", "Older"]} />
      <div>
        {data && (
          <div className="space-y-4">
            {/* {data.map((discussion) => (
              <DiscussionUserReply
                discussionId={discussion.id}
                reply={discussion.replies}
                key={discussion.id}
              />
            ))} */}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPosts;
