"use client";
import Image from "next/image";

import React from "react";
import { FormProvider } from "@/context/FormContext";
import BreadcrumbP from "@/components/general/my-breadcrumb";
import MultiStepForm from "@/components/multi-step-form";

const UploadPage = () => {
  return (
    <FormProvider>
      <div className="container pb-20">
        <BreadcrumbP
          fromHref="/"
          fromTitle="Back to Home"
          toHref="/upload"
          toTitle="Upload Invention Page"
        />
        <h1 className="w-full text-center text-4xl font-playfair font-semibold mt-[50px]">
          Upload Innovation
        </h1>
        <h3 className="text-muted-foreground text-md w-full text-center my-3 mb-5">
          fill out this form accurately and Concisely
        </h3>
        <MultiStepForm />
      </div>
    </FormProvider>
  );
};

export default UploadPage;
