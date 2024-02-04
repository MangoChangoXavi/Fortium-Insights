import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";

export const StepsButtonGroup = ({
  handlePrevious,
}: {
  handlePrevious: () => void;
}) => {
  return (
    <>
      {/* buttons group */}
      <div className="flex flex-row gap-2">
        <Button onClick={handlePrevious} variant="primary">
          <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
        </Button>
        <Button type="submit" variant="primary">
          Siguiente <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </>
  );
};
