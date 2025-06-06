import React, { useEffect, useState } from "react";
import ButtonRounded from "../main/ButtonRounded";
import { useTranslation } from "react-i18next";
import { CloseIcon, ErrorIcon } from "../../icons/mainIcon";
import { hdlCloseModalById } from "../../utils/common";
import useModalStore from "../../stores/modal-store";

function ErrorModal({ errTxt }) {
  const { t } = useTranslation();
  const [isModalFadingOut, setIsModalFadingOut] = useState(false);
  const setIsErrorModalOpen = useModalStore(
    (state) => state.setIsErrorModalOpen
  );
  const setErrTxt = useModalStore((state) => state.setErrTxt);

  useEffect(() => {
    document.getElementById("error-modal").showModal();
  }, []);

  return (
    <div
      className={`w-[350px] h-auto rounded-m shadow-m-m bg-m-light fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-fade-in-modal overflow-hidden ${
        isModalFadingOut && "animate-fade-out-modal"
      }`}
    >
      {/* header */}
      <div className="w-full h-[40px] bg-m-gray px-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-base font-bold text-m-dark">{t("error")}</p>
        </div>
        {/* close button */}
        <ButtonRounded
          Icon={CloseIcon}
          onClick={() => {
            hdlCloseModalById(
              "error-modal",
              setIsModalFadingOut,
              setIsErrorModalOpen
            );
            setErrTxt("");
          }}
        />
      </div>
      {/* label area */}
      <div className="w-full py-4 px-8 break-words flex gap-1 text-m-error font-bold justify-center items-start max-h-[300px] overflow-y-auto">
        <ErrorIcon className=" w-[25px] h-[25px] -translate-y-1" />
        <p>{errTxt}</p>
      </div>
    </div>
  );
}

export default ErrorModal;
