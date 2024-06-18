import { create } from "zustand";

type Store = {
  categoryId: string;
  setCategoryId: (categoryId: string) => void;
  rating: number;
  setRating: (rating: number) => void;
  search: string;
  setSearch: (search: string) => void;
};

export const useSearchStore = create<Store>()((set) => ({
  categoryId: "",
  setCategoryId: (categoryId) => set(() => ({ categoryId })),
  rating: 0,
  setRating: (rating) => set(() => ({ rating })),
  search: "",
  setSearch: (search) => set(() => ({ search })),
}));
