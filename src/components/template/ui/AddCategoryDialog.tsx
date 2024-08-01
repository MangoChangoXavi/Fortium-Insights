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
import { Category, type CategoryFormI } from "../forms/Category";

export const AddCategoryDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  // use the `useMutation` hook to create a mutation
  const ctx = api.useUtils();
  const { mutate: createCategory, isLoading } = api.category.create.useMutation(
    {
      onSuccess: () => {
        ctx.category.getDataTable.invalidate().catch((err) => {
          console.error(err);
        });
        toast({ title: "Category created" });
        setOpen(false);
      },
      onError: (err) => {
        const errorMessage = err?.data?.zodError?.fieldErrors?.content?.[0];
        toast({
          title:
            errorMessage ?? "Something went wrong. Please try again later.",
        });
      },
    },
  );

  const handleSubmit = (data: CategoryFormI) => {
    const { name } = data;
    createCategory({
      name,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogPortal>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add a category</DialogTitle>
          </DialogHeader>
          <Category handleSubmit={handleSubmit} isLoading={isLoading} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
