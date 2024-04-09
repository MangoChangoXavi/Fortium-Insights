import { api, type RouterInputs } from "~/utils/api";
import React from "react";
import "chart.js/auto";

import { RequirementsForm } from "~/components/template/forms/Requirements";
import { AcmResultDetailCard } from "~/components/template/layouts/AcmResultDetailCard";
import { Loader } from "~/components/system/layouts/Loader";
import { ClientSidePagination } from "~/components/system/ui/ClientSidePagination";
import Header from "~/features/landingPage/components/Header";
import Footer from "~/features/landingPage/components/Footer";
import Image from "next/image";

const ITEMS_PER_PAGE = 4;
type RequirementsGetI = RouterInputs["requirements"]["get"];

export default function Index() {
  const [page, setPage] = React.useState<number>(0);

  const [searchParameters, setSearchParemeters] =
    React.useState<RequirementsGetI | null>(null);

  const { data, isLoading } = api.requirements.get.useQuery({
    ...searchParameters,
  });

  const handleSubmit = (values: RequirementsGetI) => {
    setPage(0);
    setSearchParemeters(values);
  };

  const hasData = data && data.length > 0;
  const paginatedData = hasData
    ? data.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)
    : [];

  return (
    <>
      <Header />
      <div className="relative h-48 w-full">
        <Image
          src="https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=1910&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="image"
          fill
          objectFit="cover"
        />
      </div>
      <section className="mt-4 flex w-full flex-col gap-8 md:container md:mx-auto md:mt-10">
        <div className="flex h-fit w-full flex-col justify-between gap-16 rounded-lg bg-white p-4 md:my-4 md:p-10">
          <RequirementsForm handleSubmit={handleSubmit} />
          <div className="flex w-full flex-col gap-2 overflow-auto">
            {isLoading && (
              <div className="flex w-full items-center justify-center">
                <Loader />
              </div>
            )}
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
      <Footer />
    </>
  );
}
