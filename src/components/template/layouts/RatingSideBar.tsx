import { StarIcon } from "lucide-react";
import React from "react";
import { useSearchStore } from "~/stores/useSearchStore";
import { api } from "~/utils/api";
import { SkeletonRating } from "../ui/SkeletonRating";

const RadioButton = ({
  handleChange,
  checked,
  label,
  numberOfStars,
  count,
}: {
  handleChange: () => void;
  checked: boolean;
  label: string;
  numberOfStars: number;
  count: number;
}) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div
        className={`flex cursor-pointer items-center gap-2 ${
          checked ? "text-[#093061]" : "text-slate-950"
        }`}
        onClick={handleChange}
      >
        <input
          type="radio"
          name="rating"
          id={label}
          checked={checked}
          onChange={handleChange}
          className="h-2.5 w-2.5 rounded-full border border-zinc-800"
        />
        <label
          htmlFor={label}
          className="flex gap-2 text-xs font-normal text-zinc-400"
        >
          <div className="flex items-center">
            {new Array(numberOfStars).fill(0).map((_, index) => (
              <StarIcon
                key={index}
                className="h-3 w-3 fill-yellow-400/80 stroke-yellow-400/80"
              />
            ))}
            {/* fill with gray stars to complete 5 stars */}
            {numberOfStars > 0 &&
              new Array(5 - numberOfStars)
                .fill(0)
                .map((_, index) => (
                  <StarIcon
                    key={index}
                    className="h-3 w-3 fill-zinc-400 stroke-zinc-400"
                  />
                ))}
          </div>
          {label}
        </label>
      </div>
      <div className="inline-flex h-3.5 w-[38px] items-center justify-center gap-2.5 rounded-2xl border border-indigo-400 px-[13px]">
        <div className="text-[10px] font-normal text-zinc-800">{count}</div>
      </div>
    </div>
  );
};

export const RatingSideBar = () => {
  const { rating, setRating } = useSearchStore();

  // Get ratings
  const { data } = api.vendor.getRatingCounts.useQuery();
  if (!data) return <SkeletonRating />;

  // get stars counts
  const oneStarOrMore =
    data.oneStar +
    data.twoStars +
    data.threeStars +
    data.fourStars +
    data.fiveStars;
  const twoStarsOrMore =
    data.twoStars + data.threeStars + data.fourStars + data.fiveStars;
  const threeStarsOrMore = data.threeStars + data.fourStars + data.fiveStars;
  const fourStarsOrMore = data.fourStars + data.fiveStars;
  const fiveStarsOrMore = data.fiveStars;

  // save to an array to map through
  const ratingsJson = [
    oneStarOrMore,
    twoStarsOrMore,
    threeStarsOrMore,
    fourStarsOrMore,
    fiveStarsOrMore,
  ];

  return (
    <div className="flex flex-col  gap-6">
      <h2 className="text-base font-bold text-[#093061]">Rating</h2>
      {/* ratings */}
      <div className="flex flex-col gap-3">
        {/* rest of options */}
        {new Array(5).fill(0).map((_, index) => (
          <RadioButton
            key={index}
            handleChange={() => setRating(index + 1)}
            checked={rating === index + 1}
            label={index + 1 + " stars"}
            numberOfStars={index + 1}
            count={ratingsJson[index] ?? 0}
          />
        ))}
      </div>
    </div>
  );
};
