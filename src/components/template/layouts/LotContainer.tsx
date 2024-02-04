import React, { useState } from "react";
import { Announce } from "./Announce";
import Ghost from "~/assets/img/ghost.gif";
import { LotBasicInfo } from "../forms/LotBasicInfo";
import { LotAdditionalInfo } from "../forms/LotAdditionalInfo";
import Handshake from "~/assets/img/handshake.gif";
import { api } from "~/utils/api";
import { useToast } from "@/components/ui/use-toast";

const announceSubtitle = `La informacion del lote ha sido guardada exitosamente, ahora puede realizar reservas en este lote.`;

interface BasicInfoI {
  price: number;
  downPayment: number;
  measures: string;
  location: string;
  totalArea: number;
}

interface AdditionalInfoI {
  boundaries: string;
  estateNumber: number;
  folioNumber: number;
  bookNumber: number;
}

interface PropsI {
  lotIdentifier: string;
  projectId: number;
}

export const LotContainer = ({ lotIdentifier, projectId }: PropsI) => {
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  // refs
  const basicInfoRef = React.useRef<BasicInfoI>();
  const additionalInfoRef = React.useRef<AdditionalInfoI>();

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };

  // use the `useMutation` hook to create a mutation
  const { mutate: createLot } = api.lot.createLot.useMutation({
    onSuccess: () => {
      // ctx.project.getSingleById.invalidate().catch((err) => {
      //   console.error(err);
      // });
      toast({ title: "Lote creado exitosamente" });
    },
    onError: (err) => {
      const errorMessage = err?.data?.zodError?.fieldErrors?.content?.[0];
      toast({
        title: errorMessage ?? "Something went wrong. Please try again later.",
      });
    },
  });

  const handleSubmitBasicInfo = (data: BasicInfoI) => {
    // save the progress
    basicInfoRef.current = { ...data };

    // go to next step
    handleNext();
  };

  const handleSubmitAdditionalInfo = (data: AdditionalInfoI) => {
    // save the progress
    additionalInfoRef.current = { ...data };

    // Validate all the data is present
    if (!basicInfoRef.current)
      return toast({ title: "La informacion basica es requerida" });
    if (!additionalInfoRef.current)
      return toast({ title: "La informacion adicional es requerida" });

    // go to next step
    handleNext();

    // create the reservation
    createLot({
      projectId,
      identifier: lotIdentifier.toString(),
      ...basicInfoRef.current,
      ...additionalInfoRef.current,
    });
  };

  return (
    <>
      {step === 1 && (
        <Announce
          handleClick={handleNext}
          image={Ghost}
          title="Sin informacion"
          subtitle="Este lote no posee informacion, antes de realizar alguna reserva se necesita ingresar la informacion necesaria"
        />
      )}
      {step === 2 && (
        <LotBasicInfo
          handleSubmit={handleSubmitBasicInfo}
          handlePrevious={handlePrevious}
        />
      )}
      {step === 3 && (
        <LotAdditionalInfo
          handlePrevious={handlePrevious}
          handleSubmit={handleSubmitAdditionalInfo}
        />
      )}
      {step === 4 && (
        <Announce
          subtitle={announceSubtitle}
          image={Handshake}
          title="Informacion Guardada"
        />
      )}
    </>
  );
};
