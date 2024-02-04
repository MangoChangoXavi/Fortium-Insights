import React, { type FormEvent } from "react";
import { getFileFromCanvas, uploadFile } from "~/utils/functions";
import { Announce } from "./Announce";
import { CustomerContact } from "../forms/CustomerContact";
import { CustomerInfo } from "../forms/CustomerInfo";
import { CustomerNames } from "../forms/CustomerNames";
import { PaymentFiles } from "../forms/PaymentFiles";
import { PaymentInfo } from "../forms/PaymentInfo";
import { useRouter } from "next/router";
import type SignatureCanvas from "react-signature-canvas";
import { DetailsHorizontal } from "../../system/layouts/DetailsHorizontal";
import { api } from "~/utils/api";
import Handshake from "~/assets/img/handshake.gif";
import { Terms } from "../forms/Terms";
import { useToast } from "@/components/ui/use-toast";
import { type StaticImageData } from "next/image";

interface PropsI {
  lotImage: string | StaticImageData;
  lotIdentifier: string;
  lotDescription: string;
  lotTitle: string;
  lotId: number;
  lotMeasures: string;
  lotDownPayment: string;
  lotPrice: string;
}

interface CustomerContactI {
  phone: number;
  workphone: number;
  email?: string;
  address: string;
  workaddress: string;
}

interface CustomerInfoI {
  dpi: number;
  nit: number;
  citizenship: string;
  profession: string;
  birthdate: Date;
  civilStatus: string;
}

interface CustomerNamesI {
  firstname: string;
  secondname: string;
  extraname?: string;
  lastname: string;
  secondlastname: string;
  surname?: string;
}
interface PaymentInfoI {
  downpaymentNumber?: number;
  downPaymentQuota?: number;
  downpaymentComments?: string;
  downpaymentDate: Date;
  startDate: Date;
  endDate: Date;
  reservationPrice: number;
  reservationNumber?: number;
  reservationQuota?: number;
  reservationComments?: string;
  interest: number;
  payday: number;
  comments?: string;
}
interface PaymentFilesI {
  frontDpi: FileList;
  backDpi: FileList;
  clientImage: FileList;
}

interface TermsI {
  signatureUrl: string;
  frontDpiUrl: string;
  backDpiUrl: string;
  clientImageUrl: string;
}

const announceSubtitle = `Excelente, ya nos estamos encargando de crear la reserva en el
sistema, este consciente de que aún se requiere de la aprobación de un
supervisor de ventas, posterior a eso se tomara como finalizada y
vendida.`;

