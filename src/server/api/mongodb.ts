import connectDB from "~/lib/connectToMongo";
import ScrappedPost from "../../model/ScrappedPost";

interface PropsI {
  lat: number;
  lng: number;
  radius: number;
  numberOfBathrooms?: number;
  numberOfRooms?: number;
  buildingType?: string;
  operationType?: string;
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
  operationType: string;
  numberOfParkingLots: number;
  totalArea: number;
  price: number;
  currency: string;
  url: string;
  address: string;
  imagesUrl: string[];
}

async function getRequirementsFromMongo({
  lat,
  lng,
  radius,
  minNumberOfRooms,
  maxNumberOfRooms,
  minNumberOfBathrooms,
  maxNumberOfBathrooms,
  minNumberOfParkingLots,
  maxNumberOfParkingLots,
  minTotalArea,
  maxTotalArea,
  minPrice,
  maxPrice,
  buildingType,
  operationType,
}: {
  lat: number;
  lng: number;
  radius: number;
  minNumberOfRooms?: number;
  maxNumberOfRooms?: number;
  minNumberOfBathrooms?: number;
  maxNumberOfBathrooms?: number;
  minNumberOfParkingLots?: number;
  maxNumberOfParkingLots?: number;
  minTotalArea?: number;
  maxTotalArea?: number;
  minPrice?: number;
  maxPrice?: number;
  buildingType?: string;
  operationType?: string;
}): Promise<ScrappedPostI[]> {
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

  if (minNumberOfBathrooms && maxNumberOfBathrooms) {
    where = {
      ...where,
      numberOfBathrooms: {
        $gte: minNumberOfBathrooms,
        $lte: maxNumberOfBathrooms,
      },
    };
  } else if (minNumberOfBathrooms) {
    where = {
      ...where,
      numberOfBathrooms: { $gte: minNumberOfBathrooms },
    };
  } else if (maxNumberOfBathrooms) {
    where = {
      ...where,
      numberOfBathrooms: { $lte: maxNumberOfBathrooms },
    };
  }

  if (minNumberOfRooms && maxNumberOfRooms) {
    where = {
      ...where,
      numberOfRooms: { $gte: minNumberOfRooms, $lte: maxNumberOfRooms },
    };
  } else if (minNumberOfRooms) {
    where = {
      ...where,
      numberOfRooms: { $gte: minNumberOfRooms },
    };
  } else if (maxNumberOfRooms) {
    where = {
      ...where,
      numberOfRooms: { $lte: maxNumberOfRooms },
    };
  }

  if (buildingType) {
    where = {
      ...where,
      buildingType: buildingType,
    };
  }

  if (minNumberOfParkingLots && maxNumberOfParkingLots) {
    where = {
      ...where,
      numberOfParkingLots: {
        $gte: minNumberOfParkingLots,
        $lte: maxNumberOfParkingLots,
      },
    };
  } else if (minNumberOfParkingLots) {
    where = {
      ...where,
      numberOfParkingLots: { $gte: minNumberOfParkingLots },
    };
  } else if (maxNumberOfParkingLots) {
    where = {
      ...where,
      numberOfParkingLots: { $lte: maxNumberOfParkingLots },
    };
  }

  if (minTotalArea && maxTotalArea) {
    where = {
      ...where,
      totalArea: { $gte: minTotalArea, $lte: maxTotalArea },
    };
  } else if (minTotalArea) {
    where = {
      ...where,
      totalArea: { $gte: minTotalArea },
    };
  } else if (maxTotalArea) {
    where = {
      ...where,
      totalArea: { $lte: maxTotalArea },
    };
  }

  if (minPrice && maxPrice) {
    where = {
      ...where,
      price: { $gte: minPrice, $lte: maxPrice },
    };
  } else if (minPrice) {
    where = {
      ...where,
      price: { $gte: minPrice },
    };
  } else if (maxPrice) {
    where = {
      ...where,
      price: { $lte: maxPrice },
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await ScrappedPost.find(where);
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
      totalArea: { $gte: totalArea - 20, $lte: totalArea + 20 },
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

async function getItemFromMongo(id: string) {
  await connectDB();
  const response = await ScrappedPost.findById(id);
  if (!response) {
    throw new Error("Item not found");
  }
  return response;
}

export { getScrappedPostFromMongo, getRequirementsFromMongo, getItemFromMongo };
