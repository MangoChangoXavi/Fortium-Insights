// async funcion to get coordinates from google maps api:
const getCoordinates = async (address: string) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_API_KEY}`,
  );
  const data = await response.json();
  console.log({ data }, 'function googleMap');

  return data.results[0].geometry.location;
};

// async function to get satellite image from google maps api:
const getSatelliteImage = async (lat: number, lng: number) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=17&maptype=satellite&size=600x300&key=${process.env.GOOGLE_MAPS_API_KEY}`,
  );
  const data = await response.blob();
  return data;
};

export { getCoordinates, getSatelliteImage };
