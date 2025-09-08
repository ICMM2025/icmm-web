import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../components/main/Button";
import useModalStore from "../stores/modal-store";
import LanguageSelect from "../components/main/LanguageSelect";
import {
  AddPhotoIcon,
  CheckOrderStatusIcon,
  ProductIcon,
} from "../icons/mainIcon";
import useMainStore from "../stores/main-store";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

function Landing() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setIsCheckStatusModalOpen = useModalStore(
    (state) => state.setIsCheckStatusModalOpen
  );

  const setCurProduct = useMainStore((state) => state.setCurProduct);
  const clearCart = useMainStore((state) => state.clearCart);
  const setInput = useMainStore((state) => state.setInput);
  const setIsShowPay = useMainStore((state) => state.setIsShowPay);
  const setTotalForPay = useMainStore((state) => state.setTotalForPay);
  const setOrderId = useMainStore((state) => state.setOrderId);
  const setQrUrl = useMainStore((state) => state.setQrUrl);

  const hdlClickCheckOrderStatus = () => {
    setIsCheckStatusModalOpen(true);
  };

  const hdlGoToShop = () => {
    navigate("/shop");
  };

  useEffect(() => {
    localStorage.clear();
    setCurProduct({});
    clearCart();
    setInput({ name: "", email: "", phone: "", address: "", remark: "" });
    setIsShowPay(false);
    // setIsShowPay(true);
    setTotalForPay(0);
    setOrderId("");
    setQrUrl("");
  }, []);

  return (
    <>
      {/* container */}
      <div className="w-full sm:max-w-[700px]  min-h-svh mx-auto bg-m-light flex flex-col items-center py-4 px-4 sm:px-8 gap-2">
        {/* language select */}
        <div className="w-full flex justify-between animate-fade-in-div">
          <div></div>
          <LanguageSelect />
        </div>
        {/* welcome badge */}
        <div className="w-full h-auto flex flex-col animate-fade-in-div overflow-hidden">
          {/* <div className="w-full flex items-baseline gap-2">
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
          </div> */}
          <img src="/icmmshop_banner.jpg" alt="logo" className=" rounded-m" />
          <p className="font-bold text-m-prim text-sm text-center mt-2">
            {t("welcomeTxt")}
          </p>
        </div>
        {/* main button */}
        <div className="w-full flex flex-col gap-4 mt-5 items-center justify-center animate-fade-in-div">
          <Button
            lbl={t("goToShop")}
            Icon={ProductIcon}
            size="3"
            onClick={hdlGoToShop}
          />
          <Button
            lbl={t("uploadSlip")}
            Icon={AddPhotoIcon}
            onClick={hdlClickCheckOrderStatus}
            className="!bg-m-second"
            badgeColor="text-m-second"
            size="3"
          />
          <Button
            lbl={t("checkOrderStatus")}
            Icon={CheckOrderStatusIcon}
            isAcct={true}
            onClick={hdlClickCheckOrderStatus}
            size="3"
          />
        </div>
      </div>
      {/* footer */}
      <Footer />
      {/* version */}
      <p className="absolute top-0 text-[8px]">v1.1.10</p>
    </>
  );
}

export default Landing;
