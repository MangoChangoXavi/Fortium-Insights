import Link from "next/link";
import React from "react";
import { WhatsAppIcon } from "~/components/system/ui/Icons";

export const FloatingChat = () => {
  return (
    <div className="relative">
      <Link
        href="https://wa.me/<number>"
        className="text-primary fixed bottom-0 right-0 z-20 mb-5 
                  mr-1 flex shrink-0 grow-0 flex-col
                  justify-around rounded-lg lg:mb-5 lg:mr-5 xl:mb-10 xl:mr-10"
      >
        <div className="border-primary rounded-full border-4 bg-green-600 p-3">
          <WhatsAppIcon />
        </div>
      </Link>
    </div>
  );
};
