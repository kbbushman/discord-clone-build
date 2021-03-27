import create from "zustand";
import { persist } from "zustand/middleware";

const settingsStore = create(
  persist(
    (set, get) => ({
      showMembers: true,
      toggleShowMembers: () => set({ showMembers: !get().showMembers }),
    }),
    {
      name: "settings-storage",
    }
  )
);

export default settingsStore;
