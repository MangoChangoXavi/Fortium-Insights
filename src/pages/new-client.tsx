import Footer from "~/features/landingPage/components/Footer";
import Header from "~/features/landingPage/components/Header";
import { api } from "~/utils/api";
import { useToast } from "@/components/ui/use-toast";
import { Client } from "~/components/template/forms/Client";
import { useRouter } from "next/router";

export default function NewClient() {
  const { toast } = useToast();
  const router = useRouter();

  // use the `useMutation` hook to create a mutation
  const { mutate: createOnboard } = api.client.create.useMutation({
    onSuccess: async () => {
      toast({ title: "Ficha de cliente guardada correctamente!" });
      await router.push("/");
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
              Nuevo Cliente
            </h1>
            <p className="text-center text-[16px] tracking-normal text-gray-500">
              Ingresa la ficha del nuevo cliente para comenzar a trabajar
            </p>
          </div>
          <Client handleSubmit={createOnboard} />
        </div>
      </div>
      <Footer />
    </>
  );
}
