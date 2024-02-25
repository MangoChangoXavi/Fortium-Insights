import { api } from "~/utils/api";
import {
  DataTable,
  type PaginationState,
} from "@/components/layouts/data-table";
import { useToast } from "@/components/ui/use-toast";
import React from "react";

import { UIDebouncer } from "~/components/system/ui/UIDebouncer";
import { SearchIcon } from "lucide-react";
import { LayoutSigned } from "~/components/system/layouts/LayoutSigned";
import { CategoryIcon } from "~/components/system/ui/Icons";
import { columns } from "~/components/template/columns/acms";
import { Tab } from "~/components/system/ui/Tab";

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
      label: "Todas",
      value: "",
      icon: (
        <CategoryIcon className="h-5 w-5 fill-[#2c2c2c] stroke-[#2c2c2c]" />
      ),
      total: 10,
      // total: countData?.find((item) => item.status === "initial")?.count ?? 0,
      background: "bg-[#9b83d8]",
    },
    // {
    //   label: "Desactivados",
    //   value: "acm",
    //   icon: <CancelIcon className="h-6 w-6 fill-[#2c2c2c] stroke-[#2c2c2c]" />,
    //   total: countData?.find((item) => item.status === "acm")?.count ?? 0,
    //   background: "bg-[#dc5c5c]",
    // },
    // {
    //   label: "Vendedores",
    //   value: "salesperson",
    //   icon: <SellIcon className="h-5 w-5 fill-[#2c2c2c] stroke-[#2c2c2c]" />,
    //   total:
    //     countData?.find((item) => item.status === "salesperson")?.count ?? 0,
    //   background: "bg-[#61dc7d]",
    // },
    // {
    //   label: "Administradores",
    //   value: "admin",
    //   icon: <StarIcon className="h-5 w-5 fill-[#2c2c2c] stroke-[#2c2c2c]" />,
    //   total: countData?.find((item) => item.status === "admin")?.count ?? 0,
    //   background: "bg-[#DCF691]",
    // },
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
        <div className="flex h-16 w-full flex-row gap-10 rounded-lg bg-white px-10">
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
        {data?.acms.length ? (
          <DataTable
            onPaginationChange={setPagination}
            pagination={pagination}
            pageCount={pageCount}
            columns={columns}
            title="On Boards"
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
