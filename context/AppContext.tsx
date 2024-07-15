"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface AppContextType {
  userInnovation: IInnovationType[];
  setUserInnovation: (data: IInnovationType[]) => void;
  userProfile: IUser;
  setUserProfile: (data: IUser) => void;
  innovationCollection: IGetInnovationResponse;
  setInnovationCollection: (data: IGetInnovationResponse) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userInnovation, setUserInnovation] = useState<IInnovationType[]>([]);
  const [userProfile, setUserProfile] = useState<IUser>({
    email: "",
    emailVerified: "",
    id: "",
    image: "",
    name: "",
    role: "",
  });
  const [innovationCollection, setInnovationCollection] =
    useState<IGetInnovationResponse>({
      data: [],
      page: 1,
      pageSize: 1,
      totalCount: 1,
      totalPages: 1,
    });

  return (
    <AppContext.Provider
      value={{
        userInnovation,
        setUserInnovation,
        userProfile,
        setUserProfile,
        innovationCollection,
        setInnovationCollection,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
