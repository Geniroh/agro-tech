import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "@/utils/axiosInstance";

const handleReaction = async ({
  id,
  type,
  reaction,
  isCommentId,
  isReplyId,
}: {
  id: string;
  type:
    | "innovation"
    | "userDiscussion"
    | "innovationDiscussion"
    | "innovationDiscussionReply"
    | "userDiscussionReply";
  reaction: "like" | "dislike";
  isCommentId?: string;
  isReplyId?: string;
}) => {
  try {
    if (type === "innovation") {
      const { data } = await axiosInstance.post(`/innovation/${id}/reactions`, {
        reaction,
        innovation_id: id,
      });
      return data;
    } else if (type === "innovationDiscussion") {
      const { data } = await axiosInstance.post<{
        comment: IInnovationComment;
        message: string;
      }>(`/innovation/${id}/discussion/reaction`, {
        commentId: isCommentId,
        reaction,
      });
      return data;
    } else if (type === "userDiscussion") {
      const { data } = await axiosInstance.post(`discussion/${id}`, {
        reaction,
      });
      return data;
    } else if (type === "innovationDiscussionReply") {
      const { data } = await axiosInstance.post(
        `/innovation/${id}/discussion/reply/reaction`,
        { replyId: isReplyId, reaction }
      );
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const useHandleReaction = () => {
  const queryClient = useQueryClient();

  return useMutation(handleReaction, {
    onSuccess: (data, variables) => {
      if (variables.type === "innovation") {
        queryClient.invalidateQueries(["get-innovation-by-id", variables.id]);
      } else if (variables.type === "innovationDiscussion") {
        // queryClient.invalidateQueries(["comments", variables.id]);
      }
    },
  });
};
