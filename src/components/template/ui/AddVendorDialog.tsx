import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { api } from "~/utils/api";
import { Vendor, type VendorFormI } from "../forms/Vendor";
import { toast } from "@/components/ui/use-toast";
import { uploadFile } from "~/utils/functions";

export const AddVendorDialog = ({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) => {
  // use the `useMutation` hook to create a mutation
  const ctx = api.useUtils();
  const { mutate: createVendor, isLoading } = api.vendor.create.useMutation({
    onSuccess: () => {
      ctx.vendor.getAll.invalidate().catch((err) => {
        console.error(err);
      });
      toast({ title: "Vendor created" });
      setOpen(false);
    },
    onError: (err) => {
      const errorMessage = err?.data?.zodError?.fieldErrors?.content?.[0];
      toast({
        title: errorMessage ?? "Something went wrong. Please try again later.",
      });
    },
  });

  const { mutate: createVendorWithCategory, isLoading: isLoadingWithCategory } =
    api.vendor.createWithCategory.useMutation({
      onSuccess: () => {
        ctx.vendor.getAll.invalidate().catch((err) => {
          console.error(err);
        });
        toast({ title: "Vendor and category created" });
        setOpen(false);
      },
      onError: (err) => {
        const errorMessage = err?.data?.zodError?.fieldErrors?.content?.[0];
        toast({
          title:
            errorMessage ?? "Something went wrong. Please try again later.",
        });
      },
    });
  const handleSubmit = async (data: VendorFormI) => {
    // handle submit
    const { category, description, name, isNewCategory, vendorFiles } = data;

    // upload files to vercel blob
    const vendorUrls = vendorFiles
      ? await Promise.all(
          Array.from(vendorFiles).map((file) => uploadFile(file)),
        )
      : [];
    const vendorImgUrl = vendorUrls[0] ?? "";

    // create with category
    if (isNewCategory) {
      createVendorWithCategory({
        category,
        description,
        name,
        vendorImgUrl,
      });
    } else {
      createVendor({
        categoryId: category,
        description,
        name,
        vendorImgUrl,
      });
    }
  };

  return (
    <DialogPortal>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add new vendor</DialogTitle>
        </DialogHeader>
        <Vendor
          handleSubmit={handleSubmit}
          setOpen={setOpen}
          isLoading={isLoading || isLoadingWithCategory}
        />
      </DialogContent>
    </DialogPortal>
  );
};
