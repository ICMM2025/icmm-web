import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ButtonRounded from "../main/ButtonRounded";
import { formatDateTimeThaiYear, hdlCloseModalById } from "../../utils/common";
import {
  AddPhotoIcon,
  CheckOrderStatusIcon,
  CloseIcon,
  RemoveIcon,
  SendIcon,
} from "../../icons/mainIcon";
import useModalStore from "../../stores/modal-store";
import Input from "../main/Input";
import Button from "../main/Button";
import { checkOrderApi, sendOrderApi } from "../../apis/order-api";
import { formatDateTimeThai } from "../../utils/common";
import { sendOrderMailer } from "../../apis/mailer-api";

function CheckStatusModal() {
  const { t } = useTranslation();
  const setErrTxt = useModalStore((state) => state.setErrTxt);
  const setIsErrorModalOpen = useModalStore(
    (state) => state.setIsErrorModalOpen
  );
  const setIsLoadingModalOpen = useModalStore(
    (state) => state.setIsLoadingModalOpen
  );
  const [isModalFadingOut, setIsModalFadingOut] = useState(false);
  const setIsCheckStatusModalOpen = useModalStore(
    (state) => state.setIsCheckStatusModalOpen
  );
  const [input, setInput] = useState({
    email: "",
    orderNo: "",
  });
  const [order, setOrder] = useState({});
  const [coupon, setCoupon] = useState({});
  const [files, setFiles] = useState([]);

  const hdlError = (err) => {
    setErrTxt(err);
    setIsErrorModalOpen(true);
  };

  const hdlChangeInput = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const hdlClickCheckStatus = async () => {
    setIsLoadingModalOpen(true);
    try {
      const orderNum = parseInt(input.orderNo.replace(/\D/g, ""), 10);
      const res = await checkOrderApi({
        input: {
          ...input,
          orderNo: orderNum,
        },
      });
      console.log(res);
      setOrder(res?.data?.order);
      setCoupon(res?.data?.coupon);
    } catch (err) {
      console.log(err?.response?.data?.msg || err.message);
      hdlError(t(err?.response?.data?.msg || err.message));
    } finally {
      setIsLoadingModalOpen(false);
    }
  };

  const hdlRemovePhoto = () => {
    setFiles([]);
  };

  const hdlInputPhoto = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const imageFiles = selectedFiles.filter((file) =>
      file.type.startsWith("image/")
    );
    setFiles((prev) => [...prev, ...imageFiles]);
  };

  const hdlUploadSlip = async () => {
    if (files.length === 0) {
      hdlError(t("errPleaseUploadSlip"));
      return;
    }
    setIsLoadingModalOpen(true);
    try {
      const body = new FormData();
      body.append("orderId", order.orderId);
      files.forEach((file) => {
        body.append("images", file);
      });
      const res = await sendOrderApi(body);
      console.log(res);
      // mailer to user
      const mailOptions = {
        to: order?.email,
        subject: t("mailerSubject"),
        text: `${t("mailerDear")}\n\n${t("mailerTextSendOrder1")}\n${t(
          "mailerTextSendOrder2"
        )}${`A${order?.orderId.toString().padStart(4, "0")}`}\n${t(
          "mailerTextSendOrder3"
        )}\n\n${t("mailerRegards")}\n${t("mailerName")}`,
      };
      sendOrderMailer(mailOptions);
      // mailter to admin
      const mailOptionsAdmin = {
        to: import.meta.env.VITE_ADMIN_EMAIL,
        subject: "[ICMM2025] You received payment evidence!",
        text: `The order no. ${`A${order?.orderId
          .toString()
          .padStart(
            4,
            "0"
          )}`}\nPLease confirm the new order within 24 hours.\n\nBest Regrads,\nRobot`,
      };
      sendOrderMailer(mailOptionsAdmin);
      hdlClickCheckStatus();
    } catch (err) {
      console.log(err?.response?.data?.msg || err.message);
      hdlError(t(err?.response?.data?.msg || err.message));
    } finally {
      setIsLoadingModalOpen(false);
    }
  };

  useEffect(() => {
    document.getElementById("check-status-modal").showModal();
  }, []);
  return (
    <div
      className={`w-[400px]  max-h-[90vh] overflow-y-auto rounded-m shadow-m-m bg-m-light fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-fade-in-modal ${
        isModalFadingOut && "animate-fade-out-modal"
      }`}
    >
      {/* header */}
      <div className="w-full h-[40px] bg-m-menu rounded-t-m px-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckOrderStatusIcon className="w-[15px] h-[15px]" />
          <p className="text-base font-bold text-t-light">
            {t("checkOrderStatus")}
          </p>
        </div>
        {/* close button */}
        <ButtonRounded
          Icon={CloseIcon}
          onClick={(e) => {
            setInput({ email: "", orderNo: "" });
            setOrder({});
            hdlCloseModalById(
              "check-status-modal",
              setIsModalFadingOut,
              setIsCheckStatusModalOpen
            );
          }}
        />
      </div>
      {/* main area */}
      <div className="w-full max-h-[calc(100vh-200px)] overflow-y-auto px-8 py-4 animate-fade-in-div">
        {order?.orderId ? (
          // order detail
          <div className="w-full flex flex-col items-center py-2 gap-2 animate-fade-in-div">
            {/* order No */}
            <div className="w-full flex justify-between">
              <p className="">{t("orderNo")} </p>
              <p className="font-bold">{`A${order?.orderId
                .toString()
                .padStart(4, "0")}`}</p>
            </div>
            {/* createdAt */}
            <div className="w-full flex justify-between text-xs text-m-dark/50">
              <p className="">{t("createdAt")} </p>
              <p>{formatDateTimeThaiYear(order?.createdAt)}</p>
            </div>
            {/* updatedAt */}
            <div className="w-full flex justify-between  text-xs  text-m-dark/50">
              <p className="">{t("updatedAt")} </p>
              <p>{formatDateTimeThaiYear(order?.updatedAt)}</p>
            </div>
            {/* name */}
            <div className="w-full flex justify-between">
              <p className="">{t("name")} </p>
              <p>{order?.name}</p>
            </div>
            {/* email */}
            <div className="w-full flex justify-between">
              <p className="">{t("email")} </p>
              <p>{order?.email}</p>
            </div>
            {/* phone */}
            <div className="w-full flex justify-between">
              <p className="">{t("phone")} </p>
              <p>{order?.phone}</p>
            </div>
            {/* address */}
            <div className="w-full flex justify-between">
              <p className="w-2/5 shrink-0">{t("deliveryAddress")} </p>
              <p>{order?.address}</p>
            </div>
            {/* remake */}
            <div className="w-full flex justify-between">
              <p className="w-1/5 shrink-0">{t("remark")} </p>
              <p>{order?.remark}</p>
            </div>
            {/* products list */}
            <div className="w-full h-auto bg-m-light rounded-m flex flex-col gap-[4px] py-2 px-3">
              {order?.orderDetails.map((el, idx) => {
                return (
                  <div
                    key={idx}
                    className="flex justify-between items-center gap-2 animate-fade-in-div animate-fade-out-div"
                  >
                    <div className="w-full h-auto flex flex-grow justify-between">
                      <div className="flex gap-1 items-center">
                        <div className="w-[25px] h-[25px]  rounded-m overflow-hidden">
                          <img src={el?.product?.productPics[0]?.url} alt="" />
                        </div>
                        <p className="font-bold">
                          {t(el?.product?.name + "Name")}
                        </p>
                        <p>[{el?.productOpt?.optName}]</p>
                        <p>x {el?.unit}</p>
                      </div>
                      <div className="flex gap-1 items-center">
                        <p className="font-bold">
                          {el?.price.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* product summary */}
            <div className="w-full flex flex-col items-end py-1 gap-1 px-2 animate-fade-in-div">
              <div className="w-full flex justify-between">
                <p className="">{t("totalProduct")} </p>
                <p>
                  {order?.totalAmt.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  {t("baht")}
                </p>
              </div>
              <div className="w-full flex justify-between">
                <p className="">
                  <span className="font-bold">{t("added")}</span>
                  {" " + t("deliveryCost")}{" "}
                </p>
                <p>
                  {order?.deliveryCost.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  {t("baht")}
                </p>
              </div>
              <div className="w-full flex justify-between ">
                <p className=" ">{t("code")} </p>
                <p> {order?.discountCode ? order?.discountCode : "n/a"} </p>
              </div>
              <div className="w-full flex justify-between ">
                <p className=" ">{t("discountDetail")} </p>
                {coupon?.discountType === 1 &&
                  `${t("notOver")}  ${coupon?.discountAmt.toLocaleString(
                    undefined,
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}`}
                {coupon?.discountType === 2 &&
                  `${coupon?.discountAmt * 100}% ${t(
                    "notOver"
                  )} ${coupon?.maxDiscountAmt.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}
              </div>
              <div className="w-full flex justify-between ">
                <p className=" ">{t("discount")} </p>
                <p>
                  {" "}
                  {order?.discountAmt
                    ? order?.discountAmt.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : 0}{" "}
                  {t("baht")}
                </p>
              </div>
              <div className="w-full flex justify-between  text-[16px] font-bold">
                <p className=" ">{t("totalAmt")} </p>
                <p>
                  {" "}
                  {order?.grandTotalAmt.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  {t("baht")}
                </p>
              </div>
              {order?.emsTracking && (
                <div className="w-full flex justify-between   font-bold">
                  <p className=" ">{t("emsTracking")} </p>
                  <p>{order?.emsTracking}</p>
                </div>
              )}
            </div>
            {/* status */}
            <div className="bg-m-acct text-m-light font-bold px-4 text-lg h-[30px] flex items-center justify-center rounded-m animate-fade-in-div">
              {t(order?.status?.name)}
            </div>
            <div className=" animate-fade-in-div mb-4 text-center">
              {t(order?.status?.name + "Txt")}
            </div>
            {/* upload slip */}
            {order.statusId == 1 && (
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
                      onClick={() =>
                        document
                          .getElementById("input-file-check-modal")
                          .click()
                      }
                    >
                      <AddPhotoIcon className="w-[50px] text-m-dark" />
                      <p>{t("clickToUpload")}</p>

                      <input
                        type="file"
                        id="input-file-check-modal"
                        className="hidden"
                        accept="image/*"
                        onChange={hdlInputPhoto}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
            {order.statusId == 1 && (
              <Button
                lbl={t("uploadSlip")}
                Icon={SendIcon}
                size="3"
                onClick={hdlUploadSlip}
                className="mt-2"
              />
            )}
          </div>
        ) : (
          // input
          <div className="w-full flex flex-col items-center py-2 gap-2 animate-fade-in-div">
            <Input
              type="text"
              placeholder={t("email")}
              size="3"
              value={input.email}
              onChange={hdlChangeInput}
              name="email"
            />
            <Input
              type="text"
              placeholder={t("orderNo")}
              size="3"
              value={input.orderNo}
              onChange={hdlChangeInput}
              name="orderNo"
            />
            <Button
              lbl={t("checkOrderStatus")}
              size="4"
              className="m-2"
              onClick={hdlClickCheckStatus}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckStatusModal;
