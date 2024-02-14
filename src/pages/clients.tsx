import { api } from "~/utils/api";
import {
  DataTable,
  type PaginationState,
} from "@/components/layouts/data-table";
import { useToast } from "@/components/ui/use-toast";
import React from "react";

import { UIDebouncer } from "~/components/system/ui/UIDebouncer";
import { BoxIcon, DogIcon, SearchIcon, StarIcon } from "lucide-react";
import { LayoutSigned } from "~/components/system/layouts/LayoutSigned";
import {
  CancelIcon,
  CategoryIcon,
  SellIcon,
} from "~/components/system/ui/Icons";
import { StatsGroup } from "~/components/system/ui/StatsGroup";
import { Loader } from "~/components/system/layouts/Loader";
import { columns } from "~/components/template/columns/clients";

const ITEMS_PER_PAGE = 5;
export default function Clients() {
  const { toast } = useToast();
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

  const { data } = api.client.getDataTable.useQuery({
    limit: pageSize,
    skip: pageIndex * pageSize,
    status: filter,
    search,
  });

  const pageCount = Math.ceil(
    (data?.totalItemsCount ?? ITEMS_PER_PAGE) / ITEMS_PER_PAGE,
  );
  const { data: countData } = api.client.countStatus.useQuery();

  const ctx = api.useUtils();
  const { mutate } = api.client.update.useMutation({
    onSuccess: () => {
      ctx.client.readInfinite.invalidate().catch((err) => {
        console.error(err);
      });
      ctx.client.countStatus.invalidate().catch((err) => {
        console.error(err);
      });
    },
    onError: (err) => {
      const errorMessage = err?.data?.zodError?.fieldErrors?.content?.[0];
      toast({
        title: errorMessage ?? "Something went wrong. Please try again later.",
      });
    },
  });

  const updateStatus = (clientId: string, status: string) => {
    mutate({
      id: clientId,
      status: status,
    });
  };

  const filters = [
    {
      label: "Inicial",
      value: "",
      icon: (
        <CategoryIcon className="h-5 w-5 fill-[#2c2c2c] stroke-[#2c2c2c]" />
      ),
      total: countData?.find((item) => item.status === "initial")?.count ?? 0,
      background: "bg-[#9b83d8]",
    },
    {
      label: "Contactado",
      value: "client",
      icon: <BoxIcon className="h-6 w-6  stroke-[#2c2c2c]" />,
      total: countData?.find((item) => item.status === "client")?.count ?? 0,
      background: "bg-[#dc5c5c]",
    },
    {
      label: "Propuesta",
      value: "salesperson",
      icon: <SellIcon className="h-5 w-5  stroke-[#2c2c2c]" />,
      total:
        countData?.find((item) => item.status === "salesperson")?.count ?? 0,
      background: "bg-[#61dc7d]",
    },
    {
      label: "Contrato",
      value: "admin",
      icon: <StarIcon className="h-5 w-5 fill-[#2c2c2c] stroke-[#2c2c2c]" />,
      total: countData?.find((item) => item.status === "admin")?.count ?? 0,
      background: "bg-[#DCF691]",
    },
    {
      label: "Completado",
      value: "admin",
      icon: <DogIcon className="h-5 w-5 stroke-[#2c2c2c]" />,
      total: countData?.find((item) => item.status === "admin")?.count ?? 0,
      background: "bg-[#DCF691]",
    },
  ];

  const clientsData = data?.clients.map((client) => {
    return {
      id: client.id,
      name: client.name,
      company: client.company,
      role: client.role,
      phone: client.phone,
      location: client.location,
      linkedIn: client.linkedIn,
      notes: client.notes,
      status: client.status,
      nextMeeting: client.nextMeeting,
      createdAt: client.createdAt,
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
        {clientsData ? (
          <DataTable
            onPaginationChange={setPagination}
            pagination={pagination}
            pageCount={pageCount}
            columns={columns}
            title="Clientes"
            data={clientsData}
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
