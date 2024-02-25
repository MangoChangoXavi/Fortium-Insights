import { api } from "~/utils/api";
import {
  DataTable,
  type PaginationState,
} from "@/components/layouts/data-table";
import { useToast } from "@/components/ui/use-toast";
import React from "react";

import { UIDebouncer } from "~/components/system/ui/UIDebouncer";
import {
  CalendarClockIcon,
  CalendarIcon,
  ClockIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react";
import { LayoutSigned } from "~/components/system/layouts/LayoutSigned";
import { CategoryIcon } from "~/components/system/ui/Icons";
import { columns } from "~/components/template/columns/acms";
import { Tab } from "~/components/system/ui/Tab";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogPortal,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ACMForm } from "~/components/template/forms/ACM";

const ITEMS_PER_PAGE = 5;
export default function ACMs() {
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

  const { data } = api.acm.getDataTable.useQuery({
    limit: pageSize,
    skip: pageIndex * pageSize,
    status: filter,
    search,
  });

  const pageCount = Math.ceil(
    (data?.totalItemsCount ?? ITEMS_PER_PAGE) / ITEMS_PER_PAGE,
  );
  // const { data: countData } = api.acm.countStatus.useQuery();

  const ctx = api.useUtils();
  const { mutate } = api.acm.update.useMutation({
    onSuccess: () => {
      ctx.acm.getDataTable.invalidate().catch((err) => {
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

  const filters = [
    {
      label: "Ultimo Mes",
      value: "",
      icon: <CategoryIcon className="h-5 w-5 stroke-[#2c2c2c]" />,
      total: 10,
      // total: countData?.find((item) => item.status === "initial")?.count ?? 0,
      background: "bg-[#9b83d8]",
    },
    {
      label: "Meses Anteriores",
      value: "acm",
      icon: <ClockIcon className="h-6 w-6  stroke-[#2c2c2c]" />,
      total: 4,
      background: "bg-[#dc5c5c]",
    },
    {
      label: "Hace medio año",
      value: "salesperson",
      icon: <CalendarIcon className="h-5 w-5  stroke-[#2c2c2c]" />,
      total: 15,
      background: "bg-[#61dc7d]",
    },
    {
      label: "Mayor a un año",
      value: "admin",
      icon: <CalendarClockIcon className="h-5 w-5  stroke-[#2c2c2c]" />,
      total: 400,
      background: "bg-[#DCF691]",
    },
  ];

  return (
    <LayoutSigned>
      <section className="container mx-auto mt-10 flex w-full flex-col gap-8">
        <UIDebouncer
          value={search}
          setValue={setSearch}
          icon={<SearchIcon className="h-4 w-4" />}
        />
        {/* tabs */}
        <div className="flex h-16 w-full flex-row justify-between rounded-lg bg-white px-10">
          <div className="flex  flex-row gap-10 ">
            {filters.map((item, index) => (
              <Tab
                key={index}
                {...item}
                active={filter === item.value}
                onClick={() => setFilter(item.value)}
                total={item.total}
              />
            ))}
          </div>
          <Dialog>
            <DialogPortal>
              <DialogTitle>Crear Analisis</DialogTitle>
              <DialogContent>
                <ACMForm handleSubmit={() => {}} />
              </DialogContent>
            </DialogPortal>
            <DialogTrigger asChild>
              <Button variant={"dark"} className="self-center">
                <PlusIcon className="h-4 w-4" /> Nuevo Analisis
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
        {data?.acms.length ? (
          <DataTable
            onPaginationChange={setPagination}
            pagination={pagination}
            pageCount={pageCount}
            columns={columns}
            data={data?.acms ?? []}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            No hay datos...
          </div>
        )}
      </section>
    </LayoutSigned>
  );
}
