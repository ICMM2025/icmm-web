import React from "react";
import { useTranslation } from "react-i18next";
import { PayIcon, SendIcon, VerifyIcon } from "../icons/mainIcon";
import Input from "./main/Input";
import Badge from "./main/Badge";
import TextArea from "./main/TextArea";
import Button from "./main/Button";

function Pay() {
  const { t } = useTranslation();
  return (
    <div className="w-full p-2 rounded-m  flex flex-col gap-1 animate-fade-in-div">
      {/* pay header */}
      <div className="w-full flex justify-between items-baseline ">
        <div className="font-bold flex gap-1 text-m-dart items-center">
          <PayIcon className="w-[15px] h-[15px]" /> {t("pay")}
        </div>
        <p className="text-xs"></p>
      </div>
      {/* pay info */}
      <div className="w-full flex justify-between gap-2">
        {/* qr code */}
        <img src="/qr-code.png" className="object-cover" alt="qr" />
        {/* pay detail */}
        <div className="flex-grow flex flex-col justify-between">
          <div className="w-flull flex flex-col">
            <div className="w-full flex justify-between">
              <p className="font-bold">{t("bank")}</p>
              <p>{t("bankTxt")}</p>
            </div>
            <div className="w-full flex justify-between">
              <p className="font-bold">{t("accNo")}</p>
              <p>{t("accNoTxt")}</p>
            </div>
            <div className="w-full flex justify-between">
              <p className="font-bold">{t("accName")}</p>
              <p>{t("accNameTxt")}</p>
            </div>
          </div>
          <div className="w-flull flex flex-col">
            <div className="w-full flex justify-between">
              <p className="font-bold">{t("total")}</p>
              <p>100.00 {t("baht")}</p>
            </div>
          </div>
          {/* upload slip */}
          <div className="w-flull flex flex-col">
            <div className="w-full flex justify-between">
              <p className="font-bold">{t("uploadSlip")}</p>
              <div className="w-[50px] h-[50px] border"></div>
            </div>
          </div>
        </div>
      </div>
      {/* button */}
      <Button
        lbl={t("sendOrder")}
        className="mt-4 self-center"
        Icon={SendIcon}
        size="4"
      />
    </div>
  );
}

export default Pay;
