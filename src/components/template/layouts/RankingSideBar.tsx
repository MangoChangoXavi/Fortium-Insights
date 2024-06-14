import { StarIcon } from "lucide-react";
import React from "react";
import { useSearchStore } from "~/stores/useSearchStore";

const RadioButton = ({
  handleChange,
  checked,
  label,
  numberOfStars,
}: {
  handleChange: () => void;
  checked: boolean;
  label: string;
  numberOfStars: number;
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
          name="ranking"
          id={label}
          checked={checked}
          onChange={handleChange}
          className="h-2.5 w-2.5 rounded-full border border-zinc-800"
        />
        <label
          htmlFor={label}
          className="flex gap-2 text-xs font-normal text-zinc-400"
        >
          <div className="flex">
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
        <div className="text-[10px] font-normal text-zinc-800">45</div>
      </div>
    </div>
  );
};

export const RankingSideBar = () => {
  const { ranking, setRanking } = useSearchStore();
  return (
    <div className="flex flex-col  gap-6">
      <h2 className="text-base font-bold text-[#093061]">Ranking</h2>
      {/* rankings */}
      <div className="flex flex-col gap-3">
        <RadioButton
          handleChange={() => setRanking(0)}
          checked={ranking === 0}
          label="All"
          numberOfStars={0}
        />
        {/* rest of options */}
        {new Array(5).fill(0).map((_, index) => (
          <RadioButton
            key={index}
            handleChange={() => setRanking(index + 1)}
            checked={ranking === index + 1}
            label={index + 1 + " stars"}
            numberOfStars={index + 1}
          />
        ))}
      </div>
    </div>
  );
};
