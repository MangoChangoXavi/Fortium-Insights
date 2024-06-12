import Image from "next/image";
import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { categories } from "~/lib/categories";
import { useSearchStore } from "~/stores/useSearchStore";
import { useRouter } from "next/router";
import { Loader } from "~/components/system/layouts/Loader";

export const CategoriesBar = () => {
  const { setCategoryId } = useSearchStore();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleCategoryClick = async (categoryId: number) => {
    setLoading(true);
    setCategoryId(categoryId);
    await router.push("/search");
  };

  return (
    <ScrollArea className="w-screen whitespace-nowrap ">
      <div className="flex w-max  space-x-4 p-4">
        {loading ? (
          <div className="flex w-screen items-center justify-center">
            <Loader />
          </div>
        ) : (
          categories
            .sort((a, b) => String(a.name).localeCompare(b.name))
            .map((category, index) => (
              <button
                onClick={() => handleCategoryClick(index + 1)}
                key={index}
                className="group inline-flex cursor-pointer  flex-col items-center justify-start gap-4"
              >
                <Image
                  alt="category"
                  className="h-[100px] w-[100px] rounded-full transition duration-150 ease-in-out group-hover:scale-110"
                  src={category.imageUrl}
                  width={100}
                  height={100}
                />
                <div className="text-base font-medium text-blue-950 transition duration-150 ease-in-out group-hover:scale-110">
                  {category.name}
                </div>
              </button>
            ))
        )}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
