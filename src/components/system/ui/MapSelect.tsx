import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

interface MapSelectProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: (value: any) => void;
}

export default function MapSelect({ value, setValue }: MapSelectProps) {
  return (
    <GooglePlacesAutocomplete
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      selectProps={{
        value,
        onChange: setValue,
        className:
          "border-primary-500 outline-3 outline-primary-200  h-10 w-full rounded-lg border  text-base font-semibold not-italic leading-[normal] text-black outline  ring-offset-background  file:border-0  file:bg-transparent file:text-sm  file:font-medium placeholder:font-medium placeholder:italic placeholder:leading-normal placeholder:text-[#808080] placeholder:text-muted-foreground  focus-visible:ring-2  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      }}
    />
  );
}
