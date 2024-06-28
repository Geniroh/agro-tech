import axiosInstance from "@/utils/axiosInstance";
import { useQuery, useMutation, useQueryClient } from "react-query";

const getUserProfile = async () => {
  const { data } = await axiosInstance.get<{ user: IUser }>("/user/pic");
  return data;
};

export const useUserProfile = (
  onSuccess?: (data: { user: IUser }) => void,
  onError?: (error: unknown) => void
) => {
  return useQuery("get-user-profile", getUserProfile, {
    onError,
    onSuccess,
    keepPreviousData: true,
  });
};

const updateProfilePic = async (url: string) => {
  const { data } = await axiosInstance.put("/user/pic", { url });
  return data;
};

export const useUpdateProfilePic = (
  onSuccess?: (data: any) => void,
  onError?: (error: unknown) => void
) => {
  const queryClient = useQueryClient();

  return useMutation(updateProfilePic, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("get-user-profile");
      if (onSuccess) onSuccess(data);
    },
    onError,
  });
};

const deleteProfilePic = async () => {
  const { data } = await axiosInstance.delete("/user/pic");
  return data;
};

export const useDeleteProfilePic = (
  onSuccess?: (data: any) => void,
  onError?: (error: unknown) => void
) => {
  const queryClient = useQueryClient();

  return useMutation(deleteProfilePic, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("get-user-profile");
      if (onSuccess) onSuccess(data);
    },
    onError,
  });
};

const getUserPost = async () => {
  const { data } = await axiosInstance.get("/user/posts");
  return data;
};

export const useGetUserPost = (
  onSuccess?: (data: IUserDiscussion[]) => void,
  onError?: (error: unknown) => void
) => {
  return useQuery("get-user-post", getUserPost, {
    onError,
    onSuccess,
    keepPreviousData: true,
  });
};

const getUserInnovation = async () => {
  const { data } = await axiosInstance.get("/user/innovation");
  return data;
};

export const useGetUserInnovation = (
  onSuccess?: (data: IInnovationType[]) => void,
  onError?: (error: unknown) => void
) => {
  return useQuery("get-user-innovation", getUserInnovation, {
    onSuccess,
    onError,
  });
};

const getUserDetails = async () => {
  const { data } = await axiosInstance.get("/user/details");
  return data;
};

export const useGetUserDetails = (
  onSuccess?: (data: IUserDetails) => void,
  onError?: (error: unknown) => void
) => {
  return useQuery("get-user-details", getUserDetails, {
    onSuccess,
    onError,
  });
};
