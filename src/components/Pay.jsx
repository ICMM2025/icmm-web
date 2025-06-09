import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AddPhotoIcon, PayIcon, SendIcon, VerifyIcon } from "../icons/mainIcon";
import Button from "./main/Button";
import useMainStore from "../stores/main-store";

function Pay() {
  const { t } = useTranslation();
  const [isManualPay, setIsManualPay] = useState(false);
  const [lblSwitchPay, setLblSwitchPay] = useState("useQRPay");
  const totalForPay = useMainStore((state) => state.totalForPay);

  const hdlSwitchPay = () => {
    setIsManualPay(!isManualPay);
  };

  const hdlUpload = () => {
    console.log("upload");
  };

  useEffect(() => {
    if (isManualPay) {
      setLblSwitchPay("useQRPay");
    } else {
      setLblSwitchPay("useManualPay");
    }
  }, [isManualPay]);

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
      <div className="w-full flex flex-col items-center gap-4">
        {/* qr code */}
        {!isManualPay && (
          <div className="w-full h-[300px] animate-fade-in-div">
            <img
              src="/qr-code.png"
              className="w-full h-full object-contain"
              alt="qr"
            />
          </div>
        )}
        {/* button switch pay */}
        <Button
          onClick={hdlSwitchPay}
          lbl={t(lblSwitchPay)}
          Icon={PayIcon}
          isAcct={true}
        />
        {/* pay detail */}
        {isManualPay && (
          <div className="w-full flex flex-col justify-between animate-fade-in-div">
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
                <p className="font-bold">{t("totalForPay")}</p>
                <p>
                  {" "}
                  {totalForPay.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  {t("baht")}
                </p>
              </div>
            </div>
          </div>
        )}
        {/* upload slip */}
        <div className="w-flull flex flex-col items-center">
          <p className="font-bold">{t("uploadSlip")}</p>
          <div className="w-[200px] h-[200px] border flex justify-center items-center">
            <div className="flex flex-col items-center" onClick={hdlUpload}>
              <AddPhotoIcon className="w-[50px] text-m-dark" />
              <p>{t("clickToUpload")}</p>
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
