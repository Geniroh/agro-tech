import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const UserInnovationSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i}>
          <div className="flex flex-col gap-3 cursor-pointer">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              <div className="flex flex-col items-start md:items-center gap-3 ">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-[32px] h-[32px] rounded-[8px] flex justify-center items-center text-white bg-cover bg-center bg-no-repeat" />

                  <div>
                    <Skeleton className="w-[150px] h-3" />
                  </div>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground text-[14px]">
                  Posted <Skeleton className="w-[60px] h-3" />
                </div>
              </div>

              <div className="">
                <Skeleton className="w-full h-3" />
              </div>
            </div>

            <div className="space-y-1">
              <Skeleton className="w-full h-2" />
              <Skeleton className="w-full h-2" />
              <Skeleton className="w-full h-2" />
              <Skeleton className="w-full h-2" />
              <Skeleton className="w-full h-2" />
              <Skeleton className="w-full h-2" />
              <Skeleton className="w-full h-2" />
              <Skeleton className="w-full h-2" />
              <Skeleton className="w-full h-2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
