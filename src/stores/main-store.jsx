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
  input: {
    name: "",
    email: "",
    phone: "",
    address: "",
    remark: "",
  },
  setInput: (newVal) => set({ input: newVal }),
  // isShowPay: true,
  isShowPay: false,
  setIsShowPay: (newVal) => set({ isShowPay: newVal }),
  totalForPay: 0,
  setTotalForPay: (newVal) => set({ totalForPay: newVal }),
}));
export default useMainStore;
