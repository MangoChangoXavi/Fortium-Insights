import { api, type RouterInputs } from "~/utils/api";
import { type PaginationState } from "@/components/layouts/data-table";
import React from "react";
import "chart.js/auto";
import { UIDebouncer } from "~/components/system/ui/UIDebouncer";
import { SearchIcon } from "lucide-react";
import { LayoutSigned } from "~/components/system/layouts/LayoutSigned";

import { RequirementsForm } from "~/components/template/forms/Requirements";
import { AcmResultDetailCard } from "~/components/template/layouts/AcmResultDetailCard";
import { Loader } from "~/components/system/layouts/Loader";

const ITEMS_PER_PAGE = 15;
type RequirementsGetI = RouterInputs["requirements"]["get"];
export default function Requirements() {
  const [searchParameters, setSearchParemeters] =
    React.useState<RequirementsGetI | null>(null);
  const [search, setSearch] = React.useState<string>("");

  const { data: countData } = api.acm.countFilters.useQuery({
    search,
  });

  const { data, isLoading } = api.requirements.get.useQuery({
    ...searchParameters,
  });

  const handleSubmit = (values: RequirementsGetI) => {
    setSearchParemeters(values);
  };

  return (
    <LayoutSigned>
      <section className="container mx-auto mt-10 flex w-full flex-col gap-8">
        <div className="flex h-fit w-full flex-row justify-between gap-16 rounded-lg bg-white p-10">
          <div className=" w-[40%]">
            <RequirementsForm handleSubmit={handleSubmit} />
          </div>
          <div className="flex w-[60%] flex-col gap-2">
            {isLoading && <Loader />}
            {!isLoading &&
              data?.map((resultDetail, index) => (
                <AcmResultDetailCard key={index} {...resultDetail} />
              ))}
          </div>
        </div>
      </section>
    </LayoutSigned>
  );
}
