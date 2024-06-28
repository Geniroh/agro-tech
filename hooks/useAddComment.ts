import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "@/utils/axiosInstance";

const addInnovationDiscussionComment = async ({
  id,
  message,
}: {
  id: string;
  message: string;
}) => {
  const { data } = await axiosInstance.post<{
    comment: IInnovationComment;
    comments: IInnovationComment[];
    message: string;
  }>(`/innovation/${id}/discussion`, {
    innovation_id: id,
    message: message,
  });

  return data;
};

export const useAddDiscussionComment = () => {
  const queryClient = useQueryClient();

  return useMutation(addInnovationDiscussionComment, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([
        "get-innovation-comments",
        data.comment.innovationDiscussionId,
      ]);
    },
    onError: (error) => {
      console.error("Error adding comment:", error);
    },
  });
};

const addInnovationDiscussionReply = async ({
  innovationId,
  commentId,
  message,
}: {
  innovationId: string;
  commentId: string;
  message: string;
}) => {
  const { data } = await axiosInstance.post<{ message: string; reply: any }>(
    `/innovation/${innovationId}/discussion/reply`,
    { message, commentId }
  );

  return data;
};

export const useAddDiscussionReply = () => {
  const queryClient = useQueryClient();

  return useMutation(addInnovationDiscussionReply, {
    onSuccess: (data) => {
      // queryClient.invalidateQueries(["get-innovation-replies"]);
    },
    onError: (error) => {
      console.error("Error adding comment:", error);
    },
  });
};
