// context/FormContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FormContextProps {
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  formData: FormData;
  updateFormData: (newData: Partial<FormData>) => void;
}

interface FormData {
  // Define your form data structure here
  [key: string]: any;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const useFormContext = (): FormContextProps => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({});

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  return (
    <FormContext.Provider value={{ step, nextStep, prevStep, formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};
