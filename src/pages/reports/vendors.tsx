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
import { columns } from "~/components/template/columns/Vendors";

const ITEMS_PER_PAGE = 15;
export default function Vendors() {
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

  const { data } = api.vendor.getDataTable.useQuery({
    limit: pageSize,
    skip: pageIndex * pageSize,
    status: filter,
    search,
  });

  const pageCount = Math.ceil(
    (data?.totalItemsCount ?? ITEMS_PER_PAGE) / ITEMS_PER_PAGE,
  );
  const { data: countData } = api.vendor.countStatus.useQuery();

  const ctx = api.useUtils();
  const { mutate } = api.vendor.updateStatus.useMutation({
    onSuccess: () => {
      ctx.vendor.getDataTable.invalidate().catch((err) => {
        console.error(err);
      });
      ctx.vendor.countStatus.invalidate().catch((err) => {
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

  const updateStatus = (vendorId: string, status: string) => {
    mutate({
      id: vendorId,
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

  const vendorsData = data?.vendors.map((vendor) => {
    return {
      ...vendor,
      handleClickAction: (vendorId: string, status: string) => {
        updateStatus(vendorId, status);
      },
      numberOfReviews: vendor._count.reviews,
      category: vendor.category.name,
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
        {vendorsData ? (
          <DataTable
            onPaginationChange={setPagination}
            pagination={pagination}
            pageCount={pageCount}
            columns={columns}
            title="Vendors"
            data={vendorsData}
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
