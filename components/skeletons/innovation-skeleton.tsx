"use client";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import BreadcrumbP from "@/components/general/my-breadcrumb";

export const InnovationSkeleton = () => {
  return (
    <>
      <div className="container pb-20">
        <BreadcrumbP
          fromHref="/"
          fromTitle="Back to Home"
          toHref=""
          toTitle="Upload Invention Page"
        />

        <div className="w-full">
          <div>
            <h1 className="w-full text-center text-4xl font-playfair font-semibold">
              <Skeleton className="w-[200px] mx-auto h-4" />
            </h1>
          </div>
          <div className="flex flex-wrap items-center justify-center max-w-[1200px] mt-7 text-sm tracking-wide mx-auto gap-y-2">
            <div className="flex">
              <span className="text-muted-foreground mr-2">Inventor:</span>
              <Skeleton className="w-[20px] h-2 rounded-md" />
            </div>
            <div className="mx-4">|</div>
            <div className="flex ">
              <span className="text-muted-foreground mr-2">Year Invented:</span>
              <Skeleton className="w-[20px] h-2 rounded-md" />
            </div>
            <div className="mx-4 hidden md:block">|</div>
            <div className="flex">
              <span className="text-muted-foreground mr-2">Country:</span>
              <Skeleton className="w-[20px] h-2 rounded-md" />
            </div>
            <div className="mx-4">|</div>
            <div className="flex">
              <span className="text-muted-foreground mr-2">Cost:</span>
              <Skeleton className="w-[20px] h-2 rounded-md" />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-2 justify-center max-w-[900px] mt-6 md:mt-3 text-sm tracking-wide mx-auto gap-y-3">
            <div className="flex items-center">
              <span className="text-muted-foreground mr-2">Value Chain:</span>
              <span className="flex gap-x-2">
                <Skeleton className="w-[20px] h-2 rounded-md" />
                <Skeleton className="w-[20px] h-2 rounded-md" />
              </span>
            </div>
            <div className="mx-4 hidden md:block">|</div>
            <div className="flex items-center">
              <span className="text-muted-foreground mr-2">
                Implementation Phase:
              </span>
              <span className="flex gap-x-2">
                <Skeleton className="w-[20px] h-2 rounded-md" />
              </span>
            </div>
            <div className="mx-4 hidden md:block">|</div>
            <div className="flex items-center">
              <span className="text-muted-foreground mr-2">Usage:</span>
              <span className="flex gap-x-2">
                <Skeleton className="w-[20px] h-2 rounded-md" />
              </span>
            </div>
          </div>
        </div>

        <Skeleton className="w-full border shadow-sm rounded-md mt-5 max-w-[1000px] mx-auto h-[25px] flex items-center justify-between px-2" />

        <Skeleton className="mt-8 w-full h-[200px]" />

        <div>
          <div className="mt-10">
            <h2 className="text-2xl text-muted-foreground">Description</h2>
            <Skeleton className="w-[80%] h-5" />
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
                <AccordionContent className="mt-5 px-6"></AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="px-3 font-semibold">
                  Contact Supplier
                </AccordionTrigger>
                <AccordionContent className="mt-5 px-6 space-y-4"></AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="px-3 font-semibold">
                  Contact Inventor
                </AccordionTrigger>
                <AccordionContent className="mt-5 px-6"></AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="px-3 font-semibold">
                  Usage Examples
                </AccordionTrigger>
                <AccordionContent className="mt-5 px-6"></AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="px-3 font-semibold">
                  HSE Guideline
                </AccordionTrigger>
                <AccordionContent className="mt-5 px-6"></AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="px-3 font-semibold">
                  <div className="flex gap-2 items-center">
                    <span>Gender Friendly</span>
                    <FaCheckCircle className="text-mygreen" />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="mt-5 px-6"></AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
};
