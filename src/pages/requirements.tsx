import { api, type RouterInputs } from "~/utils/api";
import React from "react";
import "chart.js/auto";
import { LayoutSigned } from "~/components/system/layouts/LayoutSigned";

import { RequirementsForm } from "~/components/template/forms/Requirements";
import { AcmResultDetailCard } from "~/components/template/layouts/AcmResultDetailCard";
import { Loader } from "~/components/system/layouts/Loader";
import { ClientSidePagination } from "~/components/system/ui/ClientSidePagination";

const ITEMS_PER_PAGE = 4;

type RequirementsGetI = RouterInputs["requirements"]["get"];
export default function Requirements() {
  const [page, setPage] = React.useState<number>(0);

  const [searchParameters, setSearchParemeters] =
    React.useState<RequirementsGetI | null>(null);

  const { data, isLoading } = api.requirements.get.useQuery({
    ...searchParameters,
  });

  const handleSubmit = (values: RequirementsGetI) => {
    setSearchParemeters(values);
  };

  const hasData = data && data.length > 0;
  const paginatedData = hasData
    ? data.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)
    : [];

  return (
    <LayoutSigned>
      <section className="container mx-auto mt-10 flex w-full flex-col gap-8">
        <div className="flex h-fit w-full flex-row justify-between gap-16 rounded-lg bg-white p-10">
          <div className="w-[40%]">
            <RequirementsForm handleSubmit={handleSubmit} />
          </div>
          <div className="flex w-[60%] flex-col gap-2">
            {isLoading && <Loader />}
            {hasData && (
              <>
                {paginatedData?.map((resultDetail, index) => (
                  <AcmResultDetailCard key={index} {...resultDetail} />
                ))}
                <ClientSidePagination
                  totalItems={data.length}
                  pageSize={ITEMS_PER_PAGE}
                  page={page}
                  setPage={setPage}
                />
              </>
            )}
          </div>
        </div>
      </section>
    </LayoutSigned>
  );
}
