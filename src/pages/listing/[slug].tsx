import Footer from "~/features/landingPage/components/Footer";
import Header from "~/features/landingPage/components/Header";
import {
  type GetServerSidePropsContext,
  type InferGetStaticPropsType,
} from "next";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

import { DetailsHorizontal } from "~/components/system/layouts/DetailsHorizontal";
import { getItemFromMongo } from "~/server/api/mongodb";
import { PageNotFound } from "~/components/system/layouts/PageNotFound";
import { GTQ, USD } from "~/utils/functions";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;
export default function Listing(props: PageProps) {
  const { listing } = props;

  const formattedPrice =
    listing.currency === "USD"
      ? // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        USD.format(listing.price)
      : // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        GTQ.format(listing.price);

  console.log(listing);

  if (!listing) return <PageNotFound />;
  return (
    <>
      {/* <Hero/> */}
      <section className="w-100 relative  bg-cover bg-center bg-no-repeat">
        <Header />
      </section>
      <section className="">
        <DetailsHorizontal
          title={listing.address}
          images={
            listing.imagesUrl.length > 4
              ? // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                listing.imagesUrl.slice(0, 4)
              : listing.imagesUrl
          }
          url={listing.url}
          lat={listing.location.coordinates[1]}
          lng={listing.location.coordinates[0]}
          items={[
            {
              title: formattedPrice,
              subtitle: "Precio",
            },
            {
              title: listing.numberOfRooms,
              subtitle: "Dormitorios",
            },
            {
              title: listing.numberOfBathrooms,
              subtitle: "Sanitarios",
            },
            {
              title: listing.numberOfParkingLots,
              subtitle: "Parqueos",
            },
            {
              title: listing.totalArea,
              subtitle: "Metros Cuadrados",
            },
          ]}
          subtitle="Compra esta propiedad con la ayuda de techos digitales."
          buttons={[
            {
              label: "Ver mas",
              variant: "primary",
              href: listing.url,
            },
            // {
            //   label: "Contactar",
            //   variant: "dark",
            //   href: `https://wa.me/+59541638?text=Hola me gustaria mas informacion sobre esta propiedad: https://www.techosdigitales.com/listing/${listing._id}`,
            // },
            // {
            //   label: "Compartir",
            //   variant: "secondary",
            // },
          ]}
        />
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

  const listingId = slug;

  const listing = await getItemFromMongo(listingId);

  return {
    props: {
      // very important - use `trpcState` as the key
      trpcState: helpers.dehydrate(),
      listing: JSON.parse(JSON.stringify(listing)),
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
