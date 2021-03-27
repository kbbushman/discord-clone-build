import create from "zustand";

const channelStore = create((set, get) => ({
  typing: [],
  addTyping: (username) => {
    set((state) => ({ typing: [...state.typing, username] }));
  },
  removeTyping: (username) => {
    set((state) => ({
      typing: [...state.typing.filter((u) => u !== username)],
    }));
  },
  reset: () => {
    set(() => ({ typing: [] }));
  },
}));

export default channelStore;
