import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type SearchStore = {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
};

const useSearchStore = create<SearchStore>()(
  persist(
    (set) => ({
      searchTerm: "",
      setSearchTerm: (searchTerm: string) => set({ searchTerm }),
    }),
    {
      name: "search-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useSearchStore;
