import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const SkeletonRating = () => {
  return (
    <div className="flex flex-col items-start space-y-3">
      <Skeleton className="mb-6 h-4 w-[200px]" />
      <Skeleton className="h-4 w-[150px]" />
      <Skeleton className="h-4 w-[200px]" />
      <Skeleton className="h-4 w-[200px]" />
      <Skeleton className="h-4 w-[200px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  );
};
