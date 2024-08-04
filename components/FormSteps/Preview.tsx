"use client";
import React, { useState, useEffect } from "react";
import { Select, Button, Input, Form, message } from "antd";
import { useFormContext } from "@/context/FormContext";
import { useFormSubmit } from "@/hooks/multi-step-submit";
import { Capsule } from "@/components/general/capsule";
import { RenderMediaList } from "@/components/general/render-media-list";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RenderMedia } from "@/components/general/render-media";
import { FaCheckCircle } from "react-icons/fa";
import { X } from "lucide-react";

const StepPreview: React.FC = () => {
  const { formData, setFormData, currentStep, setCurrentStep } =
    useFormContext();
  const { handleSubmit } = useFormSubmit();
  const [loading, setLoading] = useState<boolean>(false);

  const handleNextStep = async () => {
    setLoading(true);
    try {
      await handleSubmit({ ...formData });
    } catch (error) {}
    setLoading(false);
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="w-full">
      <div className="my-10 flex justify-end gap-4">
        <Button
          className="text-white bg-[#329632] rounded-xl text-[16px] leading-[22px] font-bold disabled:cursor-not-allowed"
          size="large"
          type="text"
          onClick={prevStep}
          disabled={currentStep < 1 || loading}
        >
          Go Back to Edit
        </Button>
        <Button
          className="text-white bg-myblack rounded-xl text-[16px] leading-[22px] font-bold disabled:cursor-not-allowed"
          size="large"
          type="primary"
          loading={loading}
          disabled={loading}
          onClick={handleNextStep}
        >
          Submit Innovation
        </Button>
      </div>

      <div className="pb-20 w-full">
        <div className="w-full">
          <div>
            <h1 className="w-full text-center text-4xl font-playfair font-semibold">
              {formData?.innovation_name}
            </h1>
          </div>
          <div className="flex flex-wrap items-center justify-center max-w-[1200px] mt-7 text-sm tracking-wide mx-auto gap-y-2">
            <div className="flex">
              <span className="text-muted-foreground mr-2">Inventor:</span>
              <span className="flex gap-1 flex-wrap">
                {formData?.isInventor ? (
                  <>
                    {formData?.inventor.map((inventor: any, i: number) => (
                      <span key={i}>{inventor.inventor_name}</span>
                    ))}
                  </>
                ) : (
                  ""
                )}
              </span>
            </div>
            <div className="mx-4">|</div>
            <div>
              <span className="text-muted-foreground mr-2">Year Invented:</span>
              <span>{formData?.innovation_year}</span>
            </div>
            <div className="mx-4 hidden md:block">|</div>
            <div>
              <span className="text-muted-foreground mr-2">Country:</span>
              <span>{formData?.innovation_country}</span>
            </div>
            <div className="mx-4">|</div>
            <div>
              <span className="text-muted-foreground mr-2">Cost:</span>
              <span>
                {formData?.innovation_cost
                  ? formData?.currency + " " + formData?.innovation_cost
                  : "Not available"}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-2 justify-center max-w-[900px] mt-6 md:mt-3 text-sm tracking-wide mx-auto gap-y-3">
            <div className="flex items-center">
              <span className="text-muted-foreground mr-2">Value Chain:</span>
              <span className="flex gap-x-2">
                {formData?.innovation_value_chain.map(
                  (chain: any, index: number) => (
                    <Capsule key={index}>{chain}</Capsule>
                  )
                )}
              </span>
            </div>
            <div className="mx-4 hidden md:block">|</div>
            <div className="flex items-center">
              <span className="text-muted-foreground mr-2">
                Implementation Phase:
              </span>
              <span className="flex gap-x-2">
                <Capsule>{formData?.innovation_phase}</Capsule>
              </span>
            </div>
            <div className="mx-4 hidden md:block">|</div>
            <div className="flex items-center">
              <span className="text-muted-foreground mr-2">Usage:</span>
              <span className="flex gap-x-2">
                {formData?.product_usage
                  .split(",")
                  .map((use: any, index: number) => (
                    <Capsule key={index}>{use}</Capsule>
                  ))}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <RenderMediaList
            media={formData?.product_media}
            featuredClassName="w-full max-w-[900px] mx-auto"
            listClassName="rounded-md h-[65px] w-[68px] md:h-[120px] md:w-full lg:h-[200px]"
          />
        </div>

        <div>
          <div className="mt-10">
            <h2 className="text-2xl text-muted-foreground">Description</h2>
            <p className="leading-8">{formData?.product_description}</p>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl text-muted-foreground mb-5">
              Additional Info
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="px-3 font-semibold">
                  How to Use
                </AccordionTrigger>
                <AccordionContent className="mt-5 px-6">
                  {formData?.isInstruction ? (
                    <ul className="flex flex-col gap-4">
                      {formData?.instructions?.map((step: any, i: number) => (
                        <li key={i}>
                          <span className="font-semibold">
                            {" "}
                            Step {i + 1}:{"  "}
                          </span>
                          {step.instruction_step}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center text-muted-foreground">
                      --- No data ----
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="px-3 font-semibold">
                  Contact Supplier
                </AccordionTrigger>
                <AccordionContent className="mt-5 px-6 space-y-4">
                  {formData?.isSupplier ? (
                    <>
                      {formData?.supplier.map((supplier: any, i: number) => (
                        <div
                          key={i}
                          className="text-[14px] leading-[22px] mb-3"
                        >
                          <h2 className="text-[#888888] text-[16px] mb-2">
                            Contact {i + 1}
                          </h2>
                          <ul className="flex flex-col gap-2">
                            <li>
                              <span className="text-[#888888]">Name</span>{" "}
                              {supplier.supplier_name}
                            </li>
                            <li>
                              <span className="text-[#888888]">Email</span>{" "}
                              {supplier.supplier_email}
                            </li>
                            <li>
                              <span className="text-[#888888]">Phone</span>{" "}
                              {supplier.supplier_contact}
                            </li>
                          </ul>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="text-center text-muted-foreground flex justify-center items-center">
                      --- No data ----
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="px-3 font-semibold">
                  Contact Inventor
                </AccordionTrigger>
                <AccordionContent className="mt-5 px-6">
                  {formData?.isInventor ? (
                    <>
                      {formData?.inventor.map((inventor: any, i: number) => (
                        <div
                          key={i}
                          className="text-[14px] leading-[22px] mb-3"
                        >
                          <h2 className="text-[#888888] text-[16px] mb-2">
                            Contact {i + 1}
                          </h2>
                          <ul className="flex flex-col gap-2">
                            <li>
                              <span className="text-[#888888]">Name</span>{" "}
                              {inventor.inventor_name}
                            </li>
                            <li>
                              <span className="text-[#888888]">Email</span>{" "}
                              {inventor.inventor_email}
                            </li>
                            <li>
                              <span className="text-[#888888]">Phone</span>{" "}
                              {inventor.inventor_contact}
                            </li>
                          </ul>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="text-center text-muted-foreground">
                      --- No data ----
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="px-3 font-semibold">
                  Usage Examples
                </AccordionTrigger>
                <AccordionContent className="mt-5 px-6">
                  {formData?.isUsageExample ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {formData?.instances?.map((example: any, i: number) => (
                        <div key={i} className="text-center">
                          <RenderMedia
                            media={example.instance_media[0]}
                            key={i}
                            className="w-full max-w-[250px] mx-auto h-[90px] md:h-[100px] object-cover"
                          />
                          {example.instance_description}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground">
                      --- No data ----
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="px-3 font-semibold">
                  HSE Guideline
                </AccordionTrigger>
                <AccordionContent className="mt-5 px-6">
                  {formData?.isHSEGuidelines ? (
                    <ul>
                      {formData?.hseguidelines.map(
                        (guideline: any, i: number) => (
                          <li key={i}>{guideline.name}</li>
                        )
                      )}
                    </ul>
                  ) : (
                    <div className="text-center text-muted-foreground">
                      --- No data ----
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="px-3 font-semibold">
                  <div className="flex gap-2 items-center">
                    <span>Gender Friendly</span>
                    {formData?.isGenderFriendly ? (
                      <FaCheckCircle className="text-mygreen" />
                    ) : (
                      <X color="red" />
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="mt-5 px-6">
                  {formData?.isGenderFriendly ? (
                    <p>{formData?.gender_description}</p>
                  ) : (
                    <div className="text-center text-muted-foreground">
                      --- No data ----
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      <div className="my-10 flex justify-end gap-4">
        <Button
          className="text-white bg-[#329632] rounded-xl text-[16px] leading-[22px] font-bold disabled:cursor-not-allowed"
          size="large"
          type="text"
          onClick={prevStep}
          disabled={currentStep < 1 || loading}
        >
          Go Back to Edit
        </Button>
        <Button
          className="text-white bg-myblack rounded-xl text-[16px] leading-[22px] font-bold disabled:cursor-not-allowed"
          size="large"
          type="primary"
          loading={loading}
          disabled={loading}
          onClick={handleNextStep}
        >
          Submit Innovation
        </Button>
      </div>
    </div>
  );
};

export default StepPreview;
