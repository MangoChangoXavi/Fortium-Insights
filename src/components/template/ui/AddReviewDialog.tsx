import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusSquareIcon } from "lucide-react";
import { Review, type ReviewFormI } from "../forms/Review";
import { api } from "~/utils/api";
import { toast } from "@/components/ui/use-toast";

export const AddReviewDialog = ({ vendorId }: { vendorId: string }) => {
  const [open, setOpen] = React.useState(false);
  // use the `useMutation` hook to create a mutation
  const ctx = api.useUtils();
  const { mutate: createReview, isLoading } = api.review.create.useMutation({
    onSuccess: () => {
      ctx.vendor.get.invalidate().catch((err) => {
        console.error(err);
      });
      toast({ title: "Review created" });
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
    const { comment, title, rating } = data;
    createReview({
      comment,
      title,
      rating,
      vendorId,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <button>
          <PlusSquareIcon
            size={18}
            className="stroke-[#093061] hover:stroke-blue-700"
          />
        </button>
      </DialogTrigger>
      <DialogPortal>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add a review</DialogTitle>
          </DialogHeader>
          <Review handleSubmit={handleSubmit} isLoading={isLoading} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
