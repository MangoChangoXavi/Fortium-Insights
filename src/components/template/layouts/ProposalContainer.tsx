import React, { useEffect, useState } from "react";
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
  const [servicesForms, setServicesForms] = useState<React.ReactNode[]>([]);
  const serviceArrRef = React.useRef<ServiceInfoI[]>([]);
  const { toast } = useToast();

  // refs
  const basicInfoRef = React.useRef<BasicInfoI>();

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  // use the `useMutation` hook to create a mutation
  const { mutate: createProposal } = api.proposal.create.useMutation({
    onSuccess: () => {
      // ctx.project.getSingleById.invalidate().catch((err) => {
      //   console.error(err);
      // });
      toast({ title: "Proposal creado exitosamente" });
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

    // update the services number
    setServicesForms(
      Array.from({ length: data.servicesNumber }, (_, i) => (
        <ProposalServices
          key={i}
          handleSubmit={handleSubmitServices}
          serviceNumber={i + 1}
        />
      )),
    );

    // go to next step
    handleNext();
  };

  const handleSubmitServices = (data: ServiceInfoI) => {
    // Validate all the data is present
    if (!basicInfoRef.current)
      return toast({ title: "La informacion basica es requerida" });

    // Adding one service
    serviceArrRef.current.push(data);
    // go to next step
    handleNext();
  };

  // watching for all services to create them
  useEffect(() => {
    if (step === servicesForms.length + 2 && basicInfoRef.current) {
      // create the proposal
      createProposal({
        ...basicInfoRef.current,
        services: serviceArrRef.current,
      });
    }
  }, [createProposal, servicesForms.length, step]);

  // booleans
  const canAnnounce = servicesForms.length && step === servicesForms.length + 2;

  return (
    <>
      {step === 1 && <ProposalBasic handleSubmit={handleSubmitBasicInfo} />}

      {servicesForms.map(
        (form, i) => step === i + 2 && <div key={i}>{form}</div>,
      )}

      {canAnnounce ? (
        <Announce
          subtitle={announceSubtitle}
          image={Handshake}
          title="Informacion Guardada"
        />
      ) : (
        <></>
      )}
    </>
  );
};
