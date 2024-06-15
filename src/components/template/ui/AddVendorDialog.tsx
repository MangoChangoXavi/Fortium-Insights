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

export const AddVendorDialog = () => {
  // use the `useMutation` hook to create a mutation
  const ctx = api.useUtils();
  const { mutate: createVendor } = api.vendor.create.useMutation({
    onSuccess: () => {
      ctx.vendor.get.invalidate().catch((err) => {
        console.error(err);
      });
      toast({ title: "Vendor created" });
    },
    onError: (err) => {
      const errorMessage = err?.data?.zodError?.fieldErrors?.content?.[0];
      toast({
        title: errorMessage ?? "Something went wrong. Please try again later.",
      });
    },
  });

  const { mutate: createVendorWithCategory } = api.vendor.create.useMutation({
    onSuccess: () => {
      ctx.vendor.get.invalidate().catch((err) => {
        console.error(err);
      });
      toast({ title: "Vendor and category created" });
    },
    onError: (err) => {
      const errorMessage = err?.data?.zodError?.fieldErrors?.content?.[0];
      toast({
        title: errorMessage ?? "Something went wrong. Please try again later.",
      });
    },
  });
  const handleSubmit = (data: VendorFormI) => {
    // handle submit
    console.log(data);
  };
  return (
    <Dialog>
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
          <Vendor handleSubmit={handleSubmit} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
