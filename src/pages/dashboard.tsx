import React from "react";
import { LayoutSigned } from "~/components/system/layouts/LayoutSigned";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

export default function Dashboard() {
  return (
    <>
      <LayoutSigned>
        <div id="main-content" className="h-full w-full overflow-y-auto ">
          {/* <FormMonthDatePicker
            startDate={startDate}
            setStartDate={setStartDate}
          /> */}
          <main className="py-4"></main>
        </div>
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
