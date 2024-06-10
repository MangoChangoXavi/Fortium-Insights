import { api } from "~/utils/api";
import {
  DataTable,
  type PaginationState,
} from "@/components/layouts/data-table";
import { useToast } from "@/components/ui/use-toast";
import React from "react";

import { UIDebouncer } from "~/components/system/ui/Debouncer";
import { StarIcon, SearchIcon } from "lucide-react";
import { LayoutSigned } from "~/components/system/layouts/LayoutSigned";
import {
  CategoryIcon,
  CancelIcon,
  SellIcon,
} from "~/components/system/ui/Icons";
import { StatsGroup } from "~/components/system/ui/StatsGroup";
import { columns } from "~/components/template/columns/Users";

const ITEMS_PER_PAGE = 5;
export default function Users() {
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

  const { data } = api.user.getDataTable.useQuery({
    limit: pageSize,
    skip: pageIndex * pageSize,
    role: filter,
    search,
  });

  const pageCount = Math.ceil(
    (data?.totalItemsCount ?? ITEMS_PER_PAGE) / ITEMS_PER_PAGE,
  );
  const { data: countData } = api.user.countRoles.useQuery();

  const ctx = api.useUtils();
  const { mutate } = api.user.updateRole.useMutation({
    onSuccess: () => {
      ctx.user.getInfinite.invalidate().catch((err) => {
        console.error(err);
      });
      ctx.user.countRoles.invalidate().catch((err) => {
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

  const updateRole = (userId: string, role: string) => {
    mutate({
      id: userId,
      role: role,
    });
  };

  const filters = [
    {
      label: "Todas",
      value: "",
      icon: (
        <CategoryIcon className="h-5 w-5 fill-[#2c2c2c] stroke-[#2c2c2c]" />
      ),
      total: countData?.find((item) => item.role === "all")?.count ?? 0,
      background: "bg-[#9b83d8]",
    },
    {
      label: "Desactivados",
      value: "user",
      icon: <CancelIcon className="h-6 w-6 fill-[#2c2c2c] stroke-[#2c2c2c]" />,
      total: countData?.find((item) => item.role === "disabled")?.count ?? 0,
      background: "bg-[#dc5c5c]",
    },
    {
      label: "Usuario",
      value: "user",
      icon: <SellIcon className="h-5 w-5 fill-[#2c2c2c] stroke-[#2c2c2c]" />,
      total: countData?.find((item) => item.role === "user")?.count ?? 0,
      background: "bg-[#61dc7d]",
    },
    {
      label: "Administradores",
      value: "admin",
      icon: <StarIcon className="h-5 w-5 fill-[#2c2c2c] stroke-[#2c2c2c]" />,
      total: countData?.find((item) => item.role === "admin")?.count ?? 0,
      background: "bg-[#DCF691]",
    },
  ];

  const usersData = data?.users.map((user) => {
    return {
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      userImage: user.image,
      userRole: user.role ?? "user",
      createdAt: user.createdAt,
      handleClickAction: (userId: string, role: string) => {
        updateRole(userId, role);
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
        {usersData ? (
          <DataTable
            onPaginationChange={setPagination}
            pagination={pagination}
            pageCount={pageCount}
            columns={columns}
            title="Usuarios"
            data={usersData}
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
