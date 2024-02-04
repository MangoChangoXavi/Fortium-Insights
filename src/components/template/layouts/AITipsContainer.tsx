import React, { useMemo } from "react";
import { AnnounceDashboard } from "~/components/system/dashboard/AnnounceDashboard";
import Bulb from "~/assets/svg/bulb.svg";
import { getTip } from "~/utils/functions";

export const AITipsContainer = () => {
  const [response, setResponse] = React.useState<string>("");

  //  get tip function in a use memo
  useMemo(() => {
    const gettingTip = async () => {
      const res = await getTip();
      setResponse(res);
    };
    void gettingTip();
  }, []);

  return (
    <>
      {/* announcement */}
      <AnnounceDashboard title="Consejero AI" text={response} image={Bulb} />
    </>
  );
};
