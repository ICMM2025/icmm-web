import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../components/main/Button";
import { AddIcon, CheckOrderStatusIcon, LoveFaceIcon } from "../icons/mainIcon";
import { useNavigate } from "react-router-dom";

function Success() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const hdlReorder = () => {
    localStorage.clear(); // Clears all localStorage items
    navigate("/", { replace: true }); // Navigate to "/" without going back
  };

  return (
    <>
      {/* container */}
      <div className="w-full max-w-[400px]  min-h-svh mx-auto bg-m-light flex flex-col items-center py-4 px-2 gap-2">
        {/* language select */}
        <div className="w-full flex justify-between animate-fade-in-div">
          <Button
            lbl={t("checkOrderStatus")}
            Icon={CheckOrderStatusIcon}
            isAcct={true}
          />
        </div>
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
        {/* Success */}

        <div className="w-full p-2 rounded-m text-m-prim  flex flex-col items-center gap-1 animate-fade-in-div pt-30">
          <LoveFaceIcon className="w-[100px] h-[100px] animate-bounce" />
          <p className="text-xl font-bold">{t("yourOrderHasRecieved")}</p>
          <p className="font-bold">{t("weWillConfirmTxt")}</p>
          <p className="text-xs mt-4 text-m-dark">{t("youCanCheckOrderTxt")}</p>
          <Button
            lbl={t("reorder")}
            Icon={AddIcon}
            isAcct={true}
            className="mt-4"
            onClick={hdlReorder}
          />
        </div>
      </div>
      {/* footer */}
      <div className="w-full max-w-[400px] mx-auto  h-[80px] bg-m-line/25 p-2 flex justify-between items-center flex-col text-xs animate-fade-in-div">
        <div className="flex flex-col items-center">
          <p>Contact us : @icmm2015</p>
          <p>info.icmm2025@gmail.com</p>
        </div>
        <p>copy right 2025</p>
      </div>
      {/* version */}
      <p className="absolute top-0 text-[8px]">v.1.0.0</p>
    </>
  );
}

export default Success;
