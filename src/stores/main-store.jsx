import { create } from "zustand";
const useMainStore = create((set) => ({
  curProduct: {},
  setCurProduct: (newVal) => set({ curProduct: newVal }),
  cart: [],
  setCart: (cb) => set((state) => ({ cart: cb(state.cart) })),
  removeCartItemByIndex: (index) =>
    set((state) => {
      const updatedCart = [...state.cart];
      updatedCart.splice(index, 1);
      return { cart: updatedCart };
    }),
}));
export default useMainStore;
