import { create } from "zustand";
const useModalStore = create((set) => ({
  errTxt: "",
  setErrTxt: (newVal) => set({ errTxt: newVal }),
  isTestModalOpen: false,
  setIsTestModalOpen: (newVal) => set({ isTestModalOpen: newVal }),
  isLoadingModalOpen: false,
  setIsLoadingModalOpen: (newVal) => set({ isLoadingModalOpen: newVal }),
  isErrorModalOpen: false,
  setIsErrorModalOpen: (newVal) => set({ isErrorModalOpen: newVal }),
  isLanguageSelectModalOpen: false,
  setIsLanguageSelectModalOpen: (newVal) =>
    set({ isLanguageSelectModalOpen: newVal }),
  isProductModalOpen: false,
  setIsProductModalOpen: (newVal) => set({ isProductModalOpen: newVal }),
  isCheckStatusModalOpen: false,
  setIsCheckStatusModalOpen: (newVal) =>
    set({ isCheckStatusModalOpen: newVal }),
  isAdminModalOpen: false,
  setIsAdminModalOpen: (newVal) => set({ isAdminModalOpen: newVal }),
  isChangeStatusModalOpen: false,
  setIsChangeStatusModalOpen: (newVal) =>
    set({ isChangeStatusModalOpen: newVal }),
  isAdminEditCartModalOpen: false,
  setIsAdminEditCartModalOpen: (newVal) =>
    set({ isAdminEditCartModalOpen: newVal }),
}));
export default useModalStore;
