import { useAppContext } from "@/context/AppContext";
import {
  useGetUserInnovation,
  useUserProfile,
} from "@/hooks/useUserProfileData";
import { useEffect } from "react";
import { useGetInnovation } from "./useInnovationData";
import { useFeaturedPosts } from "./useFeaturedPostData";

export const useSetDefaultStates = () => {
  const {
    setUserInnovation,
    setUserProfile,
    setInnovationCollection,
    innovationCollection,
    setFeaturedPosts,
  } = useAppContext();

  const handleGetSuccess = (data: IInnovationType[]) => {
    setUserInnovation(data);
  };
  const handleGetProfileSuccess = (data: { user: IUser }) => {
    setUserProfile(data.user);
  };

  const { data: profileData, isLoading: isProfileLoading } = useUserProfile(
    handleGetProfileSuccess
  );
  const { data, isLoading } = useGetUserInnovation(handleGetSuccess);

  const { data: collectionData, isLoading: isCollectionLoading } =
    useGetInnovation({ page: innovationCollection.page });

  const handleGetFeaturedPosts = async (data: IFeaturedPosts[]) => {
    setFeaturedPosts(data);
  };

  const { isLoading: isLoadingFeatured, data: featuredData } = useFeaturedPosts(
    handleGetFeaturedPosts
  );

  const dependencies = [
    data,
    isLoading,
    profileData,
    isProfileLoading,
    collectionData,
    isCollectionLoading,
    isLoadingFeatured,
    featuredData,
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
  }, [...dependencies]);
};
