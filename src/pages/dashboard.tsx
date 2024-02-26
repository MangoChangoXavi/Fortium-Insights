import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React from "react";
import { LayoutSigned } from "~/components/system/layouts/LayoutSigned";
import { ProposalContainer } from "~/components/template/layouts/ProposalContainer";
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
          <main className="py-4">
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="flex w-full flex-col gap-6 md:w-3/5">
                {/* graph */}
                <div>
                  <DialogTrigger>
                    <Button>Agregar Propuesta de Proyecto</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <ProposalContainer />
                  </DialogContent>
                </div>

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
