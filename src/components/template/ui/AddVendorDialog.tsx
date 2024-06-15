import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "~/utils/api";
import { Vendor, type VendorFormI } from "../forms/Vendor";
import { toast } from "@/components/ui/use-toast";
import { uploadFile } from "~/utils/functions";

export const AddVendorDialog = () => {
  const [open, setOpen] = React.useState(false);
  // use the `useMutation` hook to create a mutation
  const ctx = api.useUtils();
  const { mutate: createVendor, isLoading } = api.vendor.create.useMutation({
    onSuccess: () => {
      ctx.vendor.get.invalidate().catch((err) => {
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
        ctx.vendor.get.invalidate().catch((err) => {
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
    const vendorUrls = await Promise.all(
      Array.from(vendorFiles).map((file) => uploadFile(file)),
    );
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <span className="w-full text-base font-normal text-white hover:underline">
          Add new vendor{" "}
        </span>
      </DialogTrigger>
      <DialogPortal>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add new vendor</DialogTitle>
          </DialogHeader>
          <Vendor
            handleSubmit={handleSubmit}
            isLoading={isLoading || isLoadingWithCategory}
          />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
