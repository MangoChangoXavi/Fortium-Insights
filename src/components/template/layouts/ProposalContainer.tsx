import React, { useState } from "react";
import Handshake from "~/assets/img/handshake.gif";
import { api } from "~/utils/api";
import { useToast } from "@/components/ui/use-toast";
import { Announce } from "./Announce";
import { ProposalBasic } from "../forms/ProposalBasic";
import { ProposalServices } from "../forms/ProposalServices";

const announceSubtitle = `La informacion de la nueva propuesta de proyecto ha sido guardada exitosamente`;

interface BasicInfoI {
  title: string;
  client: string;
  servicesNumber: number;
}

interface ServiceInfoI {
  title: string;
  description: string;
}

export const ProposalContainer = () => {
  const [step, setStep] = useState(1);
  const [serviceNumber, setServiceNumber] = useState(1);
  const serviceArrRef = React.useRef<ServiceInfoI[]>([]);
  const { toast } = useToast();

  // refs
  const basicInfoRef = React.useRef<BasicInfoI>();

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };

  // use the `useMutation` hook to create a mutation
  const { mutate: createProposal } = api.proposal.create.useMutation({
    onSuccess: () => {
      // ctx.project.getSingleById.invalidate().catch((err) => {
      //   console.error(err);
      // });
      toast({ title: "Proposale creado exitosamente" });
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

  const handleSubmitServices = (data: ServiceInfoI) => {
    // Validate all the data is present
    if (!basicInfoRef.current)
      return toast({ title: "La informacion basica es requerida" });

    if (serviceNumber >= basicInfoRef.current.servicesNumber) {
      // Adding one service
      serviceArrRef.current.push(data);
      setServiceNumber((prev) => prev + 1);
      return;
    }
    // go to next step
    handleNext();

    // create the reservation
    createProposal({
      ...basicInfoRef.current,
    });

    // create the services
  };

  return (
    <>
      {step === 1 && <ProposalBasic handleSubmit={handleSubmitBasicInfo} />}

      {step === 2 && basicInfoRef.current && (
        <ProposalServices handleSubmit={handleSubmitServices} />
      )}

      {step === 3 && (
        <Announce
          subtitle={announceSubtitle}
          image={Handshake}
          title="Informacion Guardada"
        />
      )}
    </>
  );
};