export const ReservationContainer = ({
  lotDescription,
  lotDownPayment,
  lotId,
  lotIdentifier,
  lotImage,
  lotTitle,
  lotPrice,
  lotMeasures,
}: PropsI) => {
  const [step, setStep] = React.useState<number>(1);
  const { toast } = useToast();

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };

  const padRef = React.useRef<SignatureCanvas>(null);

  // Refs
  const customerContactRef = React.useRef<CustomerContactI>();
  const customerInfoRef = React.useRef<CustomerInfoI>();
  const customerNamesRef = React.useRef<CustomerNamesI>();
  const paymentInfoRef = React.useRef<PaymentInfoI>();
  const paymentFilesRef = React.useRef<PaymentFilesI>();
  const termsRef = React.useRef<TermsI>();

  const { push } = useRouter();
  // use the `useMutation` hook to create a mutation
  const { mutate: createReservation, isLoading: isPosting } =
    api.reservation.create.useMutation({
      onSuccess: async () => {
        // ctx.project.getSingleById.invalidate().catch((err) => {
        //   console.error(err);
        // });
        toast({ title: "Solicitud de Compra Creada" });
        await push("/reports/reservations");
      },
      onError: (err) => {
        const errorMessage = err?.data?.zodError?.fieldErrors?.content?.[0];
        toast({
          title:
            errorMessage ?? "Something went wrong. Please try again later.",
        });
      },
    });

  const handleSubmitCustomerNames = (data: CustomerNamesI) => {
    // save the progress
    customerNamesRef.current = { ...data };

    // go to next step
    handleNext();
  };

  const handleSubmitCustomerInfo = (data: CustomerInfoI) => {
    // save the progress
    customerInfoRef.current = { ...data };

    // go to next step
    handleNext();
  };

  const handleSubmitCustomerContact = (data: CustomerContactI) => {
    // save the progress
    customerContactRef.current = { ...data };

    // go to next step
    handleNext();
  };

  const handleSubmitPaymentInfo = (data: PaymentInfoI) => {
    console.log("here");
    console.log(data);
    // save the progress
    paymentInfoRef.current = { ...data };

    // go to next step
    handleNext();
  };

  const handleSubmitPaymentFiles = (data: PaymentFilesI) => {
    // save the progress
    paymentFilesRef.current = { ...data };

    // go to next step
    handleNext();
  };

  const handleSubmitTerms = async (e: FormEvent<HTMLFormElement>) => {
    // prevent update page
    e.preventDefault();

    // Get file from canvas
    const signature = await getFileFromCanvas(padRef);

    // go to next step
    handleNext();

    // files
    const frontDPI = paymentFilesRef.current?.frontDpi[0];
    const backDPI = paymentFilesRef.current?.backDpi[0];
    const clientImage = paymentFilesRef.current?.clientImage[0];

    // validations
    if (!signature) return toast({ title: "La firma es requerida" });
    if (!frontDPI) return toast({ title: "El dpi frontal es requerid" });
    if (!backDPI) return toast({ title: "La firma es requerida" });
    if (!clientImage) return toast({ title: "La firma es requerida" });

    // upload files to vercel blob
    const signatureUrl = await uploadFile(signature);
    const frontDpiUrl = await uploadFile(frontDPI);
    const backDpiUrl = await uploadFile(backDPI);
    const clientImageUrl = await uploadFile(clientImage);

    // save the progress
    termsRef.current = {
      signatureUrl,
      frontDpiUrl,
      backDpiUrl,
      clientImageUrl,
    };

    // Validate all the data is present
    if (!customerNamesRef.current)
      return toast({ title: "Los nombres del cliente son requeridos" });
    if (!customerInfoRef.current)
      return toast({ title: "La informacion del cliente es requerida" });
    if (!customerContactRef.current)
      return toast({ title: "Los contactos del cliente son requeridos" });
    if (!paymentInfoRef.current)
      return toast({ title: "La informacion de pago es requerida" });
    if (!termsRef.current)
      return toast({ title: "Los terminos son requeridos" });

    // create the reservation
    createReservation({
      lotId,
      ...customerNamesRef.current,
      ...customerInfoRef.current,
      ...customerContactRef.current,
      ...paymentInfoRef.current,
      ...termsRef.current,
    });
  };

  return (
    <>
      {step === 1 && (
        <DetailsHorizontal
          imageUrl={lotImage}
          title={lotTitle}
          subtitle={lotDescription}
          items={[
            {
              title: "Numero de Lote",
              subtitle: `No. ${lotIdentifier}`,
            },
            {
              title: "Superficie",
              subtitle: lotMeasures,
            },
            {
              title: "Enganche",
              subtitle: lotDownPayment,
            },
            {
              title: "Precio",
              subtitle: lotPrice,
            },
          ]}
          buttons={[
            {
              label: "Reservar",
              color: "primary",
              handleClick: handleNext,
            },
          ]}
        />
      )}
      {step === 2 && (
        <CustomerNames
          handleSubmit={handleSubmitCustomerNames}
          handlePrevious={handlePrevious}
        />
      )}
      {step === 3 && (
        <CustomerInfo
          handleSubmit={handleSubmitCustomerInfo}
          handlePrevious={handlePrevious}
        />
      )}
      {step === 4 && (
        <CustomerContact
          handleSubmit={handleSubmitCustomerContact}
          handlePrevious={handlePrevious}
        />
      )}
      {step === 5 && (
        <PaymentInfo
          handleSubmit={handleSubmitPaymentInfo}
          handlePrevious={handlePrevious}
        />
      )}
      {step === 6 && (
        <PaymentFiles
          handleSubmit={handleSubmitPaymentFiles}
          handlePrevious={handlePrevious}
        />
      )}
      {step === 7 && (
        <Terms
          padRef={padRef}
          handlePrevious={handlePrevious}
          handleSubmit={handleSubmitTerms}
        />
      )}
      {step === 8 && (
        <Announce
          subtitle={announceSubtitle}
          image={Handshake}
          title="Reserva realizada"
        />
      )}
    </>
  );
};
