import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../components/main/Button";
import { AddIcon, CheckOrderStatusIcon, LoveFaceIcon } from "../icons/mainIcon";
import { useNavigate } from "react-router-dom";
import useMainStore from "../stores/main-store";
import Footer from "./Footer";
import useModalStore from "../stores/modal-store";

function Success() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setIsCheckStatusModalOpen = useModalStore(
    (state) => state.setIsCheckStatusModalOpen
  );
  const hdlReorder = () => {
    localStorage.clear(); // Clears all localStorage items
    navigate("/", { replace: true }); // Navigate to "/" without going back
  };
  const orderId = useMainStore((state) => state.orderId);

  const hdlClickCheckOrderStatus = () => {
    setIsCheckStatusModalOpen(true);
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
            onClick={hdlClickCheckOrderStatus}
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
          <p className="text-xl font-bold text-center">
            {t("yourOrderHasRecieved")}
          </p>
          <p className="font-bold text-center">{t("weWillConfirmTxt")}</p>
          <p className="text-xs mt-4 text-m-dark text-center">
            {t("youCanCheckOrderTxt")}
          </p>
          <p className="text-xs mt-4 text-m-dark text-center">
            {t("youCanCheckOrderTxt2")}{" "}
            <span className="text-lg text-m-acct">{`A${orderId
              .toString()
              .padStart(4, "0")}`}</span>{" "}
            {t("youCanCheckOrderTxt3")}
          </p>

          <Button
            lbl={t("reorder")}
            Icon={AddIcon}
            className="mt-4"
            onClick={hdlReorder}
          />
        </div>
      </div>
      {/* footer */}
      <Footer />
    </>
  );
}

export default Success;
