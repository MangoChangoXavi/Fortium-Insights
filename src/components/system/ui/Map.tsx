import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

interface PropsI {
  width?: string;
  height?: string;
  lat: number;
  lng: number;
}

function Map({ lat, lng, width, height }: PropsI) {
  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [center, setCenter] = React.useState({ lat, lng });

  const containerStyle = {
    width: width ? width : "336px",
    height: height ? height : "306px",
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <Marker position={{ lat, lng }} />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
