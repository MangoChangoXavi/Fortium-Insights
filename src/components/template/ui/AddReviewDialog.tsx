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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Star, PlusSquareIcon } from "lucide-react";

const DialogReview = ({
  selectedRanking,
  setSelectedRanking,
}: {
  selectedRanking: number;
  setSelectedRanking: (value: number) => void;
}) => {
  return (
    <>
      <div className="mb-8 mt-2 flex w-full flex-col gap-6">
        <hr className="bg-[#e1e1e1]" />
        <div className="grid w-full grid-cols-2 gap-8">
          <div className="flex flex-col gap-3">
            <Label>Title</Label>
            <Input />
          </div>
          <div className="flex flex-col gap-3">
            <Label>Rank</Label>
            <div className="flex gap-1">
              {new Array(5).fill(0).map((_, i) => (
                <button key={i} onClick={() => setSelectedRanking(i + 1)}>
                  <Star
                    size={24}
                    className={`stroke-[#093061] hover:stroke-blue-700 ${
                      i < selectedRanking
                        ? "fill-[#093061]"
                        : "fill-transparent"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="grid w-full grid-cols-1 gap-8">
          <div className="flex flex-col gap-3">
            <Label>Description</Label>
            <Textarea />
          </div>
        </div>
      </div>
    </>
  );
};

export const AddReviewDialog = () => {
  const [selectedRanking, setSelectedRanking] = useState(0);
  return (
    <Dialog>
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
          <DialogReview
            selectedRanking={selectedRanking}
            setSelectedRanking={setSelectedRanking}
          />
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
