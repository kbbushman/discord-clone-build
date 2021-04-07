import create from 'zustand';
import { persist } from 'zustand/middleware';

const userStore = create(
  persist(
    (set, get) => ({
      current: null,
      setUser: (user) => set({ current: user }),
      logout: () => set({ current: null }),
      isAuth: () => get().current !== null,
    }),
    {
      name: 'user-storage',
    }
  )
);

export default userStore;
