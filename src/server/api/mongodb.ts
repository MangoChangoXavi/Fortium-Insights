import connectDB from "~/lib/connectToMongo";
import ScrappedPost from "../../model/ScrappedPost";

interface PropsI {
  lat: number;
  lng: number;
  radius: number;
  numberOfBathrooms?: number;
  numberOfRooms?: number;
  buildingType?: string;
  numberOfParkingLots?: number;
  totalArea?: number;
  price?: number;
  currency?: string;
}

interface ScrappedPostI {
  _id: string;
  location: {
    type: string;
    coordinates: number[];
  };
  numberOfBathrooms: number;
  numberOfRooms: number;
  buildingType: string;
  numberOfParkingLots: number;
  totalArea: number;
  price: number;
  currency: string;
  url: string;
  address: string;
  imagesUrl: string[];
}

async function getScrappedPostFromMongo({
  lat,
  lng,
  radius,
  numberOfBathrooms,
  numberOfRooms,
  buildingType,
  price,
  currency,
  numberOfParkingLots,
  operationType,
  totalArea,
}: PropsI): Promise<ScrappedPostI[]> {
  // find all posts in the radius
  await connectDB();

  const METERS_PER_KM = 1000;

  let where = {};
  if (lat && lng && radius) {
    where = {
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
          $maxDistance: radius * METERS_PER_KM,
        },
      },
    };
  }

  if (operationType) {
    where = {
      ...where,
      operationType: operationType,
    };
  }

  if (numberOfBathrooms) {
    where = {
      ...where,
      numberOfBathrooms: {
        $gte: numberOfBathrooms - 1,
        $lte: numberOfBathrooms + 1,
      },
    };
  }

  if (numberOfRooms) {
    where = {
      ...where,
      numberOfRooms: { $gte: numberOfRooms - 1, $lte: numberOfRooms + 1 },
    };
  }

  if (buildingType) {
    where = {
      ...where,
      buildingType: buildingType,
    };
  }

  if (numberOfParkingLots) {
    where = {
      ...where,
      numberOfParkingLots: {
        $gte: numberOfParkingLots - 1,
        $lte: numberOfParkingLots + 1,
      },
    };
  }

  if (totalArea) {
    where = {
      ...where,
      totalArea: { $gte: totalArea - 50, $lte: totalArea + 50 },
    };
  }

  if (price) {
    where = {
      ...where,
      price: { $gte: price - 10000, $lte: price + 10000 },
    };
  }

  if (currency) {
    where = {
      ...where,
      currency: currency,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await ScrappedPost.find(where);
}

export { getScrappedPostFromMongo };
