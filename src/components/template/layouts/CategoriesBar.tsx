import Image from "next/image";
import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export interface Category {
  name: string;
  imageUrl: string;
}
const categories: Category[] = [
  { name: "AI and ML", imageUrl: "https://via.placeholder.com/100x100" },
  { name: "Marketing", imageUrl: "https://via.placeholder.com/100x100" },
  { name: "Sales", imageUrl: "https://via.placeholder.com/100x100" },
  { name: "Copywriting", imageUrl: "https://via.placeholder.com/100x100" },
  { name: "Construction", imageUrl: "https://via.placeholder.com/100x100" },
  { name: "Databases", imageUrl: "https://via.placeholder.com/100x100" },
  { name: "Cloud", imageUrl: "https://via.placeholder.com/100x100" },
  { name: "Finance", imageUrl: "https://via.placeholder.com/100x100" },
  { name: "Collaboration", imageUrl: "https://via.placeholder.com/100x100" },
  { name: "Compliance", imageUrl: "https://via.placeholder.com/100x100" },
  { name: "Agriculture", imageUrl: "https://via.placeholder.com/100x100" },
  { name: "Healthcare", imageUrl: "https://via.placeholder.com/100x100" },
  { name: "Education", imageUrl: "https://via.placeholder.com/100x100" },
  { name: "Real Estate", imageUrl: "https://via.placeholder.com/100x100" },
  { name: "Retail", imageUrl: "https://via.placeholder.com/100x100" },
  { name: "Transportation", imageUrl: "https://via.placeholder.com/100x100" },
  { name: "Travel", imageUrl: "https://via.placeholder.com/100x100" },
  { name: "Hospitality", imageUrl: "https://via.placeholder.com/100x100" },
  { name: "Manufacturing", imageUrl: "https://via.placeholder.com/100x100" },
  { name: "Automotive", imageUrl: "https://via.placeholder.com/100x100" },
  { name: "Fashion", imageUrl: "https://via.placeholder.com/100x100" },
  { name: "Entertainment", imageUrl: "https://via.placeholder.com/100x100" },
  { name: "Gaming", imageUrl: "https://via.placeholder.com/100x100" },
  { name: "Sports", imageUrl: "https://via.placeholder.com/100x100" },
  { name: "Music", imageUrl: "https://via.placeholder.com/100x100" },
  { name: "Art", imageUrl: "https://via.placeholder.com/100x100" },
  { name: "Photography", imageUrl: "https://via.placeholder.com/100x100" },
  { name: "Videography", imageUrl: "https://via.placeholder.com/100x100" },
  { name: "Design", imageUrl: "https://via.placeholder.com/100x100" },
  { name: "Development", imageUrl: "https://via.placeholder.com/100x100" },
  { name: "Engineering", imageUrl: "https://via.placeholder.com/100x100" },
  { name: "Architecture", imageUrl: "https://via.placeholder.com/100x100" },
  { name: "Legal", imageUrl: "https://via.placeholder.com/100x100" },
  { name: "Insurance", imageUrl: "https://via.placeholder.com/100x100" },
];

export const CategoriesBar = () => {
  return (
    <ScrollArea className="w-screen whitespace-nowrap ">
      <div className="flex w-max space-x-4 p-4">
        {categories.map((category, index) => (
          <div
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
            <div className="font-['Noto Sans JP'] text-base font-medium text-blue-950 transition duration-150 ease-in-out group-hover:scale-110">
              {category.name}
            </div>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
