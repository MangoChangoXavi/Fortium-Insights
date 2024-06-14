import { EditIcon, Star } from "lucide-react";
import React from "react";
import Image from "next/image";

export const Review = ({
  name,
  count,
  reviewTitle,
  reviewBody,
  date,
  rank,
  onEdit,
}: {
  name: string;
  count: number;
  date: string;
  rank: number;
  reviewTitle: string;
  reviewBody: string;
  onEdit?: () => void;
}) => {
  return (
    <div className="flex justify-between">
      {/* user and review */}
      <div className="flex flex-col gap-4">
        {/* user */}
        <div className="flex gap-4">
          {/* image */}
          <Image
            alt="User Image"
            width={42}
            height={42}
            className="rounded-full"
            src="https://via.placeholder.com/42x42"
          />
          {/* name and count */}
          <div className="flex flex-col gap-0">
            <span className="text-base font-medium text-zinc-800">{name}</span>
            <span className="text-sm font-normal text-neutral-400">
              {count} Reviews
            </span>
          </div>
          {/* editable */}
          {onEdit && (
            <button onClick={onEdit}>
              <EditIcon
                size={18}
                className="stroke-[#093061] hover:stroke-blue-700"
              />
            </button>
          )}
        </div>
        {/* review */}
        <div className="h-20 w-full">
          <span className="text-sm font-bold text-zinc-800">
            {reviewTitle}
            <br />
          </span>
          <span className="text-sm font-medium text-zinc-800">
            {reviewBody} <br />
          </span>
        </div>
      </div>
      {/* date and rank */}
      <div className="flex flex-col gap-1">
        {/* date */}
        <span className="text-right text-sm font-normal text-[#093061]">
          {date}
        </span>
        {/* rank */}
        <div className="inline-flex items-center justify-end gap-1">
          {new Array(rank).fill(0).map((_, i) => (
            <Star
              key={i}
              size={16}
              className="fill-yellow-500/80 stroke-yellow-500/80"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
