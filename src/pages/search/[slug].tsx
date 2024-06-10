import {
  type GetServerSidePropsContext,
  type InferGetStaticPropsType,
} from "next";
import { LayoutSigned } from "~/components/system/layouts/LayoutSigned";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Address(props: PageProps) {
  return <LayoutSigned>{props.search}</LayoutSigned>;
}

// Fetch data before the page loads
export const getStaticProps = async (ctx: GetServerSidePropsContext) => {
  const helpers = generateSSGHelper();

  const slug = ctx.params?.slug as string;

  if (!slug) throw new Error("No slug provided");

  const search = decodeURI(slug);

  return {
    props: {
      // very important - use `trpcState` as the key
      trpcState: helpers.dehydrate(),
      search,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
