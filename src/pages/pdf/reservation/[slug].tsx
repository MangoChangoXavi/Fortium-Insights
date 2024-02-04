import {
  type InferGetStaticPropsType,
  type GetServerSidePropsContext,
} from "next";
import dynamic from "next/dynamic";
import React from "react";
import { UILoadingPage } from "~/components/system/layouts/Loader";
import { PageNotFound } from "~/components/system/layouts/PageNotFound";
import { LayoutSigned } from "~/components/system/layouts/LayoutSigned";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;
export default function PDFReservation(props: PageProps) {
  const { data: reservation, isLoading } = api.reservation.get.useQuery({
    id: props.reservationId,
  });

  const Template = dynamic(
    () => import("~/components/template/pdf/TReservationPDF"),
    {
      loading: () => <p>Loading...</p>,
      ssr: false,
    },
  );

  if (isLoading) return <UILoadingPage />;
  return (
    <LayoutSigned>
      {reservation ? <Template reservation={reservation} /> : <PageNotFound />}
    </LayoutSigned>
  );
}

// Fetch data before the page loads
export const getStaticProps = (ctx: GetServerSidePropsContext) => {
  const helpers = generateSSGHelper();

  const slug = ctx.params?.slug as string;

  if (!slug) throw new Error("No slug provided");

  const reservationId = parseInt(slug);

  helpers.reservation.get.prefetch({ id: reservationId }).catch((err) => {
    console.error(err);
  });

  return {
    props: {
      // very important - use `trpcState` as the key
      trpcState: helpers.dehydrate(),
      reservationId,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
