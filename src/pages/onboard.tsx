import Footer from "~/features/landingPage/components/Footer";
import Header from "~/features/landingPage/components/Header";
import { Onboard } from "~/components/template/forms/Onboard";
import { api } from "~/utils/api";
import { useToast } from "@/components/ui/use-toast";

export default function OnBoard() {
  const { toast } = useToast();

  // use the `useMutation` hook to create a mutation
  const { mutate: createOnboard } = api.onboard.create.useMutation({
    onSuccess: () => {
      toast({ title: "Datos para nuevo proyecto enviados correctamente!" });
    },
    onError: (err) => {
      const errorMessage = err?.data?.zodError?.fieldErrors?.content?.[0];
      toast({
        title: errorMessage ?? "Something went wrong. Please try again later.",
      });
    },
  });

  return (
    <>
      <Header />
      <div className="px-12 md:px-[120px]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h1 className="text-center text-[42px] font-bold tracking-normal text-black opacity-100">
              On Boarding
            </h1>
            <p className="text-center text-[16px] tracking-normal text-gray-500">
              Cuentanos sobre ti para poder brindarte el mejor servicio y
              resultados
            </p>
          </div>
          <Onboard handleSubmit={createOnboard} />
        </div>
      </div>
      <Footer />
    </>
  );
}
