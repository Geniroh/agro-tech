import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "react-query";

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
