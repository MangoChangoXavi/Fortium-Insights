import { LayoutSigned } from "~/components/system/layouts/LayoutSigned";
import { RankingSideBar } from "~/components/template/layouts/RankingSideBar";
import { CategoriesSideBar } from "~/components/template/layouts/CategoriesSideBar";
import { useSearchStore } from "~/stores/useSearchStore";
import Image from "next/image";
import { vendors } from "~/lib/vendors";
import { Star } from "lucide-react";
import Link from "next/link";

export default function Address() {
  const { search, setSearch, categoryId, setCategoryId, ranking, setRanking } =
    useSearchStore();

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
          <h1 className="font-['Noto Sans JP'] flex items-center gap-3 text-base font-bold text-blue-950">
            <h3>Results for: {search}</h3>
            <div className="inline-flex h-3.5 w-[38px] items-center justify-center gap-2.5 rounded-2xl border border-indigo-400 px-[13px]">
              <div className="font-['Noto Sans JP'] text-[10px] font-normal text-zinc-800">
                4
              </div>
            </div>
          </h1>
          <div className=" grid w-full grid-cols-4 items-end justify-start gap-4">
            {vendors.map((vendor) => (
              <div key={vendor.name} className="relative h-[265px] w-[216px]">
                <div className="absolute left-0 top-0 h-[265px] w-[216px] rounded-2xl border border-slate-300" />
                <Image
                  className="absolute left-0 top-0 h-[124px] w-[216px] rounded-tl-lg rounded-tr-lg"
                  src={vendor.image}
                  alt="Vendor Image"
                  width={216}
                  height={124}
                />
                <div className="absolute left-0 top-[145px] h-[35px] w-[216px]">
                  <div className="font-['Noto Sans JP'] absolute left-0 top-0 h-[18px] w-[216px] text-center text-sm font-medium text-zinc-800">
                    {vendor.name}
                  </div>
                  <div className="font-['Noto Sans JP'] absolute left-0 top-[20px] h-[15px] w-[216px] text-center text-xs font-normal text-neutral-400">
                    {vendor.description}
                  </div>
                </div>
                <Link
                  href={`/details/${vendor.name}`}
                  className="absolute left-[24px] top-[201px] flex h-[39px] w-[168px] items-center justify-center rounded-2xl bg-blue-950 text-xs font-medium text-white shadow"
                >
                  See Details
                </Link>
                <div className="absolute left-[140px] top-[17px]  flex  h-3.5 w-fit items-center  justify-center  gap-[5px] rounded-2xl bg-white p-[5px]">
                  <span className="inline-flex text-[10px] font-normal text-blue-950">
                    {vendor.rating} stars
                  </span>
                  <Star size={12} className="fill-white stroke-blue-950" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </LayoutSigned>
  );
}
