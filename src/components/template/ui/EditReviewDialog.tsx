import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { api } from "~/utils/api";
import { toast } from "@/components/ui/use-toast";
import { Review, type ReviewFormI } from "../forms/Review";

export const EditReviewDialog = ({
  review,
  open,
  setOpen,
}: {
  review: ReviewFormI;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  // use the `useMutation` hook to update a mutation
  const ctx = api.useUtils();

  const { mutate: updateReview, isLoading } = api.review.update.useMutation({
    onSuccess: () => {
      ctx.vendor.get.invalidate().catch((err) => {
        console.error(err);
      });
      toast({ title: "Review updated" });
      setOpen(false);
    },
    onError: (err) => {
      const errorMessage = err?.data?.zodError?.fieldErrors?.content?.[0];
      toast({
        title: errorMessage ?? "Something went wrong. Please try again later.",
      });
    },
  });

  const handleSubmit = (data: ReviewFormI) => {
    // handle submit
    const { comment, title, rating } = data;

    if (!review.id) {
      toast({
        title: "No review ID.",
      });
      return;
    }
    updateReview({
      comment,
      title,
      rating,
      id: review.id,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogPortal>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit review</DialogTitle>
          </DialogHeader>
          <Review
            defaultData={review}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
