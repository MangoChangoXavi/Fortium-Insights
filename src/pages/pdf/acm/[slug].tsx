import {
  type InferGetStaticPropsType,
  type GetServerSidePropsContext,
  GetStaticPaths,
} from "next";
import dynamic from "next/dynamic";
import React from "react";
import { LayoutSigned } from "~/components/system/layouts/LayoutSigned";
import { LoadingPage } from "~/components/system/layouts/Loader";
import { PageNotFound } from "~/components/system/layouts/PageNotFound";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";
type PageProps = InferGetStaticPropsType<typeof getStaticProps>;
export default function PDFACM(props: PageProps) {
  const { data: acm, isLoading } = api.acm.read.useQuery({
    id: props.acmId,
  });

  const Template = dynamic(() => import("~/components/template/pdf/acm"), {
    loading: () => <p>Loading...</p>,
    ssr: false,
  });

  if (isLoading) return <LoadingPage />;
  return (
    <LayoutSigned>
      {acm ? <Template acm={acm} /> : <PageNotFound />}
    </LayoutSigned>
  );
}

// Fetch data before the page loads
export const getStaticProps = (ctx: GetServerSidePropsContext) => {
  const helpers = generateSSGHelper();

  const slug = ctx.params?.slug as string;

  if (!slug) throw new Error("No slug provided");

  const acmId = slug;

  helpers.acm.read.prefetch({ id: acmId }).catch((err) => {
    console.error(err);
  });

  return {
    props: {
      // very important - use `trpcState` as the key
      trpcState: helpers.dehydrate(),
      acmId,
    },
  };
};
export const getStaticPaths: GetStaticPaths<{ slug: string }> = () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};
