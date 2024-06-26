import { api } from "~/utils/api";
import {
  DataTable,
  type PaginationState,
} from "@/components/layouts/data-table";
import { useToast } from "@/components/ui/use-toast";
import React from "react";

import { StarIcon } from "lucide-react";
import { LayoutSigned } from "~/components/system/layouts/LayoutSigned";
import { CategoryIcon, CancelIcon } from "~/components/system/ui/Icons";
import { StatsGroup } from "~/components/system/ui/StatsGroup";
import { columns } from "~/components/template/columns/Categories";

const ITEMS_PER_PAGE = 5;
export default function Categories() {
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

  const { data } = api.category.getDataTable.useQuery({
    limit: pageSize,
    skip: pageIndex * pageSize,
    status: filter,
    search,
  });

  const pageCount = Math.ceil(
    (data?.totalItemsCount ?? ITEMS_PER_PAGE) / ITEMS_PER_PAGE,
  );
  const { data: countData } = api.category.countStatus.useQuery();

  const ctx = api.useUtils();
  const { mutate } = api.category.updateStatus.useMutation({
    onSuccess: () => {
      ctx.category.getInfinite.invalidate().catch((err) => {
        console.error(err);
      });
      ctx.category.countStatus.invalidate().catch((err) => {
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

  const updateStatus = (categoryId: string, status: string) => {
    mutate({
      id: categoryId,
      status: status,
    });
  };

  const filters = [
    {
      label: "All",
      value: "",
      icon: (
        <CategoryIcon className="h-5 w-5 fill-[#2c2c2c] stroke-[#2c2c2c]" />
      ),
      total: countData?.find((item) => item.status === "all")?.count ?? 0,
      background: "bg-[#9b83d8]",
    },
    {
      label: "Disabled",
      value: "disabled",
      icon: <CancelIcon className="h-6 w-6 fill-[#2c2c2c] stroke-[#2c2c2c]" />,
      total: countData?.find((item) => item.status === "disabled")?.count ?? 0,
      background: "bg-[#dc5c5c]",
    },
    {
      label: "Active",
      value: "active",
      icon: <StarIcon className="h-5 w-5 fill-[#2c2c2c] stroke-[#2c2c2c]" />,
      total: countData?.find((item) => item.status === "active")?.count ?? 0,
      background: "bg-[#DCF691]",
    },
  ];

  const categoriesData = data?.categories.map((category) => {
    return {
      ...category,
      handleClickAction: (categoryId: string, status: string) => {
        updateStatus(categoryId, status);
      },
      numberOfVendors: category._count.vendors,
    };
  });

  return (
    <LayoutSigned>
      <section className="container mx-auto mt-10 flex w-full flex-col gap-8">
        <div className="md:flex md:items-center md:justify-between">
          {filters && (
            <StatsGroup
              filters={filters}
              filter={filter}
              setFilter={setFilter}
            />
          )}
        </div>
        {categoriesData ? (
          <DataTable
            onPaginationChange={setPagination}
            pagination={pagination}
            pageCount={pageCount}
            columns={columns}
            title="Categories"
            data={categoriesData}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            No data...
          </div>
        )}
      </section>
    </LayoutSigned>
  );
}
