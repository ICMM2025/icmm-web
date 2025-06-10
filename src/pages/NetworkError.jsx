import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../components/main/Button";
import {
  AddIcon,
  CheckOrderStatusIcon,
  CryFaceIcon,
  LoveFaceIcon,
} from "../icons/mainIcon";
import { useNavigate } from "react-router-dom";
import useMainStore from "../stores/main-store";
import Footer from "./Footer";

function NetworkError() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const hdlReorder = () => {
    localStorage.clear(); // Clears all localStorage items
    navigate("/", { replace: true }); // Navigate to "/" without going back
  };
  const orderId = useMainStore((state) => state.orderId);

  return (
    <>
      {/* container */}
      <div className="w-full sm:max-w-[700px]  min-h-svh mx-auto bg-m-light flex flex-col items-center py-4 px-4 sm:px-8 gap-2">
        {/* welcome badge */}
        <div className="w-full h-auto bg-m-prim rounded-m flex flex-col animate-fade-in-div p-2">
          <div className="w-full flex items-baseline gap-2">
            <img
              src="/logo-icmm.png"
              alt="logo"
              className="w-[50px] h-[50px]"
            />
            <p className="font-bold text-m-light text-2xl -translate-y-1">
              ICMM Shop
            </p>
          </div>
          <div className="w-full flex justify-center">
            <p className="font-bold text-m-light text-lg">{t("welcomeTxt")}</p>
          </div>
        </div>
        {/* Network Error */}

        <div className="w-full p-2 rounded-m text-m-prim  flex flex-col items-center gap-1 animate-fade-in-div pt-30">
          <CryFaceIcon className="w-[100px] h-[100px] animate-none" />
          <p className="text-xl font-bold text-center">
            {t("networkErrorTxt1")}
          </p>
          <p className="text-xl text-center">{t("networkErrorTxt2")}</p>
        </div>
      </div>
      {/* footer */}
      <Footer />
    </>
  );
}

export default NetworkError;
