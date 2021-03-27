import create from "zustand";

const homeStore = create((set) => ({
  notifCount: 0,
  requestCount: 0,
  increment: () => set((state) => ({ notifCount: state.notifCount + 1 })),
  reset: () => set(() => ({ notifCount: 0 })),
  resetRequest: () => set(() => ({ requestCount: 0 })),
  setRequests: (r) => set(() => ({ requestCount: r })),
  isPending: false,
  toggleDisplay: () => set((state) => ({ isPending: !state.isPending })),
}));

export default homeStore;
