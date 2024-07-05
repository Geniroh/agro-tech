import axiosInstance from "@/utils/axiosInstance";
import React from "react";
import { useQuery } from "react-query";

const UserAvatar = ({ email }: { email: string }) => {
  const getProfile = async (email: string) => {
    const { data } = await axiosInstance.get<IUser>(`/user?email=${email}`);
    return data;
  };
  const { data, isLoading, isError } = useQuery(
    ["get-user-profile-by-email", email],
    () => getProfile(email)
  );
  return (
    <div>
      {isLoading || isError ? (
        <div
          className="w-[30px] h-[30px] rounded-full bg-center bg-cover bg-no-repeat"
          style={{ background: "#329632" }}
        ></div>
      ) : (
        <>
          {data?.image ? (
            <div
              className="w-[30px] h-[30px] rounded-full bg-center bg-cover bg-no-repeat"
              style={{ backgroundImage: `url(${data?.image})` }}
            ></div>
          ) : (
            <div
              className="w-[30px] h-[30px] rounded-full bg-center bg-cover bg-no-repeat"
              style={{ background: "#329632" }}
            ></div>
          )}
        </>
      )}
    </div>
  );
};

export default UserAvatar;
