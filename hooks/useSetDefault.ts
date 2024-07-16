import { useAppContext } from "@/context/AppContext";
import {
  useGetUserInnovation,
  useGetUserPost,
  useUserProfile,
} from "@/hooks/useUserProfileData";
import { useEffect } from "react";
import { useGetInnovation } from "./useInnovationData";
import { useFeaturedPosts } from "./useFeaturedPostData";
import { useGetAnalyticsInnovation } from "./useAnalyticsData";
import { transformInnovationsToChartData } from "@/utils/function";

export const useSetDefaultStates = () => {
  const {
    setUserInnovation,
    setUserProfile,
    setInnovationCollection,
    innovationCollection,
    setFeaturedPosts,
    setAnalyticsInnovation,
    setChartData,
    setUsersPosts,
  } = useAppContext();

  const handleGetSuccess = (data: IInnovationType[]) => {
    setUserInnovation(data);
  };
  const handleGetProfileSuccess = (data: { user: IUser }) => {
    setUserProfile(data.user);
  };
  const handleGetFeaturedPosts = async (data: IFeaturedPosts[]) => {
    setFeaturedPosts(data);
  };
  const handleAnalyticsGet = async (data: { data: IInnovationType[] }) => {
    setAnalyticsInnovation(data.data);
    const res = transformInnovationsToChartData(data.data);
    setChartData(res);
  };

  const { data: profileData, isLoading: isProfileLoading } = useUserProfile(
    handleGetProfileSuccess
  );
  const { data, isLoading } = useGetUserInnovation(handleGetSuccess);

  const { data: collectionData, isLoading: isCollectionLoading } =
    useGetInnovation({ page: innovationCollection.page });

  const { isLoading: isLoadingFeatured, data: featuredData } = useFeaturedPosts(
    handleGetFeaturedPosts
  );

  const { isLoading: isLoadingAnalytics, data: analyticsData } =
    useGetAnalyticsInnovation({});

  const { data: userPosts, isLoading: isLoadingUserPosts } = useGetUserPost();

  const dependencies = [
    data,
    isLoading,
    profileData,
    isProfileLoading,
    collectionData,
    isCollectionLoading,
    isLoadingFeatured,
    featuredData,
    userPosts,
    isLoadingUserPosts,
  ];

  useEffect(() => {
    if (data && !isLoading) {
      handleGetSuccess(data);
    }
    if (profileData && isProfileLoading) {
      setUserProfile(profileData);
    }
    if (collectionData && isCollectionLoading) {
      setInnovationCollection(collectionData);
    }
    if (featuredData && isLoadingFeatured) {
      setFeaturedPosts(featuredData);
    }
    if (analyticsData && isLoadingAnalytics) {
      handleAnalyticsGet(analyticsData);
    }
    if (userPosts && isLoadingUserPosts) {
      setUsersPosts(userPosts);
    }
  }, [...dependencies]);
};
