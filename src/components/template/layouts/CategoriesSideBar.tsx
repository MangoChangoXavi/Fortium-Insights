import React from "react";
import { useSearchStore } from "~/stores/useSearchStore";
import { Button } from "@/components/ui/button";
import { api } from "~/utils/api";

const RadioButton = ({
  handleChange,
  checked,
  label,
  count,
}: {
  handleChange: () => void;
  checked: boolean;
  label: string;
  count: number;
}) => (
  <div className="flex w-full items-center justify-between">
    <div
      className={`flex cursor-pointer items-center gap-2 ${
        checked ? "text-[#093061]" : "text-slate-950"
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
      <label htmlFor={label} className="text-sm font-medium text-zinc-800">
        {label}
      </label>
    </div>
    <div className="inline-flex h-3.5 w-[38px] items-center justify-center gap-2.5 rounded-2xl border border-indigo-400 px-[13px]">
      <div className="text-[10px] font-normal text-zinc-800">{count}</div>
    </div>
  </div>
);

export const CategoriesSideBar = () => {
  const { categoryId, setCategoryId } = useSearchStore();
  const [isExpanded, setIsExpanded] = React.useState(false);

  // Get categories
  const { data: categories } = api.category.getAll.useQuery();
  const categoriesToDisplay = isExpanded ? categories : categories?.slice(0, 5);

  return (
    <div className="flex flex-col gap-8">
      {/* category section */}
      <div className="flex flex-col gap-6">
        <div className="text-base font-bold text-[#093061]">Category</div>
        {/* categories radio buttons */}
        <div className="flex flex-col gap-2">
          {/* show all option */}
          <RadioButton
            checked={categoryId === 0}
            label="Show all"
            handleChange={() => setCategoryId(0)}
            count={
              categories?.reduce((acc, curr) => acc + curr._count.vendors, 0) ??
              0
            }
          />
          {/* rest of options */}
          {categoriesToDisplay && categoriesToDisplay.length > 0 ? (
            categoriesToDisplay
              .sort((a, b) => String(a.name).localeCompare(b.name))
              .map((category, index) => (
                <RadioButton
                  key={index}
                  checked={categoryId === index + 1}
                  handleChange={() => setCategoryId(index + 1)}
                  label={category.name}
                  count={category._count.vendors}
                />
              ))
          ) : (
            <></>
          )}
          {/* see more button */}
          {categories && categories.length > 5 ? (
            <Button
              onClick={() => setIsExpanded((prev) => !prev)}
              variant={"ghost"}
              className="w-full text-sm font-normal text-indigo-400"
            >
              {isExpanded ? "See less" : "See more"}
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
