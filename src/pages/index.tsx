import Banner from "~/features/landing/components/Banner";
import { FloatingChat } from "~/features/landing/components/FloatingChat";
import { Message } from "~/features/landing/components/Message";
import Properties from "~/features/landing/components/Properties";
import { LayoutNotSigned } from "~/components/system/layouts/LayoutNotSigned";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

export default function Home() {
  return (
    <>
      <LayoutNotSigned>
        <Banner />
        <Properties />
        <Message />
        <FloatingChat />
      </LayoutNotSigned>
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
