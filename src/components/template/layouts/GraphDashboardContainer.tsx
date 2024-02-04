import React from "react";
import { Line } from "react-chartjs-2";
import {
  ClockIcon,
  PercentageIcon,
  SellIcon,
} from "~/components/system/ui/Icons";
import { GraphDashboard } from "~/components/system/dashboard/GraphDashboard";
import "chart.js/auto"; // ADD THIS
import { GTQ } from "~/utils/functions";
import { api } from "~/utils/api";
export const GraphDashboardContainer = ({ startDate }: { startDate: Date }) => {
  const { data: statisticsGraph } = api.dashboard.getStatisticsGraph.useQuery();
  const { data: statisticsStats } = api.dashboard.getStatisticsStats.useQuery();

  const hasStats =
    statisticsStats?.averageSell &&
    statisticsStats.averageSellTime &&
    statisticsStats.conversionRate;

  const hasGraph =
    statisticsGraph?.labels.length && statisticsGraph.datasets.length;

  const hasData = hasStats && hasGraph;

  return hasData ? (
    <GraphDashboard
      title="Estadisticas"
      stats={[
        {
          label: "Tasa de Conversion",
          icon: (
            <PercentageIcon className="h-5 w-5 fill-[#2c2c2c] stroke-[#2c2c2c]" />
          ),
          total: `${(statisticsStats.conversionRate * 100).toFixed(2)}%`,
          background: "bg-[#8ab6c9]",
        },
        {
          label: "Tiempo Promedio de Venta",
          icon: (
            <ClockIcon className="h-5 w-5 fill-[#2c2c2c] stroke-[#2c2c2c]" />
          ),
          total: `${statisticsStats.averageSellTime}`,
          background: "bg-[#77d959]",
        },
        {
          label: "Venta Promedio",
          icon: (
            <SellIcon className="h-5 w-5 fill-[#2c2c2c] stroke-[#2c2c2c]" />
          ),
          total: `${GTQ.format(statisticsStats.averageSell)}`,
          background: "bg-[#61dc7d]",
        },
      ]}
      graph={<Line data={statisticsGraph} />}
    />
  ) : (
    <div className="min-h-[223px] w-full rounded-xl bg-gray-300"></div>
  );
};
