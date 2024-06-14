import { LayoutSigned } from "~/components/system/layouts/LayoutSigned";
import { RankingSideBar } from "~/components/template/layouts/RankingSideBar";
import { CategoriesSideBar } from "~/components/template/layouts/CategoriesSideBar";
import { useSearchStore } from "~/stores/useSearchStore";
import Image from "next/image";
import { vendors } from "~/lib/vendors";
import { Star } from "lucide-react";
import Link from "next/link";

const VendorCard = ({
  name,
  description,
  image,
  rating,
}: {
  name: string;
  description: string;
  image: string;
  rating: number;
}) => {
  return (
    <div className="relative flex h-fit w-full flex-col items-center gap-6 rounded-2xl border border-slate-300 pb-6">
      <div className="relative h-40 w-full">
        <Image
          className="rounded-tl-lg rounded-tr-lg"
          src={image}
          alt="Vendor Image"
          objectFit="cover"
          fill
        />
      </div>
      <div className="w-full">
        <div className="text-center text-sm font-medium text-zinc-800">
          {name}
        </div>
        <div className="text-center text-xs font-normal text-neutral-400">
          {description}
        </div>
      </div>
      <div className="flex w-full items-center justify-center">
        <Link
          href={`/details/${name}`}
          className=" rounded-2xl bg-blue-950 p-3 px-4 text-xs font-medium text-white shadow transition duration-150 ease-in-out hover:-translate-y-2"
        >
          See Details
        </Link>
      </div>
      <div className="absolute right-[16px] top-[16px] flex items-center justify-center gap-[5px] rounded-2xl bg-white p-[5px]">
        <span className="inline-flex text-xs font-normal text-blue-950">
          {rating} stars
        </span>
        <Star size={12} className="fill-white stroke-blue-950" />
      </div>
    </div>
  );
};

export default function Dashboard() {
  const { search, categoryId, ranking } = useSearchStore();

  return (
    <LayoutSigned>
      <section className="flex gap-8 divide-x-2 p-8">
        {/* sidebar */}
        <div className="flex w-1/4 flex-col gap-8 border-slate-700">
          <RankingSideBar />
          <CategoriesSideBar />
        </div>
        {/* results */}
        <div className="flex w-full flex-col gap-8 pl-8">
          <h1 className="flex items-center gap-3 text-base font-bold text-blue-950">
            <h3>Results</h3>
            <div className="inline-flex h-3.5 w-[38px] items-center justify-center gap-2.5 rounded-2xl border border-indigo-400 px-[13px]">
              <div className="text-[10px] font-normal text-zinc-800">4</div>
            </div>
          </h1>
          <div className="grid w-full grid-cols-1 items-end justify-start gap-4  md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {vendors.map((vendor) => (
              <VendorCard key={vendor.name} {...vendor} />
            ))}
          </div>
        </div>
      </section>
    </LayoutSigned>
  );
}
