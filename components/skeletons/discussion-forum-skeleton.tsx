"use client";
import React, { useState } from "react";
import BreadcrumbP from "@/components/general/my-breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { UserCommentSkeleton } from "./user-comment-skeleton";

export const DiscussionForumSkeleton = () => {
  return (
    <>
      <main className="container pb-20">
        <div>
          <BreadcrumbP
            toHref="/discussion"
            toTitle={`Discussion`}
            fromHref="/discussion"
            fromTitle="Back to HomePage/ ForumPage"
          />

          <div className="max-w-[782px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center gap-4">
                <Skeleton className="w-[40px] h-[40px] rounded-full" />
                <Skeleton className="w-[150px] h-2" />
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                <div className="text-[14px]">Created A Discussion posted </div>
                <div className="text-muted-foreground text-[14px]">
                  <Skeleton className="w-[150px] h-2" />
                </div>
              </div>
            </div>

            <div className="mt-5">
              <h1 className="text-[18px]">
                {" "}
                <Skeleton className="w-[250px] h-2" />
              </h1>
              <p className="text-muted-foreground mt-3 leading-[24px]">
                <Skeleton className="w-[150px] h-2" />
              </p>
            </div>

            <div>
              <Skeleton className="w-full border shadow-sm rounded-md mt-5 max-w-[1000px] mx-auto h-[35px] flex items-center justify-between px-2" />
            </div>
          </div>

          <div className="space-y-4 mt-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <UserCommentSkeleton key={i} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};
