import React from "react";
import ModalContainer from "../main/ModalContainer";
import Loading from "../main/Loading";
import LanguageSelectModal from "./LanguageSelectModal";
import ErrorModal from "./ErrorModal";
import useModalStore from "../../stores/modal-store";
import TestModal from "./TestModal";
import ProductModal from "./ProductModal";
import CheckStatusModal from "./CheckStatusModal";
import AdminModal from "./AdminModal";

function GlobalModal() {
  const errTxt = useModalStore((state) => state.errTxt);
  const isTestModalOpen = useModalStore((state) => state.isTestModalOpen);
  const isLoadingModalOpen = useModalStore((state) => state.isLoadingModalOpen);
  const isErrorModalOpen = useModalStore((state) => state.isErrorModalOpen);
  const isLanguageSelectModalOpen = useModalStore(
    (state) => state.isLanguageSelectModalOpen
  );
  const isCheckStatusModalOpen = useModalStore(
    (state) => state.isCheckStatusModalOpen
  );
  const isProductModalOpen = useModalStore((state) => state.isProductModalOpen);
  const isAdminModalOpen = useModalStore((state) => state.isAdminModalOpen);

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
      {isCheckStatusModalOpen && (
        <ModalContainer
          id="check-status-modal"
          children={<CheckStatusModal />}
        />
      )}
      {isAdminModalOpen && (
        <ModalContainer id="admin-modal" children={<AdminModal />} />
      )}
    </>
  );
}

export default GlobalModal;
