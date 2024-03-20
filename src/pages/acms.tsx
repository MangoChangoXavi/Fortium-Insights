import { RouterOutputs, api } from "~/utils/api";
import {
  DataTable,
  type PaginationState,
} from "@/components/layouts/data-table";
import { useToast } from "@/components/ui/use-toast";
import React from "react";
import "chart.js/auto";
import { UIDebouncer } from "~/components/system/ui/UIDebouncer";
import {
  BathIcon,
  BedIcon,
  CalendarClockIcon,
  CalendarIcon,
  CarIcon,
  ClockIcon,
  PlusIcon,
  RulerIcon,
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
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
} from "@/components/ui/drawer";
import Image from "next/image";
import { Loader } from "~/components/system/layouts/Loader";
import { useRouter } from "next/router";

import ImageSidebarMapaUbicacion from '~/assets/img/imageSidebarMapaUbicacion.jpeg';
import ImageSidebarDifferentImages from '~/assets/img/imageSidebarDifferentLocations.jpeg';
import ImageSidebarArrowDown from '~/assets/img/arrowDown.png';
import ImageSidebarArrowUp from '~/assets/img/arrowUp.png';
import ImageSidebarMutual from '~/assets/img/mutual.png';
import ImageSidebarImageHouseRed from '~/assets/img/ImageSidebarImageHouseRed.png';
import ImageSidebarImageHouseYellow from '~/assets/img/ImageSidebarImageHouseYellow.png';
import ImageSidebarImageHouseGreen from '~/assets/img/ImageSidebarImageHouseGreen.png';
import imageSidebarCompraVenta from '~/assets/img/imageSidebarCompraVenta.jpeg';
import Link from "next/link";
import { GTQ, USD } from "~/utils/functions";

