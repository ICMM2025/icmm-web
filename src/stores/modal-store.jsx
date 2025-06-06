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
}));
export default useModalStore;
