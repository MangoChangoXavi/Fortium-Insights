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
import { IconLeft } from "react-day-picker";
import { Tab } from "~/components/system/ui/Tab";
import { Button } from "@/components/ui/button";
import { CustomerCard } from "~/components/system/ui/CustomerCard";

const ITEMS_PER_PAGE = 5;
export default function Clients() {
  const { toast } = useToast();
  const [filter, setFilter] = React.useState("initial");
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

  const { data, isLoading } = api.client.getDataTable.useQuery({
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
      ctx.client.getDataTable.invalidate().catch((err) => {
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
      value: "initial",
      icon: (
        <CategoryIcon className="h-5 w-5 fill-[#2c2c2c] stroke-[#2c2c2c]" />
      ),
      total: countData?.find((item) => item.status === "initial")?.count ?? 0,
      background: "bg-[#9b83d8]",
    },
    {
      label: "Contactado",
      value: "contacted",
      icon: <BoxIcon className="h-6 w-6  stroke-[#2c2c2c]" />,
      total: countData?.find((item) => item.status === "client")?.count ?? 0,
      background: "bg-[#dc5c5c]",
    },
    {
      label: "Propuesta",
      value: "proposal",
      icon: <SellIcon className="h-5 w-5  stroke-[#2c2c2c]" />,
      total:
        countData?.find((item) => item.status === "salesperson")?.count ?? 0,
      background: "bg-[#61dc7d]",
    },
    {
      label: "Contrato",
      value: "contract",
      icon: <StarIcon className="h-5 w-5 fill-[#2c2c2c] stroke-[#2c2c2c]" />,
      total: countData?.find((item) => item.status === "admin")?.count ?? 0,
      background: "bg-[#DCF691]",
    },
    {
      label: "Completado",
      value: "completed",
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
        {/* tabs */}
        <div className="flex h-16 w-full flex-row gap-10 rounded-lg bg-white px-10">
          {filters.map((item, index) => (
            <Tab
              key={index}
              {...item}
              active={filter === item.value}
              onClick={() => setFilter(item.value)}
            />
          ))}
        </div>
        {isLoading && <Loader />}
        {clientsData && clientsData.length > 0 ? (
          <div className="grid grid-cols-4">
            {clientsData.map((client) => (
              <CustomerCard
                key={client.id}
                name={client.name}
                company={client.company}
                role={client.role}
                phone={client.phone ?? ""}
                location={client.location}
                linkedIn={client.linkedIn ?? ""}
              />
            ))}
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            No hay clientes
          </div>
        )}
      </section>
    </LayoutSigned>
  );
}
