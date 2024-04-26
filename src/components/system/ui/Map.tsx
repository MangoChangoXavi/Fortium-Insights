import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

interface PropsI {
  width?: string;
  height?: string;
  center?: {
    lat: number;
    lng: number;
  };
  markers?: {
    lat: number;
    lng: number;
  }[];
}

function Map({ center, markers, width, height }: PropsI) {
  const containerStyle = {
    width: width ? width : "336px",
    height: height ? height : "306px",
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
      {/* Child components, such as markers, info windows, etc. */}
      {markers?.map((marker, index) => (
        <Marker key={index} position={marker} />
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
