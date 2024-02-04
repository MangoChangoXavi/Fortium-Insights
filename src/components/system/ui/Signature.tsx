import { Button } from "@/components/ui/button";
import React from "react";
import SignaturePad from "react-signature-canvas";
import type SignatureCanvas from "react-signature-canvas";

interface PropsI {
  padRef: React.MutableRefObject<SignatureCanvas | null>;
}

export const Signature = ({ padRef }: PropsI) => {
  const reload = () => {
    if (padRef.current) padRef.current.clear();
  };

  return (
    <div className="flex flex-col gap-4">
      <SignaturePad
        ref={padRef}
        canvasProps={{
          className:
            "signatureCanvas w-full h-80 border border-darkGray rounded-xl",
        }}
      />
      <Button variant="secondary" type="button" onClick={reload}>
        Limpiar
      </Button>
    </div>
  );
};
