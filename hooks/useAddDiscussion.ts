import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "@/utils/axiosInstance";

const startUserDiscussion = async ({
  message,
  title,
}: {
  message: string;
  title: string;
}) => {
  const { data } = await axiosInstance.post("/discussion", { message, title });
  return data;
};

export const useAddUserDiscussion = () => {
  const queryClient = useQueryClient();

  return useMutation(startUserDiscussion, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["get-all-discussion"]);
    },
    onError: (error) => {
      console.log("Couldn't add discussion");
    },
  });
};

const addUserComment = async ({
  id,
  message,
}: {
  id: string;
  message: string;
}) => {
  const { data } = await axiosInstance.post(`/discussion/${id}`, { message });
  return data;
};

export const useAddUserDiscussionComment = () => {
  const queryClient = useQueryClient();

  return useMutation(addUserComment, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("get-all-user-discussion");
    },
    onError: (error) => {
      console.log("Couldn't add user discussion comment");
    },
  });
};
