import React, { useEffect, useState } from "react";
import { CloseIcon } from "../../icons/mainIcon";
import { hdlCloseModalById } from "../../utils/common";
import {
  USFlgIcon,
  THFlgIcon,
  CNFlgIcon,
  JPFlgIcon,
  ESFlgIcon,
  MMFlgIcon,
  LAFlgIcon,
  KMFlgIcon,
} from "../../icons/flagIcon";
import { useTranslation } from "react-i18next";
import useModalStore from "../../stores/modal-store";
import Button from "../main/Button";
import ButtonRounded from "../main/ButtonRounded";

const SelectElement = ({ Icon, lbl, onClick }) => {
  return (
    <div className="flex items-center gap-1  cursor-pointer" onClick={onClick}>
      <div className="w-[20px] h-[20px]  rounded-m flex justify-center items-center overflow-hidden  relative">
        <Icon className="w-[30px] h-[30px] absolute text-white" />
      </div>

      <p className="">{lbl}</p>
    </div>
  );
};

function LanguageSelectModal() {
  const { t, i18n } = useTranslation();
  const [isModalFadingOut, setIsModalFadingOut] = useState(false);
  const setIsLanguageSelectModalOpen = useModalStore(
    (state) => state.setIsLanguageSelectModalOpen
  );
  const hdlChangeLanguage = (val, e) => {
    i18n.changeLanguage(val);
    hdlCloseModalById(
      "language-select-modal",
      setIsModalFadingOut,
      setIsLanguageSelectModalOpen
    );
  };

  const hdlClose = () => {
    hdlCloseModalById(
      "language-select-modal",
      setIsModalFadingOut,
      setIsLanguageSelectModalOpen
    );
  };

  useEffect(() => {
    document.getElementById("language-select-modal").showModal();
  }, []);

  return (
    <div
      className={`w-[150px] h-auto rounded-m shadow-m-m bg-m-light fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden animate-fade-in-modal ${
        isModalFadingOut && "animate-fade-out-modal"
      }`}
    >
      {/* header */}
      <div className="w-full h-[33px] bg-m-gray  px-2 flex items-center justify-between">
        <p className="font-bold text-m-dark">{t("language")}</p>
      </div>
      {/* select area */}
      <div className="w-full flex justify-center max-w-[350px] overflow-y-auto px-2 py-4">
        <div className="flex flex-col gap-3">
          <SelectElement
            Icon={USFlgIcon}
            lbl="English"
            onClick={(e) => hdlChangeLanguage("en", e)}
          />
          <SelectElement
            Icon={THFlgIcon}
            lbl="ภาษาไทย"
            onClick={(e) => hdlChangeLanguage("th", e)}
          />
          {/*<SelectElement
            Icon={CNFlgIcon}
            lbl="汉语"
            onClick={(e) => hdlChangeLanguage("cn", e)}
          />
          <SelectElement
            Icon={JPFlgIcon}
            lbl="日本語"
            onClick={(e) => hdlChangeLanguage("jp", e)}
          />
          <SelectElement
            Icon={ESFlgIcon}
            lbl="español"
            onClick={(e) => hdlChangeLanguage("es", e)}
          />
           <SelectElement
            Icon={LAFlgIcon}
            lbl="ພາສາລາວ"
            onClick={(e) => hdlChangeLanguage("la", e)}
          />
          <SelectElement
            Icon={MMFlgIcon}
            lbl="မြန်မာ"
            onClick={(e) => hdlChangeLanguage("mm", e)}
          />
          <SelectElement
            Icon={KMFlgIcon}
            lbl="ខ្មែរ"
            onClick={(e) => hdlChangeLanguage("km", e)}
          /> */}
        </div>
      </div>
      {/* close button */}
      <ButtonRounded
        onClick={hdlClose}
        Icon={CloseIcon}
        className="absolute top-1 right-1"
      />
    </div>
  );
}

export default LanguageSelectModal;
