import React from "react";
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

const LANGS = {
  en: { icon: USFlgIcon, label: "English" },
  th: { icon: THFlgIcon, label: "ภาษาไทย" },
  cn: { icon: CNFlgIcon, label: "汉语" },
  jp: { icon: JPFlgIcon, label: "日本語" },
  es: { icon: ESFlgIcon, label: "español" },
  la: { icon: LAFlgIcon, label: "ພາສາລາວ" },
  mm: { icon: MMFlgIcon, label: "မြန်မာ" },
  km: { icon: KMFlgIcon, label: "ខ្មែរ" },
};

export default function LanguageSelect({ className }) {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const setIsLanguageSelectModalOpen = useModalStore(
    (state) => state.setIsLanguageSelectModalOpen
  );
  const LangIcon = LANGS[lang]?.icon || USFlgIcon;
  const LangLabel = LANGS[lang]?.label || "English";

  const hdlOpenLanguageSelectModal = () => {
    setIsLanguageSelectModalOpen(true);
  };
  return (
    <div
      className={`w-[80px] h-[25px] rounded-m border border-m-line/50 flex items-center pl-[2px] gap-1 bg-m-light relative btn-hover ${className}`}
      onClick={hdlOpenLanguageSelectModal}
    >
      <div className="flex items-center gap-1">
        <div className="max-w-[20px] min-w-[20px] max-h-[20px] min-h-[20px] rounded-m flex justify-center items-center overflow-hidden  relative">
          <LangIcon className="w-[30px] h-[30px] absolute" />
        </div>

        <p className="text-[10px]">{LangLabel}</p>
      </div>
    </div>
  );
}
