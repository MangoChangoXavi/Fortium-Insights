import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { categories } from "~/lib/categories";
import CardGradientDetailsSvg from "~/assets/svg/card-gradient-details.svg";
import { CameraIcon } from "lucide-react";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";

export const AddVendorDialog = () => {
  const [isNewCategory, setIsNewCategory] = React.useState(false);
  return (
    <Dialog>
      <DialogTrigger>
        <button className="text-base font-normal text-white hover:underline">
          Add new vendor{" "}
        </button>
      </DialogTrigger>
      <DialogPortal>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add new vendor</DialogTitle>
          </DialogHeader>
          <div className="mb-8 mt-2 flex w-full flex-col gap-6">
            <hr className="bg-[#e1e1e1]" />
            <div className="grid w-full grid-cols-3 gap-8">
              <div className="col-span-1 flex flex-col gap-3">
                <Label>Is new category?</Label>
                <Switch onClick={() => setIsNewCategory((prev) => !prev)} />
              </div>
              <div className="col-span-2 flex flex-col gap-3">
                <Label>Category</Label>
                {isNewCategory ? (
                  <Input placeholder="Write category name" />
                ) : (
                  <>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.name} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </>
                )}
              </div>
            </div>
            <div className="grid w-full grid-cols-1 gap-8">
              <div className="flex flex-col gap-3">
                <Label>Company Name?</Label>
                <Input placeholder="Vendor name" />
              </div>
            </div>
            <div className="grid w-full grid-cols-1 gap-8">
              <div className="flex flex-col gap-3">
                <Label>Company Details and Contact</Label>
                <Textarea placeholder="Description" />
              </div>
            </div>
          </div>
          <div className="grid w-full grid-cols-1 gap-8">
            <div className="relative h-36 w-full">
              <Image
                src="https://via.placeholder.com/264x160"
                alt="Company Image"
                width={264}
                height={160}
                className="absolute bottom-0 left-0 right-0 mx-auto rounded"
              />
              <Image
                src={CardGradientDetailsSvg}
                alt="Gradient"
                className="absolute bottom-0 left-0 right-0 mx-auto rounded-b"
                width={264}
              />
              <button className="group absolute bottom-4 left-0 right-0 mx-auto">
                <div className=" flex items-center justify-center gap-2">
                  <CameraIcon
                    size={16}
                    className="text-white  transition duration-150 ease-in-out group-hover:text-blue-200"
                  />
                  <span className="font-['Noto Sans JP'] text-sm font-medium text-white transition duration-150 ease-in-out group-hover:text-blue-200 ">
                    Upload cover
                  </span>
                </div>
              </button>
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button
                type="button"
                variant="default"
                className="!rounded-full  !px-8"
              >
                Close
              </Button>
            </DialogClose>
            <Button
              type="button"
              variant="primary"
              className="!rounded-full !px-8"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
