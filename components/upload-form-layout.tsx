// components/FormLayout.tsx
import React from 'react';
import { useFormContext } from '../context/UploadContext';
import { Progress } from "@/components/ui/progress"

interface Step {
  step: number;
  label: string;
}

const steps: Step[] = [
  { step: 1, label: 'Step 1' },
  { step: 2, label: 'Step 2' },
  { step: 3, label: 'Step 3' },
];

const FormLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { step } = useFormContext();

  const progress = (step / steps.length) * 100;

  return (
    <div>
      {/* <div className="progress-bar" style={{ width: `${progress}%` }} /> */}
      <div className='mb-5'>
        <Progress value={progress}  />
      </div>
      {children}
    </div>
  );
};

export default FormLayout;
