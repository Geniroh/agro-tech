"use client";
import { DateDifference } from "@/components/general/date-diff-calculator";
import { TagSelect } from "@/components/general/tag-select";
import { UserInnovationSkeleton } from "@/components/skeletons/user-innovation-skeleton";
import UserAvatar from "@/components/user-avatar";
import { useAppContext } from "@/context/AppContext";
import {
  useDeleteUserPost,
  useUpdateDiscussionTitle,
} from "@/hooks/useDiscussionData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetUserPost } from "@/hooks/useUserProfileData";
import { message } from "antd";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MessageSquareText, ThumbsDown, ThumbsUp, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";

const UserPostCard = ({ discussion }: { discussion: IUserDiscussion }) => {
  const router = useRouter();
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [editTitleMsg, setEditTitleMsg] = useState<string>(
    discussion?.title || ""
  );
  const { isLoading: isPostDeleteLoading, mutateAsync } = useDeleteUserPost(
    (data: any) => {
      message.success("Post deleted");
    },
    () => {
      message.error("Network error");
    }
  );

  const { isLoading: isPostEditLoading, mutateAsync: mutateAsyncEdit } =
    useUpdateDiscussionTitle();

  const handlePostTitleEdit = async (id: string) => {
    try {
      if (editTitleMsg === "") {
        message.error("Please eneter a title");
      } else {
        mutateAsyncEdit(
          { id, title: editTitleMsg },
          {
            onSuccess: (data) => {
              console.log({ data });
              message.success("Post updated");
              setShowEdit(false);
            },
          }
        );
      }
    } catch (error) {}
  };

  const handleDelete = async (id: string) => {
    try {
      await mutateAsync(id);
    } catch (error) {
      message.error("You didn't enter any message");
    }
  };

  return (
    <div>
      <div
        key={discussion.id}
        className="flex items-start justify-between shadow-sm border-b p-2"
      >
        <div className="flex flex-col gap-3 cursor-pointer">
          <div className="flex flex-col md:flex-row items-start gap-2 md:gap-6 md:items-center">
            <div className="flex items-center gap-3">
              <UserAvatar email={discussion.user.email || ""} />
              <div>You</div>
              <div className="text-muted-foreground text-[14px]">
                Created A Discussion
              </div>
            </div>

            <div className="text-muted-foreground text-[14px] flex items-center gap-x-2">
              Posted <DateDifference date={discussion.createdAt} />
            </div>
          </div>

          {showEdit ? (
            <div className="w-full flex items-center gap-3">
              <div>{isPostEditLoading && <ClipLoader size={14} />}</div>
              <input
                type="text"
                value={editTitleMsg}
                onChange={(e) => setEditTitleMsg(e.target.value)}
                className="border-b border-b-mygreen italic outline-none"
              />
              <CiEdit />
            </div>
          ) : (
            <div
              onClick={() => router.push(`discussion/forum/${discussion.id}`)}
              className="cursor-pointer"
            >
              {discussion.title}
            </div>
          )}

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
        <div>
          {showEdit ? (
            <div className="flex items-center flex-wrap gap-3 md:gap-4">
              {isPostEditLoading ? (
                <ClipLoader size={14} />
              ) : (
                <div className="flex items-center flex-wrap gap-3 md:gap-4">
                  <div
                    className="bg-mygreen text-white text-[14px] p-1 cursor-pointer"
                    onClick={() => handlePostTitleEdit(discussion?.id)}
                  >
                    <FaCheck />
                  </div>
                  <div
                    className="bg-red-600 text-white text-[14px] p-1 cursor-pointer"
                    onClick={() => setShowEdit(false)}
                  >
                    <FaTimes />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {/* <Button variant="outline" className="px-0"> */}
                <button>
                  <BsThreeDotsVertical size={16} className="cursor-pointer" />
                </button>
                {/* </Button> */}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => setShowEdit(!showEdit)}>
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowDelete(!showDelete)}>
                    <span className="font-semibold text-destructive">
                      Delete
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      <Dialog open={showDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this post?
            </DialogTitle>
            <DialogDescription>This action cannot be undone</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex items-center gap-3">
            <Button
              variant="destructive"
              onClick={() => handleDelete(discussion?.id)}
              disabled={isPostDeleteLoading}
            >
              {isPostDeleteLoading ? (
                <ClipLoader size={15} color="#ffffff" />
              ) : (
                "Yes"
              )}
            </Button>
            <Button
              variant="default"
              className="bg-mygreen"
              disabled={isPostDeleteLoading}
              onClick={() => setShowDelete(false)}
            >
              No
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const UserPosts = () => {
  const { usersPosts, setUsersPosts } = useAppContext();
  const [userPost, setUserPost] = useState(usersPosts);

  const handleGetPostSuccess = async (data: IUserDiscussion[]) => {
    setUserPost(data);
    setUsersPosts(data);
  };

  const { isLoading } = useGetUserPost(handleGetPostSuccess);

  // const handleDiscussionDelete = async (data: any) => {
  //   console.log(data)
  //   message.success("POst deleted")
  // }

  // const deleteUserPost = async (id: string) => {

  // };

  // const { mutateAsync, isLoading: isSubmitting } = useMutation(
  //   updateInnovation,
  //   {
  //     onSuccess: () => {
  //       message.success("Edited");
  //       router.push("/");
  //     },
  //     onError: (error: any) => {
  //       console.error("Failed to update:", error);
  //       message.error("Failed to edit");
  //     },
  //   }
  // );
  const router = useRouter();

  if (isLoading && userPost.length < 1) {
    return <UserInnovationSkeleton />;
  }

  return (
    <div>
      {/* <TagSelect name="Sort By" options={["Recent", "Older"]} /> */}
      <div>
        {/* {data && ( */}
        <div className="space-y-6 mt-10">
          {userPost.map((discussion) => (
            <UserPostCard key={discussion?.id} discussion={discussion} />
          ))}
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default UserPosts;
