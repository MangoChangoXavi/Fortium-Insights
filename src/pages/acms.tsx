import { api } from "~/utils/api";
import {
  DataTable,
  type PaginationState,
} from "@/components/layouts/data-table";
import { useToast } from "@/components/ui/use-toast";
import React from "react";
import "chart.js/auto";
import SellIllustration from "~/assets/svg/sell.svg";
import RentIllustration from "~/assets/svg/rent.svg";
import { UIDebouncer } from "~/components/system/ui/UIDebouncer";
import {
  BathIcon,
  BedIcon,
  CalendarClockIcon,
  CalendarIcon,
  CarIcon,
  ClockIcon,
  LocateIcon,
  PlusIcon,
  RulerIcon,
  SearchIcon,
} from "lucide-react";
import { LayoutSigned } from "~/components/system/layouts/LayoutSigned";
import { CategoryIcon } from "~/components/system/ui/Icons";
import { columns } from "~/components/template/columns/acms";
import { columns as columnsResult } from "~/components/template/columns/acmResults";
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
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Doughnut } from "react-chartjs-2";
import { type acm } from "@prisma/client";
import Image from "next/image";
import { Loader } from "~/components/system/layouts/Loader";

const ITEMS_PER_PAGE = 5;
export default function ACMs() {
  const { toast } = useToast();
  const [filter, setFilter] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [selectedAcm, setSelectedAcm] = React.useState<acm | null>(null);

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
  const { mutate, isLoading } = api.acm.create.useMutation({
    onSettled: () => {
      toast({
        title: "Analizis iniciado",
        description:
          "Puede que demore unos minutos en completarse el resultado de la tasacion.",
      });
    },
    onSuccess: () => {
      ctx.acm.getDataTable.invalidate().catch((err) => {
        console.error(err);
      });
      toast({
        title: "Creado con exito!",
        description:
          "Puede que demore unos minutos en completarse el resultado de la tasacion.",
      });
    },
    onError: (err) => {
      const errorMessage = err?.data?.zodError?.fieldErrors?.content?.[0];
      toast({
        title:
          errorMessage ??
          "Ocurrio un problema al crear el analisis, ya se esta trabajando en ello.",
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
  const graphData = {
    labels: ["90,000.00 a 120,000.00", "121,000 a 140,0000", "+140,000.00"],
    datasets: [
      {
        label: "Distribucion de precios",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const acmData = data?.acms.map((acm) => ({
    ...acm,
    handleSelect: (action: string) => {
      if (action === "view") {
        setSelectedAcm(acm);
      }
      if (action === "print") {
        console.log("print");
        setSelectedAcm(acm);
      }
      if (action === "send") {
        console.log("send");
        setSelectedAcm(acm);
      }
    },
  }));

  const acmDataResult = data?.acms.map((acm) => ({
    ...acm,
    link: `/acms/${acm.id}`,
    price: 2000,
  }));
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
                {isLoading ? (
                  <div className="flex w-full flex-row items-center justify-center">
                    <Loader />
                  </div>
                ) : (
                  <ACMForm handleSubmit={mutate} />
                )}
              </DialogContent>
            </DialogPortal>
            <DialogTrigger asChild>
              <Button variant={"dark"} className="self-center">
                <PlusIcon className="h-4 w-4" /> Nuevo Analisis
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
        <Drawer direction="right">
          {data?.acms.length ? (
            <DataTable
              onPaginationChange={setPagination}
              pagination={pagination}
              pageCount={pageCount}
              columns={columns}
              data={acmData ?? []}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              No hay datos...
            </div>
          )}
          {selectedAcm && (
            <DrawerPortal>
              <DrawerOverlay className="fixed inset-0 bg-black/40" />
              <DrawerContent className="left-auto right-0 top-0 mt-0 h-screen w-full rounded-none md:w-[60%] xl:w-[40%]">
                <DrawerHeader>
                  <DrawerTitle>Resultado de la tasacion</DrawerTitle>
                  <DrawerDescription>
                    Te traemos la busqueda de la tasacion de la propiedad, esta
                    es una herramienta que te ayuda a valorar sin embargo eres
                    tu quien tiene la ultima palabra.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="flex w-full flex-row gap-8 px-4">
                  <span className="flex flex-row gap-2  text-xs font-medium text-zinc-500">
                    <ClockIcon className="h-4 w-4" />
                    {selectedAcm.createdAt.toLocaleString()}
                  </span>
                  <span className="flex  flex-row gap-2 text-xs font-medium text-zinc-500">
                    <LocateIcon className="h-4 w-4" /> {selectedAcm.address}
                  </span>
                  {/* number of rooms */}
                  <div className="flex flex-row gap-2 text-xs font-medium text-zinc-500">
                    <BedIcon className="h-4 w-4" />
                    <span>{selectedAcm.numberOfRooms}</span>
                  </div>
                  {/* number of bathrooms */}
                  <div className="flex flex-row gap-2 text-xs font-medium text-zinc-500">
                    <BathIcon className="h-4 w-4" />
                    <span>{selectedAcm.numberOfBathrooms}</span>
                  </div>
                  {/* number of parking lots */}
                  <div className="flex flex-row gap-2 text-xs font-medium text-zinc-500">
                    <CarIcon className="h-4 w-4" />
                    <span>{selectedAcm.numberOfParkingLots}</span>
                  </div>
                  {/* total area */}
                  <div className="flex flex-row gap-2 text-xs font-medium text-zinc-500">
                    <RulerIcon className="h-4 w-4" />
                    <span>{selectedAcm.numberOfRooms} mts2</span>
                  </div>
                </div>
                <hr className="my-6 h-[0px] w-full border border-neutral-400 border-opacity-50" />
                <div className="flex w-full flex-row justify-between px-4">
                  <div className="flex flex-row items-center justify-center gap-2">
                    <Image
                      src={
                        selectedAcm.operationType === "rent"
                          ? RentIllustration
                          : SellIllustration
                      }
                      alt="Rent"
                      width={50}
                      height={50}
                    />
                    <div className="flex flex-col">
                      {selectedAcm.operationType === "rent"
                        ? "Arriendo"
                        : "Venta"}
                      <span className="text-xs font-medium text-zinc-500 ">
                        {selectedAcm.buildingType}
                      </span>
                    </div>
                  </div>
                  <Button variant="secondary">
                    Valoracion Estimada: GTQ. 54,000.00
                  </Button>
                </div>
                <hr className="my-6 h-[0px] w-full border border-neutral-400 border-opacity-50" />
                {/* graph */}
                <div className="h-64 w-64 self-center">
                  <Doughnut data={graphData} />
                </div>
                <hr className="my-6 h-[0px] w-full border border-neutral-400 border-opacity-50" />
                <div className="flex flex-col gap-2">
                  <span className="mx-4">Propiedades Similares</span>
                  <DataTable
                    columns={columnsResult}
                    data={acmDataResult ?? []}
                    pagination={pagination}
                    onPaginationChange={setPagination}
                    pageCount={pageCount}
                  />
                </div>
              </DrawerContent>
            </DrawerPortal>
          )}
        </Drawer>
      </section>
    </LayoutSigned>
  );
}
