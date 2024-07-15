import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const CollectionGridSkeleton = () => {
  return (
    <div className="w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i}>
          <Skeleton
            className={`w-full max-w-[378px] mx-auto h-[230px] md:h-[250px] bg-no-repeat bg-cover bg-center rounded-2xl p-8 relative bg-[#a8cda1]`}
          ></Skeleton>
          <div className="mt-5 max-w-[378px] mx-auto">
            <div className="flex items-start justify-between mb-4">
              <Skeleton className="text-[18px] leading-[27px] font-semibold md:underline w-[150px]" />
              <Skeleton className="text-muted-foreground text-[14px] leading-[24px] text-nowrap w-[80px]" />
            </div>
            <div className="w-full flex gap-2">
              <Skeleton className="h-2 w-[80px] rounded-md" />
              <Skeleton className="h-2 w-[80px] rounded-md" />
              <Skeleton className="h-2 w-[80px] rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
