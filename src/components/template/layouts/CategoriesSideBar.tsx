import React from "react";
import { useSearchStore } from "~/stores/useSearchStore";
import { categories } from "~/lib/categories";
import { Button } from "@/components/ui/button";

const RadioButton = ({
  handleChange,
  checked,
  label,
}: {
  handleChange: () => void;
  checked: boolean;
  label: string;
}) => (
  <div className="flex w-full items-center justify-between">
    <div
      className={`flex cursor-pointer items-center gap-2 ${
        checked ? "text-blue-950" : "text-slate-950"
      }`}
      onClick={handleChange}
    >
      <input
        type="radio"
        name="category"
        id={label}
        checked={checked}
        onChange={handleChange}
        className="h-2.5 w-2.5 rounded-full border border-zinc-800"
      />
      <label
        htmlFor={label}
        className="font-['Noto Sans JP'] text-sm font-medium text-zinc-800"
      >
        {label}
      </label>
    </div>
    <div className="inline-flex h-3.5 w-[38px] items-center justify-center gap-2.5 rounded-2xl border border-indigo-400 px-[13px]">
      <div className="font-['Noto Sans JP'] text-[10px] font-normal text-zinc-800">
        45
      </div>
    </div>
  </div>
);

export const CategoriesSideBar = () => {
  const { categoryId, setCategoryId } = useSearchStore();
  const [isExpanded, setIsExpanded] = React.useState(false);

  const categoriesToDisplay = isExpanded ? categories : categories.slice(0, 5);

  return (
    <div className="flex flex-col gap-8">
      {/* category section */}
      <div className="flex flex-col gap-6">
        <div className="font-['Noto Sans JP'] text-base font-bold text-blue-950">
          Category
        </div>
        {/* categories radio buttons */}
        <div className="flex flex-col gap-2">
          {/* show all option */}
          <RadioButton
            checked={categoryId === 0}
            handleChange={() => setCategoryId(0)}
            label="Show all"
          />
          {/* rest of options */}
          {categoriesToDisplay.map((category, index) => (
            <RadioButton
              key={index}
              checked={categoryId === index}
              handleChange={() => setCategoryId(index)}
              label={category.name}
            />
          ))}
          {/* see more button */}
          <Button
            onClick={() => setIsExpanded((prev) => !prev)}
            variant={"ghost"}
            className="font-['Noto Sans JP'] w-full text-sm font-normal text-indigo-400"
          >
            {isExpanded ? "See less" : "See more"}
          </Button>
        </div>
      </div>
    </div>
  );
};
