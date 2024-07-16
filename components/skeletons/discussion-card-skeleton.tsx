import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const DiscussionCardSkeleton = () => {
  return (
    <div className="py-4 pt-6 border-b">
      <div className="w-full flex flex-col gap-y-2">
        <div className="flex items-center gap-x-3 cursor-pointer">
          <Skeleton className="w-[30px] h-[30px] rounded-full bg-center bg-cover bg-no-repeat" />
          <div className="flex flex-wrap gap-2 items-center">
            <h1 className="text-[16px] leading-[24px] font-semibold text-myblack">
              <Skeleton className="h-2 w-[140px]" />
            </h1>
            <h1 className="text-[14px] leading-[20px] font-semibold text-myblack">
              <Skeleton className="h-2 w-[100px]" />
            </h1>
            <h1 className="text-[14px] leading-[20px] font-semibold text-muted-foreground">
              <Skeleton className="h-2 w-[100px]" />
            </h1>
          </div>
        </div>

        <div className="text-sm space-y-1">
          <Skeleton className="h-1 w-full" />
          <Skeleton className="h-1 w-full" />
          <Skeleton className="h-1 w-full" />
          <Skeleton className="h-1 w-full" />
        </div>

        <div className="flex gap-x-4">
          <Skeleton className="h-2 w-full" />
        </div>
      </div>
    </div>
  );
};
