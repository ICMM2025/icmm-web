import { create } from "zustand";
const useMainStore = create((set) => ({
  curProduct: {},
  setCurProduct: (newVal) => set({ curProduct: newVal }),
  cart: [],
  setCart: (cb) => set((state) => ({ cart: cb(state.cart) })),
}));
export default useMainStore;
