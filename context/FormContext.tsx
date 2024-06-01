// "use client"
// import React, { createContext, useContext, useState, useEffect } from 'react';

// interface FormData {
//   [key: string]: any;
// }

// interface FormContextType {
//   formData: FormData;
//   setFormData: (data: FormData) => void;
//   currentStep: number;
//   setCurrentStep: (step: number) => void;
//   mySteps: number;
//   setMySteps: (steps: number) => void;
//   submitStatus: boolean;
//   setSubmitStatus: (status: boolean) => void
// }

// const FormContext = createContext<FormContextType | undefined>(undefined);

// export const useFormContext = () => {
//   const context = useContext(FormContext);
//   if (!context) {
//     throw new Error('useFormContext must be used within a FormProvider');
//   }
//   return context;
// };

// export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [formData, setFormData] = useState<FormData>(() => {
//     const savedFormData = localStorage.getItem('formData');
//     return savedFormData ? JSON.parse(savedFormData) : {};
//   });

//   const [currentStep, setCurrentStep] = useState<number>(() => {
//     const savedStep = localStorage.getItem('currentStep');
//     return savedStep ? parseInt(savedStep) : 0;
//   });

//   const [mySteps, setMySteps] = useState<number>(() => {
//     const savedSteps = localStorage.getItem('totalSteps');
//     return savedSteps ? parseInt(savedSteps) : 1;
//   });

//   const [submitStatus, setSubmitStatus] = useState<boolean>(false);

//   useEffect(() => {
//     localStorage.setItem('formData', JSON.stringify(formData));
//   }, [formData]);

//   useEffect(() => {
//     localStorage.setItem('currentStep', currentStep.toString());
//   }, [currentStep]);

//   return (
//     <FormContext.Provider value={{ formData, setFormData, currentStep, setCurrentStep, mySteps, setMySteps, submitStatus, setSubmitStatus }}>
//       {children}
//     </FormContext.Provider>
//   );
// };

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
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [formData, setFormData] = useState<FormData>(() => {
    const savedFormData = localStorage.getItem("formData");
    return savedFormData ? JSON.parse(savedFormData) : {};
  });

  const [currentStep, setCurrentStep] = useState<number>(() => {
    const savedStep = localStorage.getItem("currentStep");
    return savedStep ? parseInt(savedStep) : 0;
  });

  const [mySteps, setMySteps] = useState<number>(() => {
    const savedSteps = localStorage.getItem("totalSteps");
    return savedSteps ? parseInt(savedSteps) : 1;
  });

  const [submitStatus, setSubmitStatus] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem("currentStep", currentStep.toString());
  }, [currentStep]);

  useEffect(() => {
    localStorage.setItem("totalSteps", mySteps.toString());
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
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
