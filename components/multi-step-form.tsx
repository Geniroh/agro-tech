"use client";
import React, { useEffect, useState } from "react";
import { useFormContext } from "@/context/FormContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaCheckCircle } from "react-icons/fa";
import { Progress } from "@/components/ui/progress";
import Step1 from "@/components/FormSteps/Step1";
import Step2 from "@/components/FormSteps/Step2";
import Step3 from "@/components/FormSteps/Step3";
import Step4 from "@/components/FormSteps/Step4";
import Step5 from "@/components/FormSteps/Step5";
import Step6 from "@/components/FormSteps/Step6";
import Step7 from "@/components/FormSteps/Step7";
import Step8 from "@/components/FormSteps/Step8";
import StepPreview from "@/components/FormSteps/Preview";

const steps = [
  { component: Step1, label: "Step 1" },
  { component: Step2, label: "Step 2" },
  { component: Step3, label: "Step 3" },
  { component: Step4, label: "Step 4" },
  { component: Step5, label: "Step 5" },
  { component: Step6, label: "Step 6" },
  { component: Step7, label: "Step 7" },
  { component: Step8, label: "Step 8" },
  { component: StepPreview, label: "Step 9" },
];

const MultiStepForm = () => {
  const {
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    setMySteps,
    submitStatus,
    setSubmitStatus,
  } = useFormContext();

  const StepComponent = steps[currentStep].component;

  useEffect(() => {
    setMySteps(steps.length);
  }, [setMySteps]);

  const handleSuccessClose = () => {
    setSubmitStatus(false);
  };

  useEffect(() => {}, [submitStatus]);

  return (
    <form className="max-w-[600px] mx-auto">
      <div className="mb-5">
        <Progress value={10 + (currentStep / steps.length) * 90} />
      </div>
      <StepComponent />

      <Dialog open={submitStatus} onOpenChange={() => handleSuccessClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="mb-3 flex items-center gap-x-2 text-[24px] font-semibold leading-[32px] font-playfair">
              Upload Successful <FaCheckCircle className="text-mygreen" />
            </DialogTitle>
            <DialogDescription className="text-[#242424]">
              Review will take 2-3 days. Once approved you will receive an email
              and your innovation would be posted on the platform!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="border-0 outline-none">
            <Button
              variant="default"
              className="w-full bg-mygreen border-none"
              onClick={handleSuccessClose}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
};

export default MultiStepForm;
