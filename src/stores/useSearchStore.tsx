import { create } from "zustand";

type Store = {
  categoryId: number;
  setCategoryId: (categoryId: number) => void;
  ranking: number;
  setRanking: (ranking: number) => void;
  search: string;
  setSearch: (search: string) => void;
};

export const useSearchStore = create<Store>()((set) => ({
  categoryId: 0,
  setCategoryId: (categoryId) => set(() => ({ categoryId })),
  ranking: 0,
  setRanking: (ranking) => set(() => ({ ranking })),
  search: "",
  setSearch: (search) => set(() => ({ search })),
}));
