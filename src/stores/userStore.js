import create from "zustand";
import { persist } from "zustand/middleware";

const userStore = create(() => ({
  current: null,
}));

export default userStore;
