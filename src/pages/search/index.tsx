import { LayoutSigned } from "~/components/system/layouts/LayoutSigned";
import { RankingSideBar } from "~/components/template/layouts/RankingSideBar";
import { CategoriesSideBar } from "~/components/template/layouts/CategoriesSideBar";
import { useSearchStore } from "~/stores/useSearchStore";

export default function Address() {
  const { search, setSearch, categoryId, setCategoryId, ranking, setRanking } =
    useSearchStore();

  return (
    <LayoutSigned>
      <section className="flex p-8">
        {/* sidebar */}
        <div className="flex w-1/4 flex-col gap-8 border-slate-700">
          <RankingSideBar />
          <CategoriesSideBar />
        </div>
        {/* results */}
        <div className="flex w-full flex-col gap-8 ">
          <h1 className="font-['Noto Sans JP'] text-base font-bold text-blue-950">
            Results {search} {categoryId} {ranking}
          </h1>
        </div>
      </section>
    </LayoutSigned>
  );
}
