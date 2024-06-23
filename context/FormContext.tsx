"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface FormData {
  [key: string]: any;
}

interface FormContextType {
  formData: FormData;
  setFormData: (data: FormData) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  mySteps: number;
  setMySteps: (steps: number) => void;
  submitStatus: boolean;
  setSubmitStatus: (status: boolean) => void;
  clearLocalStorage: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

const isBrowser = typeof window !== "undefined";

const getLocalStorageItem = (key: string) => {
  if (!isBrowser) return null;
  const item = localStorage.getItem(key);
  try {
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error parsing localStorage item ${key}:`, error);
    return null;
  }
};

const setLocalStorageItem = (key: string, value: any) => {
  if (!isBrowser) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage item ${key}:`, error);
  }
};

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [formData, setFormData] = useState<FormData>(
    getLocalStorageItem("formData") || {}
  );
  const [currentStep, setCurrentStep] = useState<number>(
    getLocalStorageItem("currentStep") || 0
  );
  const [mySteps, setMySteps] = useState<number>(
    getLocalStorageItem("totalSteps") || 1
  );
  const [submitStatus, setSubmitStatus] = useState<boolean>(false);

  const clearLocalStorage = () => {
    if (!isBrowser) return;
    localStorage.removeItem("formData");
    localStorage.removeItem("currentStep");
    localStorage.removeItem("totalSteps");
  };

  useEffect(() => {
    setLocalStorageItem("formData", formData);
  }, [formData]);

  useEffect(() => {
    setLocalStorageItem("currentStep", currentStep);
  }, [currentStep]);

  useEffect(() => {
    setLocalStorageItem("totalSteps", mySteps);
  }, [mySteps]);

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        currentStep,
        setCurrentStep,
        mySteps,
        setMySteps,
        submitStatus,
        setSubmitStatus,
        clearLocalStorage,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
