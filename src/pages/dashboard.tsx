import React from "react";
import { LayoutSigned } from "~/components/system/layouts/LayoutSigned";
import { UILoadingPage } from "~/components/system/layouts/Loader";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";

import Persons from "~/assets/svg/persons.svg";
import { ListDashboard } from "~/components/system/dashboard/ListDashboard";
import { BasicInfoDashboard } from "~/components/system/dashboard/BasicInfoDashboard";
import { TableDashboard } from "~/components/system/dashboard/TableDashboard";
import { GTQ } from "~/utils/functions";
import { GraphDashboardContainer } from "~/components/template/layouts/GraphDashboardContainer";
import { AITipsContainer } from "~/components/template/layouts/AITipsContainer";
import { CoinsIcon } from "lucide-react";
import {
  CategoryIcon,
  ReservedIcon,
  SellIcon,
} from "~/components/system/ui/Icons";
import {
  DataTable,
  type PaginationState,
} from "@/components/layouts/data-table";
import { projectsColumns } from "~/components/template/columns/Projects";
import { projects } from "~/data/json/projects";

const ITEMS_PER_PAGE = 5;

export default function Dashboard() {
  const [startDate, setStartDate] = React.useState(new Date());

  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: ITEMS_PER_PAGE,
    });

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  const { data: projectTableData } = api.dashboard.getDataTable.useQuery({
    limit: pageSize,
    skip: pageIndex * pageSize,
  });

  const pageCount = Math.ceil(
    (projects.length ?? ITEMS_PER_PAGE) / ITEMS_PER_PAGE,
  );

  // const { data: projectGetProgress } = api.project.getProgress.useQuery({
  //   endDate: new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0),
  // });
  // const { data: reservationGetNextQuotas } =
  //   api.reservation.getNextQuotas.useQuery({
  //     startDate: new Date(startDate.getFullYear(), startDate.getMonth(), 1),
  //     endDate: new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0),
  //   });
  const { data: reservationGetTopSellers } =
    api.dashboard.getTopSellers.useQuery({
      startDate: new Date(startDate.getFullYear(), startDate.getMonth(), 1),
      endDate: new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0),
    });
  const { data: totalSales } =
    api.dashboard.getTotalSellsThisMonthStat.useQuery({
      startDate: new Date(startDate.getFullYear(), startDate.getMonth(), 1),
      endDate: new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0),
    });
  const { data: projectTableStats } =
    api.dashboard.getProjectTableStats.useQuery();
  // const { data: totalExpectedIncome } =
  //   api.reservation.getExpectedIncomeThisMonthStat.useQuery({
  //     startDate: new Date(startDate.getFullYear(), startDate.getMonth(), 1),
  //     endDate: new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0),
  //   });

  // if (!projectGetProgress) return <UILoadingPage />;
  // if (!reservationGetNextQuotas) return <UILoadingPage />;
  if (!reservationGetTopSellers) return <UILoadingPage />;
  if (!totalSales) return <UILoadingPage />;
  // if (!totalSelledLots) return <UILoadingPage />;
  // if (!totalExpectedIncome) return <UILoadingPage />;

  const stats = [
    {
      background: "bg-[#DCF691]",
      icon: (
        <CategoryIcon className="h-5 w-5 fill-[#2c2c2c] stroke-[#2c2c2c]" />
      ),
      label: "Ventas",
      total: GTQ.format(projectTableStats?.totalSells ?? 0),
    },
    {
      background: "bg-[#91F6C6]",
      icon: (
        <ReservedIcon className="h-5 w-5 fill-[#2c2c2c] stroke-[#2c2c2c]" />
      ),
      label: "Reservas Creadas",
      total: projectTableStats?.totalReservations ?? 0,
    },
    {
      background: "bg-[#61dc7d]",
      icon: <SellIcon className="h-5 w-5 fill-[#2c2c2c] stroke-[#2c2c2c]" />,
      label: "Lotes Vendidos",
      total: projectTableStats?.totalSelledLots ?? 0,
    },
  ];

  const projectTableInfoExists = projectTableData && projectTableStats;

  return (
    <>
      <LayoutSigned>
        <div id="main-content" className="h-full w-full overflow-y-auto ">
          {/* <FormMonthDatePicker
            startDate={startDate}
            setStartDate={setStartDate}
          /> */}
          <main className="py-4">
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="flex w-full flex-col gap-6 md:w-3/5">
                {/* graph */}
                <GraphDashboardContainer startDate={startDate} />
                {/* table */}
                {projectTableInfoExists && (
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
                )}
              </div>
              <div className="flex w-full flex-col gap-6 md:w-2/5">
                <AITipsContainer />
                {/* items */}
                <ListDashboard
                  title="Top 3 vendedores"
                  image={Persons}
                  items={reservationGetTopSellers.map((seller) => ({
                    title: seller.name ?? "Anonimo",
                    description: `Total de ${GTQ.format(
                      seller.totalPrices,
                    )} en ventas`,
                    image: seller.image ?? "",
                  }))}
                />
                {/* view more */}
                <BasicInfoDashboard
                  text={GTQ.format(totalSales.totalSellsThisMonth).toString()}
                  icon={
                    <CoinsIcon className="h-6 w-6 fill-none stroke-white" />
                  }
                  background="bg-[url(https://images.unsplash.com/photo-1488554378835-f7acf46e6c98?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFic3RyYWN0fGVufDB8fDB8fHww)]"
                />
              </div>
            </div>
          </main>
        </div>
      </LayoutSigned>
    </>
  );
}

// Fetch data before the page loads
export const getStaticProps = () => {
  const helpers = generateSSGHelper();

  const startDate = new Date();

  // helpers.project.getProjectsChart
  //   .prefetch({
  //     startDate: new Date(startDate.getFullYear(), startDate.getMonth(), 1),
  //     endDate: new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0),
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });

  // helpers.project.getProgress
  //   .prefetch({
  //     endDate: new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0),
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });

  // helpers.reservation.getNextQuotas
  //   .prefetch({
  //     startDate: new Date(startDate.getFullYear(), startDate.getMonth(), 1),
  //     endDate: new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0),
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });

  helpers.dashboard.getTopSellers
    .prefetch({
      startDate: new Date(startDate.getFullYear(), startDate.getMonth(), 1),
      endDate: new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0),
    })
    .catch((e) => {
      console.log(e);
    });

  helpers.dashboard.getTotalSellsThisMonthStat
    .prefetch({
      startDate: new Date(startDate.getFullYear(), startDate.getMonth(), 1),
      endDate: new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0),
    })
    .catch((e) => {
      console.log(e);
    });

  helpers.dashboard.getProjectTableStats.prefetch().catch((e) => {
    console.log(e);
  });

  helpers.dashboard.getProjectTableData.prefetch().catch((e) => {
    console.log(e);
  });

  helpers.dashboard.getStatisticsStats.prefetch().catch((e) => {
    console.log(e);
  });

  // helpers.reservation.getTotalSelledLotsThisMonthStat
  //   .prefetch({
  //     startDate: new Date(startDate.getFullYear(), startDate.getMonth(), 1),
  //     endDate: new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0),
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });

  // helpers.reservation.getExpectedIncomeThisMonthStat
  //   .prefetch({
  //     startDate: new Date(startDate.getFullYear(), startDate.getMonth(), 1),
  //     endDate: new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0),
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });

  return {
    props: {
      // very important - use `trpcState` as the key
      trpcState: helpers.dehydrate(),
    },
  };
};
