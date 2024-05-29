import Footer from "~/features/landingPage/components/Footer";
import Header from "~/features/landingPage/components/Header";
import {
  type GetServerSidePropsContext,
  type InferGetStaticPropsType,
} from "next";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { GTQ, USD } from "~/utils/functions";
import houseSvg from "~/assets/svg/bi_house-fill.svg";
import Image from "next/image";
import { api } from "~/utils/api";
import { Loader } from "~/components/system/layouts/Loader";
import { Card } from "~/components/system/ui/Card";
import { ScrollArea } from "@/components/ui/scroll-area";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Result = ({ price, title }: { price: string; title: string }) => {
  return (
    <div className="flex flex-col items-center justify-start gap-1">
      <div className="font-['Plus Jakarta Sans'] text-center text-xl font-semibold text-zinc-800">
        {price}
      </div>
      <div className="font-['Plus Jakarta Sans'] text-xs font-normal text-neutral-400">
        {title}
      </div>
    </div>
  );
};

const Property = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="flex flex-col items-center justify-start gap-1">
      <div className="font-['Plus Jakarta Sans'] text-center text-xl font-semibold text-zinc-800">
        {value}
      </div>
      <div className="font-['Plus Jakarta Sans'] text-xs font-normal text-neutral-400">
        {title}
      </div>
    </div>
  );
};

export default function Valuate(props: PageProps) {
  const { slug } = props;

  const { data, isLoading } = api.acm.get.useQuery({
    id: slug,
  });

  const sellPrice = data?.predictions[0]?.linearRegression?.linear_regression;
  const rentPrice = data?.predictions[1]?.linearRegression?.linear_regression;

  return (
    <>
      {/* <Hero/> */}
      <Header />
      {/* result */}
      <section className="flex h-full w-full items-center justify-center bg-gray-100 px-4 pb-8">
        {isLoading && (
          <div className="flex h-full w-full items-center justify-center">
            <Loader />
          </div>
        )}
        {data && (
          <div className="flex flex-col items-center justify-center gap-6">
            {/* result card */}
            <div className="relative mt-20 flex h-fit w-full flex-col items-center gap-5 rounded-2xl border bg-white p-12  drop-shadow-xl md:mt-32 md:w-[620px]">
              {/* house svg */}
              <Image
                src={houseSvg}
                alt="house"
                className="h-18 w-18 absolute -top-12"
              />
              {/* prices */}
              <div className="flex gap-10">
                <Result price={USD.format(sellPrice)} title="Venta" />
                <Result price={USD.format(rentPrice)} title="Renta" />
              </div>
              {/* separator */}
              <div className="border-neutral-400/opacity-50 h-[0px] w-full border"></div>
              {/* description */}
              <div className="font-['Plus Jakarta Sans'] text-center text-sm font-normal text-zinc-500 md:w-[573px]">
                Estimado de Techos Digitales para{" "}
                {data.buildingType?.toLowerCase() === "house"
                  ? "casa"
                  : "departamento"}{" "}
                en {data.address}
              </div>
              {/* properties */}
              <div className="grid grid-cols-2 gap-10 md:flex ">
                <Property
                  title="Metros cuadrados"
                  value={data.totalArea?.toString() ?? "N/A"}
                />
                <Property
                  title="Habitaciones"
                  value={data.numberOfRooms?.toString() ?? "N/A"}
                />
                <Property
                  title="Baños"
                  value={data.numberOfBathrooms?.toString() ?? "N/A"}
                />
                <Property
                  title="Estacionamientos"
                  value={data.numberOfParkingLots?.toString() ?? "N/A"}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-['Plus Jakarta Sans'] text-center text-lg font-semibold text-zinc-800">
                Propiedades similares
              </div>
              {/* cards */}
              <div className="grid  w-full grid-cols-1 gap-3 align-middle lg:grid-cols-2">
                {data.scrappedPosts.map((i) => (
                  <Card
                    key={i._id}
                    url={`/listing/${i._id}`}
                    formattedPrice={
                      i.currency === "GTQ"
                        ? GTQ.format(i.price)
                        : USD.format(i.price)
                    }
                    numberOfRooms={i.numberOfRooms}
                    numberOfBathrooms={i.numberOfBathrooms}
                    numberOfParkingLots={i.numberOfParkingLots}
                    totalArea={i.totalArea}
                    address={i.address}
                    imageUrl={i.imagesUrl[0] ?? ""}
                    operationType={i.operationType}
                    buildingType={i.buildingType}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}

// Fetch data before the page loads
export const getStaticProps = (ctx: GetServerSidePropsContext) => {
  const helpers = generateSSGHelper();

  const slug = ctx.params?.slug as string;

  helpers.acm.get
    .prefetch({
      id: slug,
    })
    .catch(console.error);

  return {
    props: {
      // very important - use `trpcState` as the key
      trpcState: helpers.dehydrate(),
      slug,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
