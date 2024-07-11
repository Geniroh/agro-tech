import axiosInstance from "@/utils/axiosInstance";
import { useQuery, UseQueryResult } from "react-query";

const getFeaturedPosts = async () => {
  const { data } = await axiosInstance.get("/featured");
  return data;
};

export const useFeaturedPosts = (
  onSuccess?: (data: IFeaturedPosts[]) => void,
  onError?: (error: unknown) => void
): UseQueryResult<IFeaturedPosts[]> => {
  return useQuery("get-featured-posts", getFeaturedPosts, {
    // keepPreviousData: true,
    onError,
    onSuccess,
  });
};
