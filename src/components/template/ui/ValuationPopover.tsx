import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Bath, Bed, Building, Car, Ruler, Send } from "lucide-react";
import { Loader } from "~/components/system/layouts/Loader";
import { api } from "~/utils/api";

export default function ValuationPopover({ address }: { address: string }) {
  // use the `useMutation` hook to create a mutation
  const { mutate, isLoading } = api.acm.create.useMutation({
    onSuccess: (data) => {
      toast({ title: "Analisis creado exitosamente" });
      if (data) {
        window.location.href = `/valuate/${data.id ?? ""}`;
      } else throw Error("No data returned");
    },
    onError: (err) => {
      const errorMessage = err?.data?.zodError?.fieldErrors?.content?.[0];
      toast({
        title: errorMessage ?? "Something went wrong. Please try again later.",
      });
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const numberOfBathrooms = parseInt(data.numberOfBathrooms as string);
    const numberOfRooms = parseInt(data.numberOfRooms as string);
    const numberOfParkingLots = parseInt(data.numberOfParkingLots as string);
    const totalArea = parseInt(data.totalArea as string);
    const buildingType = data.buildingType as string;
    mutate({
      address,
      numberOfBathrooms,
      numberOfRooms,
      numberOfParkingLots,
      totalArea,
      buildingType,
      operationType: "valuation",
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="h-16 w-16 rounded-[50px] border border-black"
          variant="outline"
        >
          <Send size={24} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        {isLoading ? (
          <Loader />
        ) : (
          <form className="grid gap-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Propiedades</h4>
              <p className="text-sm text-muted-foreground">
                Pon las dimensiones y espacios de la propiedad para calcular el
                precio.
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label
                  htmlFor="width"
                  className="col-span-2 flex items-center gap-1"
                >
                  <Bed size={16} /> Numero de cuartos
                </Label>
                <Input
                  id="width"
                  defaultValue="2"
                  className="col-span-1 h-8"
                  type="number"
                  name="numberOfRooms"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label
                  htmlFor="width"
                  className="col-span-2 flex items-center gap-1"
                >
                  <Bath size={16} /> Numero de baños
                </Label>
                <Input
                  id="maxWidth"
                  defaultValue="1"
                  className="col-span-1 h-8"
                  type="number"
                  name="numberOfBathrooms"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label
                  htmlFor="width"
                  className="col-span-2 flex items-center gap-1"
                >
                  <Car size={16} /> Numero de parqueos
                </Label>
                <Input
                  id="height"
                  defaultValue="2"
                  className="col-span-1 h-8"
                  type="number"
                  name="numberOfParkingLots"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label
                  htmlFor="width"
                  className="col-span-2 flex items-center gap-1"
                >
                  <Building size={16} /> Tipo de Propiedad
                </Label>
                <Select defaultValue="house" name="buildingType">
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Selecciona un tipo de inmueble"
                      defaultValue={"house"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartamento</SelectItem>
                    <SelectItem value="house">Casa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label
                  htmlFor="width"
                  className="col-span-2 flex items-center gap-1"
                >
                  <Ruler size={16} /> Area en mts2
                </Label>
                <Input
                  id="area"
                  defaultValue="120"
                  className="col-span-1 h-8"
                  type="number"
                  name="totalArea"
                />
              </div>
              <div className="mt-4 grid grid-cols-3 items-center gap-4">
                <Button className="col-span-3" type="submit">
                  Calcular
                </Button>
              </div>
            </div>
          </form>
        )}
      </PopoverContent>
    </Popover>
  );
}
