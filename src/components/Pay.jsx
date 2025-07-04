import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AddPhotoIcon, PayIcon, RemoveIcon, SendIcon } from "../icons/mainIcon";
import Button from "./main/Button";
import useMainStore from "../stores/main-store";
import { sendOrderApi } from "../apis/order-api";
import useModalStore from "../stores/modal-store";
import { useNavigate } from "react-router-dom";
import { sendOrderMailer } from "../apis/mailer-api";

function Pay() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isManualPay, setIsManualPay] = useState(false);
  const [lblSwitchPay, setLblSwitchPay] = useState("useQRPay");
  const totalForPay = useMainStore((state) => state.totalForPay);
  const orderId = useMainStore((state) => state.orderId);
  const qrUrl = useMainStore((state) => state.qrUrl);
  const setErrTxt = useModalStore((state) => state.setErrTxt);
  // const photoUrl = useMainStore((state) => state.photoUrl);
  // const setPhoto = useMainStore((state) => state.setPhoto);
  // const photo = useMainStore((state) => state.photo);
  // const setPhotoUrl = useMainStore((state) => state.setPhotoUrl);
  // const clearPhoto = useMainStore((state) => state.clearPhoto);
  const [files, setFiles] = useState([]);
  const setIsLoadingModalOpen = useModalStore(
    (state) => state.setIsLoadingModalOpen
  );
  const setIsErrorModalOpen = useModalStore(
    (state) => state.setIsErrorModalOpen
  );

  const hdlError = (err) => {
    setErrTxt(err);
    setIsErrorModalOpen(true);
  };

  const hdlSwitchPay = () => {
    setIsManualPay(!isManualPay);
  };

  const hdlInputPhoto = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const imageFiles = selectedFiles.filter((file) =>
      file.type.startsWith("image/")
    );
    setFiles((prev) => [...prev, ...imageFiles]);
  };

  const hdlRemovePhoto = () => {
    setFiles([]);
  };

  const hdlSendOrder = async () => {
    if (totalForPay > 0 && files.length === 0) {
      hdlError(t("errPleaseUploadSlip"));
      return;
    }
    setIsLoadingModalOpen(true);
    try {
      const body = new FormData();
      body.append("orderId", orderId);
      files.forEach((file) => {
        body.append("images", file);
      });
      const res = await sendOrderApi(body);
      console.log(res);
      // mailer to user
      const mailOptions = {
        to: res.data?.order?.email,
        subject: t("mailerSubject"),
        text: `${t("mailerDear")}\n\n${t("mailerTextSendOrder1")}\n${t(
          "mailerTextSendOrder2"
        )}${`A${res.data?.order?.orderId.toString().padStart(4, "0")}`}\n${t(
          "mailerTextSendOrder3"
        )}\n\n${t("mailerRegards")}\n${t("mailerName")}`,
      };
      sendOrderMailer(mailOptions);
      // mailter to admin
      const mailOptionsAdmin = {
        to: import.meta.env.VITE_ADMIN_EMAIL,
        subject: "[ICMM2025] You received payment evidence!",
        text: `The order no. ${`A${res.data?.order?.orderId
          .toString()
          .padStart(
            4,
            "0"
          )}`}\nPLease confirm the new order within 24 hours.\n\nBest Regrads,\nRobot`,
      };
      sendOrderMailer(mailOptionsAdmin);
      navigate("/success");
    } catch (err) {
      console.log(err?.response?.data?.msg || err.message);
      hdlError(t(err?.response?.data?.msg || err.message));
    } finally {
      setIsLoadingModalOpen(false);
    }
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
      {totalForPay !== 0 && (
        <div className="w-full flex flex-col items-center gap-4">
          <p className="font-bold text-center px-8 text-m-acct">
            {t("ifYouAreNotReadyToPay")}{" "}
            {`A${orderId.toString().padStart(4, "0")}`}
          </p>
          {/* qr code */}
          {!isManualPay && (
            <div className="w-full h-[300px] animate-fade-in-div">
              {qrUrl && (
                <img
                  src={qrUrl}
                  className="w-full h-full object-contain"
                  alt="Loading..."
                />
              )}
            </div>
          )}
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
            </div>
          )}

          {/* button switch pay */}
          <Button
            onClick={hdlSwitchPay}
            lbl={t(lblSwitchPay)}
            Icon={PayIcon}
            isAcct={true}
            className="animate-fade-in-div"
          />
          {/* note detail */}
          <div className="w-full flex flex-col animate-fade-in-div">
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
            <div className="w-flull flex flex-col">
              <div className="w-full flex justify-between">
                <p className="font-bold">{t("plsAddNote")}</p>
                <p>{`A${orderId.toString().padStart(4, "0")}`}</p>
              </div>
            </div>
          </div>
          {/* upload slip */}
          <div className="w-flull flex flex-col items-center animate-fade-in-div">
            <p className="font-bold">{t("uploadSlip")}</p>
            {files.length > 0 ? (
              <div className="w-full flex flex-col items-center gap-2 animate-fade-in-div">
                {/* list of files */}
                {files.map((el, idx) => (
                  <div key={idx} className="w-full">
                    <img
                      src={URL.createObjectURL(el)}
                      alt={`preview-${idx}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}

                <Button
                  lbl={t("removePhoto")}
                  Icon={RemoveIcon}
                  isAcct={true}
                  onClick={hdlRemovePhoto}
                />
              </div>
            ) : (
              <div className="w-[200px] h-[200px] border flex justify-center items-center animate-fade-in-div">
                <div
                  className="flex flex-col items-center btn-hover"
                  onClick={() => document.getElementById("input-file").click()}
                >
                  <AddPhotoIcon className="w-[50px] text-m-dark" />
                  <p>{t("clickToUpload")}</p>

                  <input
                    type="file"
                    id="input-file"
                    className="hidden"
                    accept="image/*"
                    onChange={hdlInputPhoto}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* incase grandtotal is 0 */}
      {totalForPay == 0 && (
        <p className="text-center font-bold text-m-acct">
          {t("yourOrderIsFree")}
        </p>
      )}
      {/* button */}
      <Button
        lbl={t("sendOrder")}
        className="mt-4 self-center animate-fade-in-div"
        Icon={SendIcon}
        size="4"
        onClick={hdlSendOrder}
      />
    </div>
  );
}

export default Pay;
