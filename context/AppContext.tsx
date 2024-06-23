"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface AppContextType {
  track: string;
  setTrack: (track: string) => void;
  commented: string;
  setCommented: (comment: string) => void;
  // innovationsContext: IInnovationType
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
  const [track, setTrack] = useState<string>("");
  const [commented, setCommented] = useState<string>("");

  return (
    <AppContext.Provider
      value={{
        track,
        setTrack,
        commented,
        setCommented,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
