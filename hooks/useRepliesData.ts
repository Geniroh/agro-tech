import { useQuery } from "react-query";
import axiosInstance from "@/utils/axiosInstance";

const fetchInnovationReplies = async (id: string, commentId: string) => {
  const { data } = await axiosInstance.get<{
    message: string;
    replies: IInnovationCommentReply[];
  }>(`/innovation/${id}/discussion/reply`, {
    params: {
      commentId,
    },
  });

  return data;
};

export const useFetchInnovationReplies = (
  id: string,
  commentId: string,
  onSuccess?: (data: IGetInnovationDisussionReplies) => void,
  onError?: (error: unknown) => void
) => {
  return useQuery(
    ["get-innovation-replies", id, commentId],
    () => fetchInnovationReplies(id, commentId),
    {
      onSuccess,
      onError,
    }
  );
};
