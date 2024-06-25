import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React from "react";
import { LayoutSigned } from "~/components/system/layouts/LayoutSigned";
<<<<<<< Updated upstream
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

export default function Dashboard() {
  return (
    <>
      <LayoutSigned>
        <Dialog>
          <div id="main-content" className="h-full w-full overflow-y-auto ">
            {/* <FormMonthDatePicker
            startDate={startDate}
            setStartDate={setStartDate}
          /> */}
            <main className="py-4"></main>
          </div>
          <main className="py-4 h-screen bg-[url('https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1896&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="flex w-full flex-col gap-6 md:w-3/5">
                {/* graph */}
                {/* <div>
                  <DialogTrigger>
                    <Button>Agregar Propuesta de Proyecto</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <ProposalContainer />
                  </DialogContent>
                </div> */}
                {/* <GraphDashboardContainer startDate={startDate} /> */}
                {/* table */}
                {/* {projectTableInfoExists && (
                  <TableDashboard
                    title="Proyectos"
                    stats={stats}
                    {...projectTableData}
                  >
                    <DataTable
                      columns={projectsColumns}
                      data={projectTableData}
                      pagination={pagination}
                      onPaginationChange={setPagination}
                      pageCount={pageCount}
                    />
                  </TableDashboard>
                )} */}
              </div>
              <div className="flex w-full flex-col gap-6 md:w-2/5">
                {/* <AITipsContainer /> */}
                {/* items */}
                {/* <ListDashboard
                  title="Top 3 vendedores"
                  image={Persons}
                  items={reservationGetTopSellers.map((seller) => ({
                    title: seller.name ?? "Anonimo",
                    description: `Total de ${GTQ.format(
                      seller.totalPrices,
                    )} en ventas`,
                    image: seller.image ?? "",
                  }))}
                /> */}
                {/* view more */}
                {/* <BasicInfoDashboard
                  text={GTQ.format(totalSales.totalSellsThisMonth).toString()}
                  icon={
                    <CoinsIcon className="h-6 w-6 fill-none stroke-white" />
                  }
                  background="bg-[url(https://images.unsplash.com/photo-1488554378835-f7acf46e6c98?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFic3RyYWN0fGVufDB8fDB8fHww)]"
                /> */}
              </div>
            </div>
          </main>
        </Dialog>
      </LayoutSigned>
    </>
=======
import { CategoriesSideBar } from "~/components/template/layouts/CategoriesSideBar";
import { useSearchStore } from "~/stores/useSearchStore";
import { api } from "~/utils/api";
import { RatingSideBar } from "~/components/template/layouts/RatingSideBar";
import { SkeletonCard } from "~/components/template/ui/SkeletonCard";
import { VendorCard } from "~/components/template/ui/VendorCard";
import { Drawer } from "@/components/ui/drawer";
import { ReviewsDrawer } from "~/components/template/layouts/ReviewsDrawer";
import { useReviewsStore } from "~/stores/useReviewsStore";
import { HoverCard } from "@/components/ui/hover-card";

export default function Dashboard() {
  const { search, categoryId, rating } = useSearchStore();
  const { setVendorId } = useReviewsStore();

  // Get vendors
  const { data: vendors, isLoading } = api.vendor.getAll.useQuery({
    categoryId,
    rating,
    search,
  });

  return (
    <LayoutSigned>
      <Drawer direction="right">
        <section className="flex flex-col gap-8 p-4 lg:flex-row lg:divide-x-2 lg:p-8">
          {/* sidebar */}
          <div className="flex flex-col gap-8 border-slate-700 lg:w-1/4">
            <RatingSideBar />
            <CategoriesSideBar />
          </div>
          {/* results */}
          <div className="flex w-full flex-col gap-8 lg:pl-8">
            <div className="flex items-center gap-3 text-base font-bold text-[#093061]">
              <h3>Results</h3>
              <div className="inline-flex h-3.5 w-[38px] items-center justify-center gap-2.5 rounded-2xl border border-indigo-400 px-[13px]">
                <div className="text-[10px] font-normal text-zinc-800">
                  {vendors?.length}
                </div>
              </div>
            </div>
            <div className="grid w-full grid-cols-1 items-end justify-start gap-4  md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {isLoading &&
                new Array(4)
                  .fill(0)
                  .map((_, index) => <SkeletonCard key={index} />)}
              {vendors && vendors.length > 0 ? (
                vendors.map((vendor) => (
                  <VendorCard
                    key={vendor.id}
                    id={vendor.id}
                    image={vendor.vendorImgUrl}
                    title={vendor.name}
                    category={vendor.category?.name}
                    description={vendor.description}
                    rating={vendor.rating}
                    setVendorId={setVendorId}
                  />
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        </section>
        <ReviewsDrawer />
      </Drawer>
    </LayoutSigned>
>>>>>>> Stashed changes
  );
}

// Fetch data before the page loads
export const getStaticProps = () => {
  const helpers = generateSSGHelper();

  return {
    props: {
      // very important - use `trpcState` as the key
      trpcState: helpers.dehydrate(),
    },
  };
};
