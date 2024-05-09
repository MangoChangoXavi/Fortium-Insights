import React, { useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

interface MapSelectProps {
  setAddress: (address: string) => void;
  address?: string;
  className?: string;
}

export default function MapSelect({
  setAddress,
  address,
  className,
}: MapSelectProps) {
  const [value, setValue] = React.useState<any>(
    address && address.length > 0 ? { label: address, value: address } : null,
  );

  useEffect(() => {
    if (value) {
      setAddress(value.label);
    }
  }, [setAddress, value]);

  return (
    <GooglePlacesAutocomplete
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      selectProps={{
        value,
        onChange: setValue,
        placeholder: "Dirección, Barrio, Ciudad, etc.",
        className:
          className ??
          "border-primary-500 outline-3 outline-primary-200 w-full rounded-lg border text-base font-semibold not-italic leading-[normal] text-black outline  ring-offset-background  file:border-0  file:bg-transparent file:text-sm  file:font-medium placeholder:font-medium placeholder:italic placeholder:leading-normal placeholder:text-[#808080] placeholder:text-muted-foreground  focus-visible:ring-2  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      }}
    />
  );
}
