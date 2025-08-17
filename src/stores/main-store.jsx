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
  clearCart: () => set({ cart: [] }),
  input: {
    name: "",
    email: "",
    phone: "",
    address: "",
    addressSubDistrict: "",
    addressDistrict: "",
    addressProvince: "",
    addressPostCode: "",
    remark: "",
    code: "",
    discountAmt: 0,
  },
  setInput: (newVal) => set({ input: newVal }),
  // isShowPay: true,
  isShowPay: false,
  setIsShowPay: (newVal) => set({ isShowPay: newVal }),
  totalForPay: 0,
  setTotalForPay: (newVal) => set({ totalForPay: newVal }),
  orderId: "",
  setOrderId: (newVal) => set({ orderId: newVal }),
  qrUrl: "",
  setQrUrl: (newVal) => set({ qrUrl: newVal }),
  // photo: null,
  // photoUrl: null,
  // setPhoto: (photo) => set({ photo }),
  // setPhotoUrl: (url) => set({ photoUrl: url }),
  // clearPhoto: () => set({ photo: null, photoUrl: null }),
  selectedOrderId: "",
  setSelectedOrderId: (newVal) => set({ selectedOrderId: newVal }),

  status: [],
  setStatus: (cb) => set((state) => ({ status: cb(state.status) })),
  order: {},
  setOrder: (newVal) => set({ order: newVal }),

  refreshOrders: false,
  toggleRefreshOrders: () =>
    set((state) => ({ refreshOrders: !state.refreshOrders })),
  refreshAdminModal: false,
  toggleRefreshAdminModal: () =>
    set((state) => ({ refreshAdminModal: !state.refreshAdminModal })),
}));
export default useMainStore;
