import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ButtonRounded from "../main/ButtonRounded";
import { hdlCloseModalById } from "../../utils/common";
import { CheckOrderStatusIcon, CloseIcon } from "../../icons/mainIcon";
import useModalStore from "../../stores/modal-store";
import Input from "../main/Input";
import Button from "../main/Button";
import { checkOrderApi } from "../../apis/order-api";
import { formatDateTimeThai } from "../../utils/common";

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
              <p>{formatDateTimeThai(order?.createdAt)}</p>
            </div>
            {/* updatedAt */}
            <div className="w-full flex justify-between  text-xs  text-m-dark/50">
              <p className="">{t("updatedAt")} </p>
              <p>{formatDateTimeThai(order?.updatedAt)}</p>
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
            </div>
            {/* status */}

            <div className="bg-m-prim text-m-light font-bold px-4 text-lg h-[30px] flex items-center justify-center rounded-m animate-fade-in-div">
              {t(order?.status?.name)}
            </div>
            <div className=" animate-fade-in-div mb-4 text-center">
              {t(order?.status?.name + "Txt")}
            </div>
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