const ITEMS_PER_PAGE = 5;
type ACMGetDataTable = RouterOutputs["acm"]["getDataTable"]["acms"][0];
export default function ACMs() {
  const { toast } = useToast();
  const [filter, setFilter] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [selectedAcm, setSelectedAcm] = React.useState<ACMGetDataTable | null>(
    null,
  );

  // pagination for main table
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

  // pagination for result table
  const [
    { pageIndex: pageIndexResult, pageSize: pageSizeResult },
    setPaginationResult,
  ] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: ITEMS_PER_PAGE,
  });

  const paginationResult = React.useMemo(
    () => ({
      pageIndex: pageIndexResult,
      pageSize: pageSizeResult,
    }),
    [pageIndexResult, pageSizeResult],
  );

  const pageCountResult = Math.ceil(
    (selectedAcm?.acmResultDetail?.length ?? ITEMS_PER_PAGE) / ITEMS_PER_PAGE,
  );

  // const { data: countData } = api.acm.countStatus.useQuery();

  const ctx = api.useUtils();
  const { mutate, isLoading } = api.acm.create.useMutation({
    onSettled: () => {
      toast({
        title: "Analisis iniciado",
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

  const router = useRouter();
  const acmData = data?.acms.map((acm) => ({
    ...acm,
    handleSelect: async (action: string) => {
      if (action === "view") {
        setSelectedAcm(acm);
      }
      if (action === "print") {
        await router.push(`/pdf/acm/${acm.id}`);
      }
      if (action === "send") {
        console.log("send");
        setSelectedAcm(acm);
      }
    },
  }));

  const resultIsComplete =
    selectedAcm ;
  return (
    <LayoutSigned>
      <section className="container mx-auto mt-10 flex w-full flex-col gap-8">
        <UIDebouncer
          value={search}
          setValue={setSearch}
          icon={<SearchIcon className="h-4 w-4" />}
        />
        {/* tabs */}
        <div className="flex h-12 w-full flex-row justify-between rounded-lg bg-white px-10">
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
          
          <DrawerPortal>
            <DrawerOverlay className='fixed inset-0 bg-black/40' />
            <DrawerContent className='left-auto right-0 top-0 mt-0 h-screen w-full overflow-y-auto overflow-x-hidden rounded-none md:w-[75%] lg:w-[70%] xl:w-[58%] 2xl:w-[52%] px-4'>
              {resultIsComplete ? (
                <>
                  <DrawerHeader className='mb-6'>
                    <DrawerTitle className='text-slate-700 md:text-3xl'>
                      Información de la propiedad
                    </DrawerTitle>
                    <span className='text-slate-700 font-bold md:text-2xl'>
                      {selectedAcm.address}
                    </span>
                  </DrawerHeader>

                  <div className='flex w-full flex-row gap-4 px-4'>
                    <div className='border-r-2 pr-4 font-bold flex flex-col gap-1 h-12 items-center justify-end'>
                      <span className='text-zinc-500 md:text-sm lg:text-[16px]'>Tipología</span>
                      <div className='flex flex-row gap-2 md:text-[15px] lg:text-[18px] items-center'>
                        <ClockIcon className='h-4 w-4' />
                        <span>
                          {
                            {
                              "house": "Casa",
                              "apartment": "Apartamento",
                              "land": "Terreno",
                            }[selectedAcm.buildingType]
                          }
                        </span>
                      </div>
                    </div>
                    <div className='border-r-2 pr-4 font-bold flex flex-col gap-1 h-12 items-center justify-end'>
                      <span className='text-zinc-500 md:text-sm lg:text-[16px]'>Fecha</span>
                      <div className='flex flex-row gap-2 md:text-[15px] lg:text-[18px] items-center'>
                        <ClockIcon className='h-4 w-4' />
                        <span>{selectedAcm.createdAt.toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className='border-r-2 pr-4 font-bold flex flex-col gap-1 h-12 items-center justify-end'>
                      <span className='text-zinc-500 md:text-sm lg:text-[16px]'>Habitaciones</span>
                      <div className='flex flex-row gap-6 md:text-[15px] lg:text-[18px] items-center'>
                        <BedIcon className='h-4 w-4' />
                        <span>{selectedAcm.numberOfRooms}</span>
                      </div>
                    </div>
                    <div className='border-r-2 pr-4 font-bold flex flex-col gap-1 h-12 items-center justify-end'>
                      <span className='text-zinc-500 md:text-sm lg:text-[16px]'>Baños</span>
                      <div className='flex flex-row gap-4 md:text-[15px] lg:text-[18px] items-center'>
                        <BathIcon className='h-4 w-4' />
                        <span>{selectedAcm.numberOfBathrooms}</span>
                      </div>
                    </div>
                    <div className='border-r-2 pr-4 font-bold flex flex-col gap-1 h-12 items-center justify-end'>
                      <span className='text-zinc-500 md:text-sm lg:text-[16px]'>Parqueaderos</span>
                      <div className='flex flex-row gap-6 md:text-[15px] lg:text-[18px] items-center'>
                        <CarIcon className='h-4 w-4' />
                        <span>{selectedAcm.numberOfParkingLots}</span>
                      </div>
                    </div>
                    <div className='font-bold flex flex-col gap-1 h-12 items-center justify-end'>
                      <span className='text-zinc-500 md:text-sm lg:text-[16px]'>
                        Metros Construidos
                      </span>
                      <div className='flex flex-row gap-6 md:text-[15px] lg:text-[18px] items-center'>
                        <RulerIcon className='h-4 w-4' />
                        <span>{selectedAcm.totalArea} m²</span>
                      </div>
                    </div>
                  </div>

                  <div className='my-16 flex md:gap-16 2xl:gap-20 lg:px-4'>
                    {/* <div>
                      <Image
                        className='md:h-[200px] rounded-xl xl:h-[200px] 2xl:h-[250px] md:w-[350px] xl:w-[300px] 2xl:w-[350px]'
                        width={500}
                        height={500}
                        alt='image'
                        src={selectedAcm.satellitalImageUrl}
                      />
                    </div> */}
                    <div className='md:mt-8 xl:mt-14 font-bold'>
                      <div>
                        <DrawerTitle className='md:text-2xl xl:text-3xl 2xl:text-4xl text-slate-700'>
                          Precio de Venta
                        </DrawerTitle>

                        <div className='mt-4 md:text-xl xl:text-2xl'>
                          <p className='text-gray-600'>Valoracion Estimada:</p>
                          <p className='text-green-600'>
                            {USD.format(selectedAcm.acmResultSummary[0]?.expectedPrice as unknown as number)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className='my-6 h-[0px] w-full border border-neutral-400 border-opacity-50' />
                  <div className='my-6 px-4'>
                    <div className='flex gap-8'>
                      <div className='flex flex-col items-center'>
                        <div className='font-bold text-slate-700 text-xl text-center'>
                          <div>Días para vender</div>
                        </div>
                        <Image
                          className='h-[80px] w-[80px] mt-2'
                          width={500}
                          height={500}
                          src={ImageSidebarMutual}
                          alt='image'
                        />
                        <p className='py-2 font-bold text-slate-700 text-xl'>117</p>
                      </div>
                      <div className='mt-6 flex flex-col items-center'>
                        <div className='font-bold text-slate-700 text-xl text-center'>
                          precio min
                        </div>
                        <Image
                          className='h-[60px] w-[60px] mt-2'
                          width={500}
                          height={500}
                          src={ImageSidebarArrowDown}
                          alt='image'
                        />
                        <p className='mt-2 font-semibold text-slate-700'>{USD.format(selectedAcm.acmResultSummary[0]?.minValue as unknown as number)}</p>
                      </div>
                      <div className='mt-6 flex flex-col items-center'>
                        <div className='font-bold text-slate-700 text-xl text-center'>
                          precio máx
                        </div>
                        <Image
                          className='h-[60px] w-[60px] mt-2'
                          width={500}
                          height={500}
                          src={ImageSidebarArrowUp}
                          alt='image'
                        />
                        <p className='mt-2 font-semibold text-slate-700'>{USD.format(selectedAcm.acmResultSummary[0]?.maxValue as unknown as number)}</p>
                      </div>
                      <div>
                        <div className='font-bold text-slate-700 text-xl ml-4 text-center'>
                          Rentabilidad brutal anual alquiler
                        </div>
                        <div className='flex gap-2 font-semibold '>
                          <div className='relative'>
                            <Image
                              className='h-[100px] w-[100px] mt-2 ml-6'
                              width={500}
                              height={500}
                              src={ImageSidebarImageHouseRed}
                              alt='image'
                            />
                            <p className='ml-10' style={{ color: '#CF6330' }}>
                              Vivienda
                            </p>
                            <span className='absolute w-[50%] top-[40%] md:left-[50%] 2xl:left-[43%]'>
                              4.71%
                            </span>
                          </div>
                          <div className='relative'>
                            <Image
                              className='h-[100px] w-[100px] mt-2 ml-6'
                              width={500}
                              height={500}
                              src={ImageSidebarImageHouseYellow}
                              alt='image'
                            />
                            <p className='ml-12' style={{ color: '#CFB714' }}>
                              Barrio
                            </p>
                            <span className='absolute w-[50%] top-[40%] md:left-[50%] 2xl:left-[43%]'>
                              5.68%
                            </span>
                          </div>
                          <div className='relative'>
                            <Image
                              className='h-[100px] w-[100px] mt-2 ml-6'
                              width={500}
                              height={500}
                              src={ImageSidebarImageHouseGreen}
                              alt='image'
                            />
                            <p className='ml-12' style={{ color: '#14CF2A' }}>
                              Ciudad
                            </p>
                            <span className='absolute w-[50%] top-[40%] md:left-[50%] 2xl:left-[43%]'>
                              7.04%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                  <br />
                  <br />
                  <br />
                  <hr className='my-6 h-[0px] w-full border border-neutral-400 border-opacity-50' />

                  <div className='my-14'>
                    <DrawerTitle className='text-slate-700 md:text-3xl px-4'>
                      Mapa de ubicación
                    </DrawerTitle>
                    <div className='mx-auto w-[90%]'>
                      <div className='flex gap-10'>
                        <div>
                          <Image
                            className='h-[220px] w-[300px] mt-12 rounded-xl'
                            width={200}
                            height={200}
                            src={ImageSidebarMapaUbicacion}
                            nt-b
                            alt='image'
                          />
                          <div className='mt-8'>
                            <p className='font-bold my-2'>Descripción</p>
                            <div className='my-2'>
                              <span className='text-zinc-800 text-sm'>
                                Se valora una superficie de
                              </span>
                              <span className='font-bold text-sm'> {selectedAcm.totalArea} m²</span>
                            </div>
                            <div className="flex flex-col gap-1">
                            <p className='my-2 text-zinc-600 font-bold text-sm'>Datos del lugar</p>
                            <div className='flex text-sm gap-1'>
                              <div className='text-zinc-400 mr-2'>Superficie Construida</div>
                              <p>161 m²</p>
                            </div>
                            <div className='flex text-sm gap-1 '>
                              <div className='text-zinc-400 mr-2'>Superficie Gráfica</div>
                              <p>2.309 m²</p>
                            </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <Image
                            className='h-[220px] w-[300px] mt-12 rounded-xl'
                            width={500}
                            height={500}
                            src={ImageSidebarDifferentImages}
                            alt='image'
                          />
                          <div className='mt-14'>
                            <div className='text-sm flex flex-col'>
                              <span className='my-2 text-zinc-600 font-bold text-sm'>
                                Elementos de construcción
                              </span>
                              <div className='flex'>
                                <div className='text-zinc-400 mt-6 mr-4'>
                                  <p className='text-end my-2'>Vivienda</p>
                                  <p>Elementos Comunes</p>
                                </div>
                                <div className='flex mt-[10px]'>
                                  <div>
                                    <p className='text-zinc-400 font-bold mr-2'>Planta</p>
                                    <p className='mt-[3px]'>02</p>
                                  </div>
                                  <div>
                                    <p className='text-zinc-400 font-bold mr-2'>Puerta</p>
                                    <p className='mt-[3px]'>C</p>
                                  </div>
                                  <div>
                                    <p className='text-zinc-400 font-bold mr-2'>Superficie</p>
                                    <p className='mt-[3px]'>132 m²</p>
                                    <p>29 m²</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className='my-6 h-[0px] w-full border border-neutral-400 border-opacity-50' />
                  <div className='pl-4 my-14'>
                    <DrawerTitle className='text-slate-700 md:text-3xl'>Compra-venta</DrawerTitle>
                    <div className='border-2 my-8'>
                      <div className='pt-6 px-4'>
                        <p className='text-zinc-600 text-sm'>
                          el precio estimado del cierre del inmueble para la realización de
                          operaciones de <span className='font-bold'>compra-venta</span> es <br />
                          de <span className='font-bold'>GTQ. 268800</span>
                        </p>
                        <div className='mt-8'>
                          <div className='text-green-600 font-bold text-xl text-center'>
                            GTQ. 268800
                          </div>
                        </div>
                      </div>
                      <div className='px-4 pb-6'>
                        <Image
                          className='h-[35px] w-full'
                          src={imageSidebarCompraVenta}
                          alt='image'
                          height={500}
                          width={500}
                        />
                        <div className='flex justify-between'>
                          <div className='text-sm font-bold text-zinc-600'>
                            <p className='my-2'>Minimo estimado</p>
                            <p>GTQ. 241900</p>
                          </div>
                          <div className='text-sm font-bold text-zinc-600'>
                            <p className='my-2'>Máximo estimado</p>
                            <p className='text-end'>GTQ. 298700</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <DrawerTitle className='text-slate-700 md:text-3xl mt-20'>Alquiler</DrawerTitle>
                    <div className='border-2 my-8'>
                      <div className='pt-6 px-4'>
                        <p className='text-zinc-600 text-sm'>
                          el precio estimado para el inmueble en el mercado de{' '}
                          <span className='font-bold'>alquiler</span> es de{' '}
                          <span className='font-bold'>3000 GTQ/mes</span>
                        </p>
                        <div className='mt-8'>
                          <div className='text-green-600 font-bold text-xl text-center'>
                            3000 GTQ/mes
                          </div>
                        </div>
                      </div>
                      <div className='px-4 pb-6'>
                        <Image
                          className='h-[35px] w-full'
                          src={imageSidebarCompraVenta}
                          alt='image'
                          height={500}
                          width={500}
                        />
                        <div className='flex justify-between'>
                          <div className='text-sm font-bold text-zinc-600'>
                            <p className='my-2'>Minimo estimado</p>
                            <p>2800 GTQ/mes</p>
                          </div>
                          <div className='text-sm font-bold text-zinc-600'>
                            <p className='my-2'>Máximo estimado</p>
                            <p className='text-end'>3110 GTQ/mes</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className='my-6 h-[0px] w-full border border-neutral-400 border-opacity-50' />
                  <div className='my-14 px-4'>
                    <DrawerTitle className='text-slate-700 md:text-3xl'>
                      Propiedades Similares
                    </DrawerTitle>
                    {selectedAcm.acmResultDetail.map(( resultDetail, index ) => (
                      <Link href={resultDetail.url} key={index} target='_blank'>
                        <div className='mt-4'>
                          <div className='flex items-center gap-4 mt-12'>
                            <Image
                              className='h-[80px] w-[120px] rounded-xl'
                              width={500}
                              height={500}
                              src={
                                resultDetail.imagesUrl[0] ??
                                'https://dummyimage.com/600x400/000/fff&text=sin+imagen'
                              }
                              alt='image'
                            />
                            <div>
                              <div>
                                <p className='md:text-[18px] xl:text-[16px] 2xl:text-[18px] text-slate-700 font-semibold'>
                                  {resultDetail.address}
                                </p>
                              </div>
                              <div className='flex'>
                                <div className='font-bold pr-4'>
                                  <span className='text-zinc-500 md:text-sm lg:text-[14px]'>
                                    Habitaciones
                                  </span>
                                  <div className='flex flex-row gap-6 md:text-[13px] lg:text-[14px] items-center'>
                                    <BedIcon className='h-4 w-4' />
                                    <span>{resultDetail.numberOfRooms}</span>
                                  </div>
                                </div>

                                <div className='pr-4 font-bold'>
                                  <span className='text-zinc-500 md:text-sm lg:text-[14px]'>
                                    Baños
                                  </span>
                                  <div className='flex flex-row gap-4 md:text-[13px] lg:text-[14px] items-center'>
                                    <BathIcon className='h-4 w-4' />
                                    <span>{resultDetail.numberOfBathrooms}</span>
                                  </div>
                                </div>

                                <div className='pr-4 font-bold'>
                                  <span className='text-zinc-500 md:text-sm lg:text-[14px]'>
                                    Parqueadores
                                  </span>
                                  <div className='flex flex-row gap-4 md:text-[13px] lg:text-[14px] items-center'>
                                    <div className='pl-2'>
                                      <CarIcon className='h-4 w-4' />
                                    </div>
                                    <span>{resultDetail.numberOfParkingLots}</span>
                                  </div>
                                </div>

                                <div className='font-bold'>
                                  <span className='text-zinc-500 md:text-sm lg:text-[14px]'>
                                    Metros
                                  </span>
                                  <div className='flex flex-row md:text-[13px] lg:text-[14px]'>
                                    <RulerIcon className='h-4 w-4' />
                                    <span className='ml-2'>
                                      {resultDetail.totalArea as unknown as number}
                                    </span>
                                    <span className='ml-[2px]'>m²</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className='w-[40%] text-end'>
                              <span className='md:text-xl xl:text-2xl font-semibold text-green-600'>
                                {resultDetail.currency === "Q" ?GTQ.format(resultDetail.price as unknown as number) : USD.format(resultDetail.price as unknown as number)}
                              </span>
                            </div>
                          </div>
                          <hr className='my-6 h-[0px] w-full border border-neutral-400 border-opacity-50' />
                        </div>
                      </Link>
                    ))}
                  </div>
                  {/* <div className='flex w-full flex-row justify-between px-4'>
                    <div className='flex flex-row items-center justify-center gap-2'>
                      <Image
                        src={
                          selectedAcm.operationType === 'rent' ? RentIllustration : SellIllustration
                        }
                        alt='Rent'
                        width={50}
                        height={50}
                      />
                      <div className='flex flex-col'>
                        {selectedAcm.operationType === 'rent' ? 'Arriendo' : 'Venta'}
                        <span className='text-xs font-medium text-zinc-500 '>
                          {selectedAcm.buildingType}
                        </span>
                      </div>
                    </div>
                    <Button variant='secondary'>
                      Valoracion Estimada: GTQ. {selectedAcm.expectedPrice as unknown as number}
                    </Button>
                  </div> */}
                  {/* <div className='h-64 w-64 self-center'>
                    <Doughnut data={graphData} />
                  </div> */}
                </>
              ) : (
                <div className='flex w-full flex-row items-center justify-center text-xl text-primary-500'>
                  Aun no se ha completado la tasacion
                </div>
              )}
            </DrawerContent>
          </DrawerPortal>
        </Drawer>
      </section>
    </LayoutSigned>
  );
}
