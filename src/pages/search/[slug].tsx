import Footer from "~/features/landingPage/components/Footer";
import Header from "~/features/landingPage/components/Header";
import {
  type GetServerSidePropsContext,
  type InferGetStaticPropsType,
} from "next";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import MapSelect from "~/components/system/ui/MapSelect";
import { useEffect, useState } from "react";
import Map from "~/components/system/ui/Map";
import { getCoordinates } from "~/utils/googleMaps";
import { api } from "~/utils/api";
import { Card } from "~/components/system/ui/Card";
import { GTQ, USD } from "~/utils/functions";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;
export default function Address(props: PageProps) {
  const { location } = props;
  const [address, setAddress] = useState<string>(props.address);

  const { data, isLoading } = api.requirements.get.useQuery({
    lat: location.lat,
    lng: location.lng,
  });

  const markers = data?.map((i) => ({
    lat: i.location.coordinates[1],
    lng: i.location.coordinates[0],
  }));

  const hasData = data && data.length > 0 && markers && markers.length > 0;

  return (
    <>
      {/* <Hero/> */}
      <section className="w-100 relative  bg-cover bg-center bg-no-repeat">
        <Header />
      </section>
      <div className="flex h-fit w-full flex-row gap-4 border-b-2 border-t-2 bg-white px-8 py-2">
        <div className="w-96">
          <MapSelect setAddress={setAddress} address={address} />
        </div>
      </div>
      {hasData && (
        <section className="flex min-h-screen flex-row gap-2">
          {/* map */}
          <div className="hidden md:block">
            <Map
              center={{ lat: location.lat, lng: location.lng }}
              width="50vw"
              height="50vw"
              markers={markers}
            />
          </div>
          {/* results */}
          <div className="flex min-h-screen flex-col gap-[16px] ">
            {/* title and subtitle */}
            <div className="flex flex-col gap-[8px]">
              {/* title */}
              <h1 className="text-xl font-semibold not-italic leading-[normal] text-[#2C2C2C]">
                Casas y Apartamentos disponibles en {address}
              </h1>
              {/* subtitle */}
              <article className="text-sm font-normal not-italic leading-[normal] text-[#808080]">
                {markers.length} propiedades encontradas
              </article>
            </div>
            {/* cards */}
            <div className="grid h-screen grid-cols-1 gap-2 overflow-y-scroll align-middle lg:grid-cols-2">
              {data.map((i) => (
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
                  totalArea={i.totalArea}
                  address={i.address}
                  imageUrl={i.imagesUrl[0]}
                />
              ))}
            </div>
          </div>
        </section>
      )}
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

  const location = await getCoordinates(address);

  return {
    props: {
      // very important - use `trpcState` as the key
      trpcState: helpers.dehydrate(),
      address,
      location: JSON.parse(JSON.stringify(location)),
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
