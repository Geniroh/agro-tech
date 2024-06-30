import axiosInstance from "@/utils/axiosInstance";
import { useQuery, UseQueryResult } from "react-query";

interface QueryParams {
  [key: string]: any;
}

type SuccessHandler = (data: any) => void;
type ErrorHandler = (error: unknown) => void;

const getAnalyticsInnovations = async (queryParams: QueryParams) => {
  const { data } = await axiosInstance.get("/analytics/innovation", {
    params: queryParams,
  });
  return data;
};

export const useGetAnalyticsInnovation = (
  queryParams: QueryParams,
  onSuccess?: SuccessHandler,
  onError?: ErrorHandler
) => {
  return useQuery(
    ["get-analytics-innovation", queryParams],
    () => getAnalyticsInnovations(queryParams),
    {
      onError,
      onSuccess,
    }
  );
};
