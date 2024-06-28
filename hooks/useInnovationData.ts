import axiosInstance from "@/utils/axiosInstance";
import { useQuery, UseQueryResult } from "react-query";

interface QueryParams {
  [key: string]: any;
}

type SuccessHandler = (data: IGetInnovationResponse) => void;
type ErrorHandler = (error: unknown) => void;

const getInnovations = async (
  queryParams: QueryParams
): Promise<IGetInnovationResponse> => {
  const { data } = await axiosInstance.get<IGetInnovationResponse>(
    "/innovation",
    {
      params: queryParams,
    }
  );
  return data;
};
const getInnovationById = async (id: string): Promise<IInnovationType> => {
  const { data } = await axiosInstance.get<IInnovationType>(
    `/innovation/${id}`
  );

  return data;
};

export const useGetInnovation = (
  queryParams: QueryParams,
  onSuccess?: SuccessHandler,
  onError?: ErrorHandler
): UseQueryResult<IGetInnovationResponse> => {
  return useQuery<IGetInnovationResponse, unknown>(
    ["get-innovation-with-pagination", queryParams],
    () => getInnovations(queryParams),
    {
      keepPreviousData: true,
      refetchOnMount: false,
      onError,
      onSuccess,
    }
  );
};

export const useGetInnovationById = (
  id: string,
  onSuccess?: (data: IInnovationType) => void,
  onError?: (error: unknown) => void
) => {
  return useQuery<IInnovationType, unknown>(
    ["get-innovation-by-id", id],
    () => getInnovationById(id),
    {
      onError,
      onSuccess,
      refetchIntervalInBackground: true,
    }
  );
};
