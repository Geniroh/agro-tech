import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const UserCommentSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center gap-3">
            <Skeleton className="w-[40px] h-[40px] rounded-full" />
            <div>
              <Skeleton className="w-[150px] h-2" />
            </div>
            <div className="text-muted-foreground text-[14px]">Replied</div>
          </div>

          <div className="text-muted-foreground text-[14px] flex items-center gap-x-2">
            Posted <Skeleton className="w-[150px] h-2" />
          </div>
        </div>

        <div>
          {" "}
          <Skeleton className="w-full h-2" />
        </div>

        <div>
          <Skeleton className="w-full h-2" />
        </div>
      </div>
    </div>
  );
};
