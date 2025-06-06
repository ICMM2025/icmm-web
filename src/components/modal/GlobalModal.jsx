import React from "react";
import ModalContainer from "../main/ModalContainer";
import Loading from "../main/Loading";
import LanguageSelectModal from "./LanguageSelectModal";
import ErrorModal from "./ErrorModal";
import useModalStore from "../../stores/modal-store";
import TestModal from "./TestModal";
import ProductModal from "./ProductModal";

function GlobalModal() {
  const errTxt = useModalStore((state) => state.errTxt);
  const isTestModalOpen = useModalStore((state) => state.isTestModalOpen);
  const isLoadingModalOpen = useModalStore((state) => state.isLoadingModalOpen);
  const isErrorModalOpen = useModalStore((state) => state.isErrorModalOpen);
  const isLanguageSelectModalOpen = useModalStore(
    (state) => state.isLanguageSelectModalOpen
  );
  const isProductModalOpen = useModalStore((state) => state.isProductModalOpen);

  return (
    <>
      {isLoadingModalOpen && (
        <ModalContainer id="loading-modal" children={<Loading />} />
      )}
      {isErrorModalOpen && (
        <ModalContainer
          id="error-modal"
          children={<ErrorModal errTxt={errTxt} />}
        />
      )}
      {isLanguageSelectModalOpen && (
        <ModalContainer
          id="language-select-modal"
          children={<LanguageSelectModal />}
        />
      )}
      {isTestModalOpen && (
        <ModalContainer id="test-modal" children={<TestModal />} />
      )}
      {isProductModalOpen && (
        <ModalContainer id="product-modal" children={<ProductModal />} />
      )}
    </>
  );
}

export default GlobalModal;
