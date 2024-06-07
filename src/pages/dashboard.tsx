import React from "react";
import { LayoutSigned } from "~/components/system/layouts/LayoutSigned";
import { CategoriesBar } from "~/components/template/layouts/CategoriesBar";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

export default function Dashboard() {
  return (
    <>
      <LayoutSigned>
        <CategoriesBar />
      </LayoutSigned>
    </>
  );
}

// Fetch data before the page loads
export const getStaticProps = () => {
  const helpers = generateSSGHelper();

  return {
    props: {
      // very important - use `trpcState` as the key
      trpcState: helpers.dehydrate(),
    },
  };
};
