import { Button } from "@/components/ui/button";
import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { useReviewsStore } from "~/stores/useReviewsStore";
import { api } from "~/utils/api";
import { Review } from "../ui/Review";

export const ReviewsDrawer = () => {
  const { vendorId } = useReviewsStore();
  const { data: vendor, isLoading } = api.vendor.get.useQuery({
    id: vendorId,
  });

  if (!vendor) return <></>;

  return (
    <DrawerContent className="left-auto right-0 top-0 mt-0 h-screen w-full overflow-y-auto overflow-x-hidden rounded-none px-4 md:w-[75%] lg:w-[70%] xl:w-[40%]">
      <DrawerHeader>
        <DrawerTitle>Reviews</DrawerTitle>
      </DrawerHeader>
      <ScrollArea>
        <div className="flex flex-col gap-8 p-4">
          {vendor.reviews?.map((review) => (
            <Review
              key={review.id}
              title={review.title}
              comment={review.comment}
              rating={review.rating}
              userImage={
                review.user?.image ?? "https://via.placeholder.com/42x42"
              }
              name={review.user?.name ?? "Anonymous"}
              count={review.user._count.reviews}
              date={review.createdAt.toLocaleDateString()}
            />
          ))}
        </div>
      </ScrollArea>
    </DrawerContent>
  );
};
