import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { api } from "~/utils/api";
import { Vendor, type VendorFormI } from "../forms/Vendor";
import { toast } from "@/components/ui/use-toast";
import { uploadFile } from "~/utils/functions";

export const EditVendorDialog = ({
  vendor,
  open,
  setOpen,
}: {
  vendor: VendorFormI;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  // use the `useMutation` hook to update a mutation
  const ctx = api.useUtils();
  const { mutate: updateVendor, isLoading } = api.vendor.update.useMutation({
    onSuccess: () => {
      ctx.vendor.get.invalidate().catch((err) => {
        console.error(err);
      });
      toast({ title: "Vendor updated" });
      setOpen(false);
    },
    onError: (err) => {
      const errorMessage = err?.data?.zodError?.fieldErrors?.content?.[0];
      toast({
        title: errorMessage ?? "Something went wrong. Please try again later.",
      });
    },
  });

  const { mutate: updateVendorWithCategory, isLoading: isLoadingWithCategory } =
    api.vendor.updateWithCategory.useMutation({
      onSuccess: () => {
        ctx.vendor.get.invalidate().catch((err) => {
          console.error(err);
        });
        toast({ title: "Vendor and category updated" });
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
    let vendorImgUrl = vendor.vendorImgUrl ?? "";
    if (vendorFiles) {
      const vendorUrls = await Promise.all(
        Array.from(vendorFiles).map((file) => uploadFile(file)),
      );
      vendorImgUrl = vendorUrls[0] ?? "";
    }

    // update with category
    if (isNewCategory && vendor.id) {
      updateVendorWithCategory({
        category,
        description,
        name,
        vendorImgUrl,
        id: vendor.id,
      });
    } else if (vendor.id) {
      updateVendor({
        categoryId: category,
        description,
        name,
        vendorImgUrl,
        id: vendor.id,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogPortal>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit new vendor</DialogTitle>
          </DialogHeader>
          <Vendor
            setOpen={setOpen}
            defaultData={vendor}
            handleSubmit={handleSubmit}
            isLoading={isLoading || isLoadingWithCategory}
          />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
