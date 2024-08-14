import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "react-query";

type SuccessHandler = (data: IGetInnovationDiscussionResponse) => void;
type ErrorHandler = (error: unknown) => void;
type GetAllSuccessHandler = (data: {
  userDiscussion: IUserDiscussion[];
  innovationDiscussion: IInnovationDiscussion[];
  all: ICombinedDiscussion[];
}) => void;
type GetUserDiscussionSuccessHandler = (data: IUserDiscussion) => void;

const getInnovationDiscussion = async (innovationId: string) => {
  const { data } = await axiosInstance.get<{
    message: string;
    comments: IInnovationComment[];
    discussion: IInnovationDiscussion;
  }>(`/innovation/${innovationId}/discussion`);
  return data;
};

export const useGetInnovationDiscussion = (
  innovationId: string,
  onSuccess?: SuccessHandler,
  onError?: ErrorHandler
) => {
  return useQuery(
    ["get-innovation-discussion", innovationId],
    () => getInnovationDiscussion(innovationId),
    {
      onError,
      onSuccess,
    }
  );
};

const getAllDiscussion = async () => {
  const { data } = await axiosInstance.get<{
    userDiscussion: IUserDiscussion[];
    innovationDiscussion: IInnovationDiscussion[];
    all: ICombinedDiscussion[];
  }>("/discussion");

  return data;
};

export const useGetAllDiscussion = (
  onSuccess?: GetAllSuccessHandler,
  onError?: ErrorHandler
) => {
  return useQuery("get-all-discussion", getAllDiscussion, {
    onSuccess,
    onError,
    keepPreviousData: true,
  });
};

const getUserDiscussion = async (id: string) => {
  const { data } = await axiosInstance.get(`/discussion/${id}`);
  return data;
};

export const useGetUserDiscussion = (
  id: string,
  onSuccess?: GetUserDiscussionSuccessHandler,
  onError?: ErrorHandler
) => {
  return useQuery(["get-user-discussion", id], () => getUserDiscussion(id), {
    onError,
    onSuccess,
  });
};

const deleteUserDiscussion = async (id: string) => {
  const { data } = await axiosInstance.delete(`/discussion/${id}`);
  return data;
};

export const useDeleteUserPost = (onSuccess?: any, onError?: ErrorHandler) => {
  const queryClient = useQueryClient();
  return useMutation((id: string) => deleteUserDiscussion(id), {
    onError,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["get-user-discussion"]);
      if (onSuccess) {
        onSuccess(data, variables, context);
      }
    },
  });
};

const updateUserDiscussionTitle = async ({
  id,
  title,
}: {
  id: string;
  title: string;
}) => {
  const { data } = await axiosInstance.put(`/discussion/${id}`, { title });

  return data;
};

export const useUpdateDiscussionTitle = () => {
  const queryClient = useQueryClient();
  return useMutation(updateUserDiscussionTitle, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("get-user-post");
    },
    onError: (error) => {
      console.error("Error adding comment:", error);
    },
  });
};

const getAllDiscussionCommentReply = async ({
  discussionId,
  replyId,
}: {
  discussionId: string;
  replyId: string;
}) => {
  const { data } = await axiosInstance.get<IUserDiscussionReply[]>(
    `/discussion/${discussionId}/reply/${replyId}`
  );
  return data;
};

export const useGetDiscussionCommentReply = (
  discussionId: string,
  replyId: string,
  onSuccess?: (data: IUserDiscussionReply) => void
) => {
  return useQuery(
    ["get-all-discussion-comment-reply", discussionId, replyId],
    () => getAllDiscussionCommentReply({ discussionId, replyId }),
    {
      enabled: !!discussionId && !!replyId,
      onSuccess,
    }
  );
};

const addUserDiscussionCommentReply = async ({
  discussionId,
  replyId,
  reply,
}: {
  discussionId: string;
  replyId: string;
  reply: string;
}) => {
  const { data } = await axiosInstance.post<IUserDiscussionReply>(
    `discussion/${discussionId}/reply`,
    { replyId, reply }
  );
  return data;
};

export const useAddDiscussionCommentReply = () => {
  const queryClient = useQueryClient();

  return useMutation(addUserDiscussionCommentReply, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-all-discussion-comment-reply");
    },
  });
};
