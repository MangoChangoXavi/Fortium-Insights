import { type Review } from "@prisma/client";
import { create } from "zustand";

type Store = {
  vendorId: string;
  setVendorId: (vendorId: string) => void;
  reviews: Review[];
  setReviews: (reviews: Review[]) => void;
};

export const useReviewsStore = create<Store>()((set) => ({
  vendorId: "",
  setVendorId: (vendorId) => set(() => ({ vendorId })),
  reviews: [],
  setReviews: (reviews) => set(() => ({ reviews })),
}));
