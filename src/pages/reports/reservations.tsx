import { api } from "~/utils/api";
import {
  DataTable,
  type PaginationState,
} from "@/components/layouts/data-table";
import { GTQ } from "~/utils/functions";
import { LayoutSigned } from "~/components/system/layouts/LayoutSigned";
import { projects } from "~/data/json/projects";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";
import { StatsGroup } from "~/components/system/ui/StatsGroup";
import React, { useEffect } from "react";
import {
  CategoryIcon,
  ReservedIcon,
  SellIcon,
  CancelIcon,
  SearchIcon,
} from "~/components/system/ui/Icons";
import { UIDebouncer } from "~/components/system/ui/UIDebouncer";
import { columns } from "~/components/template/columns/Reservation";
import { Loader } from "~/components/system/layouts/Loader";

const ITEMS_PER_PAGE = 5;

export default function Reservations() {
  const { toast } = useToast();
  const { push } = useRouter();
  const [filter, setFilter] = React.useState("");
  const [search, setSearch] = React.useState("");

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

  const { data } = api.reservation.getDataTable.useQuery({
    limit: pageSize,
    skip: pageIndex * pageSize,
    status: filter ? parseInt(filter) : undefined,
    search,
  });

  const pageCount = Math.ceil(
    (data?.totalItemsCount ?? ITEMS_PER_PAGE) / ITEMS_PER_PAGE,
  );

  // Counting status for the header
  const { data: countData } = api.reservation.countStatus.useQuery();

  // use the `useMutation` hook to create a mutation
  const ctx = api.useUtils();
  const { mutate } = api.reservation.updateStatus.useMutation({
    onSuccess: () => {
      ctx.reservation.getInfinite.invalidate().catch((err) => {
        console.error(err);
      });
      toast({ title: "Reservacion Actualizada" });
    },
    onError: (err) => {
      const errorMessage = err?.data?.zodError?.fieldErrors?.content?.[0];
      toast({
        title: errorMessage ?? "Something went wrong. Please try again later.",
      });
    },
  });
  const updateState = (reservationId: number, status: number) => {
    mutate({
      id: reservationId,
      status: status,
    });
  };

  // Find names in our projects constants
  const findProjectName = (projectId: number) => {
    const projectName = projects.find((project) => project.id === projectId)
      ?.name;

    return projectName ?? "Anonimo";
  };

  const filters = [
    {
      label: "Todas",
      value: "",
      icon: (
        <CategoryIcon className="h-5 w-5 fill-[#2c2c2c] stroke-[#2c2c2c]" />
      ),
      total: countData?.find((item) => item.status === 0)?.count ?? 0,
      background: "bg-[#DCF691]",
    },
    {
      label: "Reservadas",
      value: "1",
      icon: (
        <ReservedIcon className="h-5 w-5 fill-[#2c2c2c] stroke-[#2c2c2c]" />
      ),
      total: countData?.find((item) => item.status === 1)?.count ?? 0,
      background: "bg-[#91F6C6]",
    },
    {
      label: "Vendidas",
      value: "2",
      icon: <SellIcon className="h-5 w-5 fill-[#2c2c2c] stroke-[#2c2c2c]" />,
      total: countData?.find((item) => item.status === 2)?.count ?? 0,
      background: "bg-[#61dc7d]",
    },
    {
      label: "Canceladas",
      value: "3",
      icon: <CancelIcon className="h-6 w-6 fill-[#2c2c2c] stroke-[#2c2c2c]" />,
      total: countData?.find((item) => item.status === 3)?.count ?? 0,
      background: "bg-[#dc5c5c]",
    },
  ];

  useEffect(() => {
    setPagination({
      pageIndex: 0,
      pageSize: ITEMS_PER_PAGE,
    });
  }, [filter]);

  const reservationsData = data?.reservations.map((reservation) => {
    return {
      reservationId: reservation.id,
      identifier: `${findProjectName(
        reservation.lot.projectId,
      )}, Lote ${reservation.lot?.identifier}`,
      client: `${reservation.firstname} ${reservation.lastname}`,
      status: reservation.status,
      sellerImage: reservation.user.image ?? "",
      seller: reservation.user.name ?? "Anonimo",
      price: GTQ.format(reservation.price as unknown as number),
      downpayment: GTQ.format(
        reservation.downpaymentPrice as unknown as number,
      ),
      handleClickAction: (reservationId: number, action: string) => {
        updateState(reservationId, action === "sell" ? 2 : 3);
      },
      handleClickPDF: async (reservationId: number) => {
        await push(`/pdf/reservation/${reservationId}`);
      },
    };
  });

  return (
    <LayoutSigned>
      <section className="container mx-auto mt-10 flex w-full flex-col gap-8">
        <UIDebouncer
          value={search}
          setValue={setSearch}
          icon={<SearchIcon className="h-4 w-4" />}
        />
        <div className="md:flex md:items-center md:justify-between">
          {filters && (
            <StatsGroup
              filters={filters}
              filter={filter}
              setFilter={setFilter}
            />
          )}
        </div>
        {reservationsData ? (
          <DataTable
            onPaginationChange={setPagination}
            pagination={pagination}
            pageCount={pageCount}
            columns={columns}
            title="Reservaciones"
            data={reservationsData}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Loader />
          </div>
        )}
      </section>
    </LayoutSigned>
  );
}
