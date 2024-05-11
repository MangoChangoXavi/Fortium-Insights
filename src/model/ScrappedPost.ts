import mongoose from "mongoose";

const scrappedPostSchema = new mongoose.Schema({
  address: String,
  imagesUrl: [String],
  buildingType: String,
  numberOfRooms: Number,
  numberOfBathrooms: Number,
  numberOfParkingLots: Number,
  totalArea: Number,
  price: Number,
  currency: String,
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], index: "2dsphere" },
  },
  operationType: String,
  url: String,
  date: { type: Date, default: Date.now },
});

// Here you define the name of the collection twice
export default mongoose.models.ScrappedPostsV2 ??
  mongoose.model("ScrappedPostsV2", scrappedPostSchema);
