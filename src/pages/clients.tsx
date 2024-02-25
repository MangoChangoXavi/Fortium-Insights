import { api } from "~/utils/api";
import { type PaginationState } from "@/components/layouts/data-table";
import { useToast } from "@/components/ui/use-toast";
import React from "react";

import { UIDebouncer } from "~/components/system/ui/UIDebouncer";
import { BoxIcon, DogIcon, SearchIcon, StarIcon, UserIcon } from "lucide-react";
import { LayoutSigned } from "~/components/system/layouts/LayoutSigned";
import { CategoryIcon, SellIcon } from "~/components/system/ui/Icons";
import { Loader } from "~/components/system/layouts/Loader";
import { Tab } from "~/components/system/ui/Tab";
import { CustomerCard } from "~/components/system/ui/CustomerCard";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Client } from "~/components/template/forms/Client";
import { type client } from "@prisma/client";

const ITEMS_PER_PAGE = 5;
export default function Clients() {
  const { toast } = useToast();
  const [filter, setFilter] = React.useState("initial");
  const [search, setSearch] = React.useState("");
  const ctx = api.useUtils();

  // use the `useMutation` hook to create a mutation
  const { mutate: createClient, isLoading: isCreatingClient } =
    api.clientRouter.create.useMutation({
      onSuccess: () => {
        toast({ title: "Ficha de cliente guardada correctamente!" });
        ctx.clientRouter.getDataTable.invalidate().catch((err) => {
          console.error(err);
        });
        ctx.clientRouter.countStatus.invalidate().catch((err) => {
          console.error(err);
        });
      },
      onError: (err) => {
        const errorMessage = err?.data?.zodError?.fieldErrors?.content?.[0];
        toast({
          title:
            errorMessage ?? "Something went wrong. Please try again later.",
        });
      },
    });

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

  const { data, isLoading: isLoadingTable } =
    api.clientRouter.getDataTable.useQuery({
      limit: pageSize,
      skip: pageIndex * pageSize,
      status: filter,
      search,
    });

  const pageCount = Math.ceil(
    (data?.totalItemsCount ?? ITEMS_PER_PAGE) / ITEMS_PER_PAGE,
  );
  const { data: countData } = api.clientRouter.countStatus.useQuery();

  const { mutate, isLoading: isChangingStatus } =
    api.clientRouter.update.useMutation({
      onSuccess: () => {
        ctx.clientRouter.getDataTable.invalidate().catch((err) => {
          console.error(err);
        });
        ctx.clientRouter.countStatus.invalidate().catch((err) => {
          console.error(err);
        });
      },
      onError: (err) => {
        const errorMessage = err?.data?.zodError?.fieldErrors?.content?.[0];
        toast({
          title:
            errorMessage ?? "Something went wrong. Please try again later.",
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
      total: countData?.find((item) => item.status === "contacted")?.count ?? 0,
      background: "bg-[#dc5c5c]",
    },
    {
      label: "Propuesta",
      value: "proposal",
      icon: <SellIcon className="h-5 w-5  stroke-[#2c2c2c]" />,
      total: countData?.find((item) => item.status === "proposal")?.count ?? 0,
      background: "bg-[#61dc7d]",
    },
    {
      label: "Contrato",
      value: "contract",
      icon: <StarIcon className="h-5 w-5 fill-[#2c2c2c] stroke-[#2c2c2c]" />,
      total: countData?.find((item) => item.status === "contract")?.count ?? 0,
      background: "bg-[#DCF691]",
    },
    {
      label: "Completado",
      value: "completed",
      icon: <DogIcon className="h-5 w-5 stroke-[#2c2c2c]" />,
      total: countData?.find((item) => item.status === "completed")?.count ?? 0,
      background: "bg-[#DCF691]",
    },
  ];

  // update position in the CRM
  const handleForward = (client: client) => {
    switch (filter) {
      case "initial":
        updateStatus(client.id, "contacted");
        break;
      case "contacted":
        updateStatus(client.id, "proposal");
        break;
      case "proposal":
        updateStatus(client.id, "contract");
        break;
      case "contract":
        updateStatus(client.id, "completed");
        break;
      case "completed":
        updateStatus(client.id, "completed");
        break;
      default:
        break;
    }
  };
  const handleBackward = (client: client) => {
    switch (filter) {
      case "initial":
        updateStatus(client.id, "initial");
        break;
      case "contacted":
        updateStatus(client.id, "initial");
        break;
      case "proposal":
        updateStatus(client.id, "contacted");
        break;
      case "contract":
        updateStatus(client.id, "proposal");
        break;
      case "completed":
        updateStatus(client.id, "contract");
        break;
      default:
        break;
    }
  };

  const isLoading = isLoadingTable || isChangingStatus || isCreatingClient;

  return (
    <LayoutSigned>
      <Drawer direction="right">
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
          {isLoading ? (
            <Loader />
          ) : (
            <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {data?.clients.map((client) => (
                <CustomerCard
                  key={client.id}
                  name={client.name}
                  company={client.company}
                  role={client.role}
                  phone={client.phone ?? ""}
                  location={client.location}
                  linkedIn={client.linkedIn ?? ""}
                  onClickNext={() => handleForward(client)}
                  onClickPrevious={() => handleBackward(client)}
                />
              ))}
              <DrawerTrigger asChild>
                <button className="h-[270px] w-[250px] cursor-pointer gap-4 rounded-2xl border border-zinc-500 transition duration-300 ease-in-out hover:scale-105">
                  <div className="inline-flex h-full w-full flex-col items-center justify-center">
                    <UserIcon className="relative mb-2 h-8 w-8" />
                    <div className="w-[108px] text-center text-base font-bold text-zinc-800">
                      Nuevo Cliente
                    </div>
                  </div>
                </button>
              </DrawerTrigger>
              <DrawerPortal>
                <DrawerOverlay className="fixed inset-0 bg-black/40" />
                <DrawerContent className="left-auto right-0 top-0 mt-0 h-screen w-full rounded-none sm:w-[35%]">
                  <DrawerHeader>
                    <DrawerTitle>Nuevo Cliente</DrawerTitle>
                    <DrawerDescription>
                      En este apartado tienes que ingresar la ficha del nuevo
                      cliente para comenzar a gestionarlo.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="overflow-auto px-4">
                    <Client handleSubmit={createClient} />
                  </div>
                </DrawerContent>
              </DrawerPortal>
            </div>
          )}
        </section>
      </Drawer>
    </LayoutSigned>
  );
}
