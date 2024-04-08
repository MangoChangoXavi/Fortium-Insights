import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "80vw",
  height: "30vw",
};

interface PropsI {
  markerPosition: {
    lat: number;
    lng: number;
  };
  setMarkerPosition: React.Dispatch<
    React.SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
}

function MyComponent({ markerPosition, setMarkerPosition }: PropsI) {
  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [center, setCenter] = React.useState({ lat: 0, lng: 0 });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const onLoad = React.useCallback(
    function callback(map: google.maps.Map) {
      // get location from user
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setMarkerPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
      // This is just an example of getting and using the map instance!!! don't just blindly copy!
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);

      setMap(map);
    },
    [center, setMarkerPosition],
  );

  const onClick = React.useCallback(
    function callback(e: google.maps.MapMouseEvent) {
      setMarkerPosition({
        lat: e.latLng?.lat() ?? 0,
        lng: e.latLng?.lng() ?? 0,
      });
    },
    [setMarkerPosition],
  );

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onClick={onClick}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <Marker position={markerPosition} />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
