import React, { type FormEvent } from "react";
import { Signature } from "~/components/system/ui/Signature";
import type SignatureCanvas from "react-signature-canvas";
import { Label } from "@/components/ui/label";
import { StepsButtonGroup } from "./StepsButtonGroup";

interface PropsI {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handlePrevious: () => void;
  padRef: React.MutableRefObject<SignatureCanvas | null>;
}

export const Terms = ({ handleSubmit, handlePrevious, padRef }: PropsI) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="animate-fade-right animate-delay-[50ms] animate-duration-[1200ms] animate-ease-in-out flex flex-col gap-12"
    >
      {/* title and subtitle */}
      <div className="flex flex-col gap-[16px] ">
        {/* title */}
        <h1 className="text-xl font-semibold not-italic leading-[normal] text-[#2C2C2C]">
          Términos y condiciones
        </h1>
        {/* subtitle */}
        <article className="text-sm font-normal not-italic leading-[normal] text-[#808080]">
          Esta solicitud de compra desde el momento de su aceptación y firma por
          el prominiente comprador, esta sujeta a los siguientes derechos y
          condiciones aqui expresadas, las cuales se entienden que serán{" "}
          <b>obligatorias para ambas partes.</b>
        </article>
        <ol className="list-decimal pl-4 text-sm font-normal not-italic leading-[normal] text-[#808080]">
          <li className="my-1">
            La reserva tendrá vigencia por un tiempo <b>no mayor de 5 días</b>{" "}
            contando a partir de la firma de aceptación de cliente y en caso
            contrario quedará sin validez alguna, sin perjuicio de la parte
            vendedora.
          </li>
          <li className="my-1">
            El prominiente comprador al momento de fijar plan de cobro deberá
            exigir su promesa de venta, la cual se le exetenderá en las oficinas
            centrales de la empresa.
          </li>
          <li className="my-1">
            Todo ofrecimiento por parte del asesor de ventas deberá ir
            consignado en la respectiva solicitud de comprador para que tenga
            plena validez.
          </li>
          <li className="my-1">
            Al ser compra a plazos se coobrará la escritura publica de promesa
            de venta por Q.() y gastos de escrituracion definitiva Q.() mas el
            plano de ingeniería Q.()
          </li>
          <li className="my-1">
            En caso de rescindir del negocio <b>se cobrará el 100%</b> del valor
            total de la propiedad por gastos de administración.
          </li>
        </ol>
      </div>
      <div className="flex flex-col gap-4">
        {/* Firma */}
        <Label>Firma</Label>
        <Signature padRef={padRef} />
      </div>
      {/* Buttons Group */}
      <StepsButtonGroup handlePrevious={handlePrevious} />
    </form>
  );
};
