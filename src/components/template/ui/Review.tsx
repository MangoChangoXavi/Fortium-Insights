import { EditIcon, Star, StarIcon, TrashIcon } from "lucide-react";
import React from "react";
import Image from "next/image";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";

export const Review = ({
  name,
  count,
  title,
  comment,
  date,
  rating,
  userImage,
  onDelete,
  onEdit,
}: {
  name: string;
  count: number;
  date: string;
  rating: number;
  title: string;
  comment: string;
  userImage: string;
  onDelete?: () => void;
  onEdit?: () => void;
}) => {
  return (
    <div className="card-shadow flex h-[400px] w-full flex-col items-end justify-between rounded-2xl bg-white p-6">
      <div className="flex w-full flex-col items-start justify-start gap-6">
        {/* user details */}
        <div className="inline-flex items-start justify-center gap-4">
          <div className="relative h-12 w-12">
            <Image
              className="h-12 w-12 rounded-full"
              src={userImage}
              objectFit="cover"
              layout="fill"
              alt="user image"
            />
          </div>
          <div className="inline-flex flex-col items-center justify-start">
            <div className="font-['Noto Sans JP'] self-stretch text-base font-medium text-[#2c2c2c]">
              {name}
            </div>
            <div className="font-['Noto Sans JP'] self-stretch text-sm font-normal text-[#999999]">
              {count} Reviews
            </div>
          </div>
        </div>
        {/* ratings */}
        <div className="flex h-[52px] flex-col items-start justify-start gap-2">
          <div className="flex h-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <StarIcon
                key={i}
                className={`h-5 w-5 ${
                  rating <= i - 1
                    ? "fill-[#999999] stroke-[#999999]"
                    : "fill-[#093061] stroke-[#093061]"
                } `}
              />
            ))}
          </div>
          <div className="font-['Noto Sans JP'] self-stretch text-sm font-normal text-[#093061]">
            {date}
          </div>
        </div>
        {/* comment */}
        <div className="flex flex-col items-start justify-start gap-3.5 self-stretch">
          <div className="font-['Noto Sans JP'] self-stretch text-base font-bold text-[#2c2c2c]">
            {title}
          </div>
          <div className="font-['Noto Sans JP'] self-stretch text-sm font-normal text-[#2c2c2c]">
            {comment}
          </div>
        </div>
      </div>
      {/* action buttons */}
      {onDelete && (
        <button
          onClick={onDelete}
          className="flex h-10 w-10 flex-row items-center justify-center rounded-lg bg-red-500 hover:bg-red-700"
        >
          <TrashIcon className="h-4 w-4 stroke-white" />
        </button>
      )}
    </div>
  );
};
