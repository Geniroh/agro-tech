import { useQuery } from "react-query";
import axiosInstance from "@/utils/axiosInstance";

const fetchComments = async (id: string): Promise<IInnovationComment[]> => {
  const { data } = await axiosInstance.get<{
    message: string;
    comments: IInnovationComment[];
  }>(`/innovation/${id}/discussion`);
  return data.comments;
};

export const useFetchInnovationComments = (id: string) => {
  return useQuery(["get-innovation-comments", id], () => fetchComments(id), {
    enabled: !!id,
  });
};
