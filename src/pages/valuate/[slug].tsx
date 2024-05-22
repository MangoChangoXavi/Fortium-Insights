import Footer from "~/features/landingPage/components/Footer";
import Header from "~/features/landingPage/components/Header";
import {
  type GetServerSidePropsContext,
  type InferGetStaticPropsType,
} from "next";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { USD } from "~/utils/functions";
import houseSvg from "~/assets/svg/bi_house-fill.svg";
import Image from "next/image";

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

export default function Address(props: PageProps) {
  return (
    <>
      {/* <Hero/> */}
      <Header />
      {/* result */}
      <section className="flex h-full w-full items-center justify-center bg-white px-4">
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
            <Result price={USD.format(1004320.43)} title="Venta" />
            <Result price={USD.format(4452.34)} title="Renta" />
          </div>
          {/* separator */}
          <div className="border-neutral-400/opacity-50 h-[0px] w-full border"></div>
          {/* description */}
          <div className="font-['Plus Jakarta Sans'] text-center text-sm font-normal text-zinc-500 md:w-[573px]">
            Estimado de Techos Digitales para casa en 24 avenida 3a. calle, zona
            4, ciudad de Guatemala
          </div>
          {/* properties */}
          <div className="grid grid-cols-2 gap-10 md:flex ">
            <Property title="Metros cuadrados" value="120" />
            <Property title="Habitaciones" value="3" />
            <Property title="Baños" value="2" />
            <Property title="Estacionamientos" value="2" />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

// Fetch data before the page loads
export const getStaticProps = async (ctx: GetServerSidePropsContext) => {
  const helpers = generateSSGHelper();

  const slug = ctx.params?.slug as string;

  if (!slug) throw new Error("No slug provided");

  const address = slug;

  return {
    props: {
      // very important - use `trpcState` as the key
      trpcState: helpers.dehydrate(),
      address,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
