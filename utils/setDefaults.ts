import { useAppContext } from "@/context/AppContext";
import { useGetUserInnovation } from "@/hooks/useUserProfileData";
import { useEffect } from "react";

export const useSetDefaultStates = () => {
  const { setUserInnovation } = useAppContext();

  const handleGetSuccess = (data: IInnovationType[]) => {
    setUserInnovation(data);
  };

  const { data, isLoading } = useGetUserInnovation(handleGetSuccess);

  useEffect(() => {
    if (data && !isLoading) {
      handleGetSuccess(data);
    }
  }, [data, isLoading]);
};
