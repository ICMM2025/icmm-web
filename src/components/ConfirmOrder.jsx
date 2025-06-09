import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CartIcon, CheckoutIcon, PayIcon, VerifyIcon } from "../icons/mainIcon";
import Button from "./main/Button";
import Input from "./main/Input";
import Badge from "./main/Badge";
import TextArea from "./main/TextArea";
import useMainStore from "../stores/main-store";
import { addOrderApi } from "../apis/order-api";
import useModalStore from "../stores/modal-store";

function ConfirmOrder({ products, hdlClickBackToCart }) {
  const DELIVERY_COST = 50;
  const { t } = useTranslation();
  const cart = useMainStore((state) => state.cart);
  const [totalAmt, setTotalAmt] = useState("");
  const [grandTotalAmt, setGrandTotalAmt] = useState("");
  const input = useMainStore((state) => state.input);
  const setInput = useMainStore((state) => state.setInput);
  const setErrTxt = useModalStore((state) => state.setErrTxt);
  const setIsShowPay = useMainStore((state) => state.setIsShowPay);
  const setIsErrorModalOpen = useModalStore(
    (state) => state.setIsErrorModalOpen
  );
  const setIsLoadingModalOpen = useModalStore(
    (state) => state.setIsLoadingModalOpen
  );
  const [isVerified, setIsVerified] = useState({
    name: false,
    email: false,
    phone: false,
    address: false,
  });
  const [errTxtDetail, setErrTxtDetail] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [isAllVerified, setIsAllVerified] = useState(false);
  const [isFieldsDisabled, setIsFieldsDisabled] = useState(false);
  const setTotalForPay = useMainStore((state) => state.setTotalForPay);

  const hdlError = (err) => {
    setErrTxt(err);
    setIsErrorModalOpen(true);
  };

  const hdlChangeInput = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const hdlClickReadyToPay = async () => {
    console.log(input);
    console.log(cart);
    setIsLoadingModalOpen(true);
    try {
      const res = await addOrderApi({
        input,
        cart,
        totalAmt,
        grandTotalAmt,
        deliveryCost: DELIVERY_COST,
      });
      console.log(res);
      setIsAllVerified(false);
      setIsFieldsDisabled(true);
      setIsShowPay(true);
      setTotalForPay(res.data?.grandTotalAmt);
    } catch (err) {
      console.log(err?.response?.data?.msg || err.message);
      hdlError(t(err?.response?.data?.msg || err.message));
    } finally {
      setIsLoadingModalOpen(false);
    }
  };

  const hdlCheckName = () => {
    const trimmedName = input.name.trim();
    const namePattern = /^.{4,}$/; // At least 4 characters
    setIsVerified((prev) => ({ ...prev, name: false }));
    setErrTxtDetail((prev) => ({ ...prev, name: "" }));
    if (!namePattern.test(trimmedName)) {
      setErrTxtDetail((prev) => ({ ...prev, name: t("errName4to50") }));
      return;
    }
    setIsVerified((prev) => ({ ...prev, name: true }));
  };

  const hdlCheckEmail = () => {
    setIsVerified((prev) => ({ ...prev, email: false }));
    setErrTxtDetail((prev) => ({ ...prev, email: "" }));

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!emailPattern.test(input.email.trim())) {
      setErrTxtDetail((prev) => ({ ...prev, email: t("errInvalidEmail") }));
      return;
    }

    setIsVerified((prev) => ({ ...prev, email: true }));
  };

  const hdlCheckPhone = () => {
    setIsVerified((prev) => ({ ...prev, phone: false }));
    setErrTxtDetail((prev) => ({ ...prev, phone: "" }));
    const phoneOnlyDigits = input.phone.replace(/-/g, ""); // Remove dashes
    const isOnlyNumbersAndDashes = /^[-\d]+$/.test(input.phone);
    if (!isOnlyNumbersAndDashes || phoneOnlyDigits.length < 8) {
      setErrTxtDetail((prev) => ({
        ...prev,
        phone: t("errInvalidPhone"),
      }));
      return;
    }
    setIsVerified((prev) => ({ ...prev, phone: true }));
  };

  const hdlCheckAddress = () => {
    setIsVerified((prev) => ({ ...prev, address: false }));
    setErrTxtDetail((prev) => ({ ...prev, address: "" }));
    const address = input.address.trim();
    if (address.length < 20 || address.length > 400) {
      setErrTxtDetail((prev) => ({
        ...prev,
        address: t("errAddress20to400"),
      }));
      return;
    }
    setIsVerified((prev) => ({ ...prev, address: true }));
  };

  useEffect(() => {
    const fields = ["name", "email", "phone", "address"];

    fields.forEach((field) => {
      if (!input[field]) {
        setIsVerified((prev) => ({ ...prev, [field]: false }));
        setErrTxtDetail((prev) => ({ ...prev, [field]: "" }));
      }
    });
  }, [input]);

  useEffect(() => {
    const allVerified =
      isVerified.name &&
      isVerified.email &&
      isVerified.phone &&
      isVerified.address;

    if (allVerified && !isAllVerified) {
      setIsAllVerified(true);
    } else if (!allVerified && isAllVerified) {
      setIsAllVerified(false);
    }
  }, [
    isVerified.name,
    isVerified.email,
    isVerified.phone,
    isVerified.address,
    isVerified.isAllVerified,
  ]);

  useEffect(() => {
    const total = cart.reduce((sum, item) => {
      return sum + item.price * item.unit;
    }, 0);
    setTotalAmt(total);
  }, [cart]);

  useEffect(() => {
    setGrandTotalAmt(totalAmt + DELIVERY_COST);
  }, [totalAmt]);

  return (
    <div className="w-full p-2 rounded-m bg-m-second/25 flex flex-col gap-1 animate-fade-in-div">
      {/* checkout header */}
      <div className="w-full flex justify-between items-baseline ">
        <div className="font-bold flex gap-1 text-m-dart items-center">
          <CheckoutIcon className="w-[15px] h-[15px]" /> {t("confirmOrder")}
        </div>
        <p className="text-xs"></p>
      </div>
      {/* products list */}
      <div className="w-full h-auto bg-m-light rounded-m flex flex-col gap-[4px] py-2 px-3">
        {cart.map((el, idx) => {
          const product = products.find((p) => p.productId === el.productId);
          const option = product?.productOpts.find(
            (opt) => opt.productOptId === el.productOptId
          );

          return (
            <div
              key={idx}
              className="flex justify-between items-center gap-2 animate-fade-in-div animate-fade-out-div"
            >
              <div className="w-full h-auto flex flex-grow justify-between">
                <div className="flex gap-1 items-center">
                  <div className="w-[25px] h-[25px]  rounded-m overflow-hidden">
                    <img src={product?.productPics[0]?.url} alt="" />
                  </div>
                  <p className="font-bold">{t(product?.name + "Name")}</p>
                  <p>[{option?.optName}]</p>
                  <p>x {el.unit}</p>
                </div>
                <div className="flex gap-1 items-center">
                  <p className="font-bold">
                    {el.price.toLocaleString(undefined, {
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
            {totalAmt.toLocaleString(undefined, {
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
            {DELIVERY_COST.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            {t("baht")}
          </p>
        </div>
        <div className="w-full flex justify-between text-m-prim text-[16px] font-bold">
          <p className=" ">{t("totalAmt")} </p>
          <p>
            {" "}
            {grandTotalAmt.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            {t("baht")}
          </p>
        </div>
      </div>
      {/* delivery information */}
      <div className="w-full flex flex-col gap-2 mt-2 animate-fade-in-div">
        {/* name */}
        <div className="w-full flex items-center gap-2">
          <p className="w-[80px] text-right">{t("name")} </p>
          <Input
            type="text"
            className="flex-grow"
            placeholder={t("name")}
            value={input.name}
            onChange={hdlChangeInput}
            name="name"
            onDebounced={hdlCheckName}
            disabled={isFieldsDisabled}
          />
          <div className="min-w-[20px]">
            {isVerified.name && (
              <Badge
                Icon={VerifyIcon}
                className="!bg-m-acct !text-m-light animate-fade-in-div"
              />
            )}
          </div>
        </div>
        <div className="w-full h-[5px] flex items-center gap-2">
          <div className="w-[80px]"></div>
          <p className="text-xs text-m-error">{errTxtDetail.name}</p>
        </div>
        {/* email */}
        <div className="w-full flex items-center gap-2">
          <p className="w-[80px] text-right">{t("email")} </p>
          <Input
            type="text"
            className="flex-grow"
            placeholder={t("email")}
            value={input.email}
            onChange={hdlChangeInput}
            name="email"
            onDebounced={hdlCheckEmail}
            disabled={isFieldsDisabled}
          />
          <div className="min-w-[20px]">
            {isVerified.email && (
              <Badge
                Icon={VerifyIcon}
                className="!bg-m-acct !text-m-light animate-fade-in-div"
              />
            )}
          </div>
        </div>
        <div className="w-full h-[5px] flex items-center gap-2">
          <div className="w-[80px]"></div>
          <p className="text-xs text-m-error">{errTxtDetail.email}</p>
        </div>
        {/* phone */}
        <div className="w-full flex items-center gap-2">
          <p className="w-[80px] text-right">{t("phone")} </p>
          <Input
            type="text"
            className="flex-grow"
            placeholder={t("phone")}
            value={input.phone}
            onChange={hdlChangeInput}
            name="phone"
            onDebounced={hdlCheckPhone}
            disabled={isFieldsDisabled}
          />
          <div className="min-w-[20px]">
            {isVerified.phone && (
              <Badge
                Icon={VerifyIcon}
                className="!bg-m-acct !text-m-light animate-fade-in-div"
              />
            )}
          </div>
        </div>
        <div className="w-full h-[5px] flex items-center gap-2">
          <div className="w-[80px]"></div>
          <p className="text-xs text-m-error">{errTxtDetail.phone}</p>
        </div>
        {/* address */}
        <div className="w-full flex items-start gap-2">
          <p className="w-[80px] text-right">{t("deliveryAddress")} </p>
          <div className="flex-grow">
            <TextArea
              placeholder={t("deliveryAddress")}
              value={input.address}
              onChange={hdlChangeInput}
              name="address"
              onDebounced={hdlCheckAddress}
              disabled={isFieldsDisabled}
            />
          </div>
          <div className="min-w-[20px]">
            {isVerified.address && (
              <Badge
                Icon={VerifyIcon}
                className="!bg-m-acct !text-m-light animate-fade-in-div self-center"
              />
            )}
          </div>
        </div>
        <div className="w-full h-[5px] flex items-center gap-2">
          <div className="w-[80px]"></div>
          <p className="text-xs text-m-error">{errTxtDetail.address}</p>
        </div>
        {/* remark */}
        <div className="w-full flex items-start gap-2">
          <p className="w-[80px] text-right">{t("remark")} </p>
          <div className="flex-grow">
            <TextArea
              placeholder={t("remarkPH")}
              value={input.remark}
              onChange={hdlChangeInput}
              name="remark"
              disabled={isFieldsDisabled}
            />
          </div>
          <div className="min-w-[20px]"></div>
        </div>
      </div>
      {/* button */}
      <div className="w-full flex justify-between">
        <Button
          lbl={t("backToCart")}
          Icon={CartIcon}
          isAcct={true}
          onClick={hdlClickBackToCart}
          isDisabled={isFieldsDisabled}
        />
        {/* <Button lbl="test" onClick={() => console.log(input)} /> */}
        <Button
          lbl={t("readyToPay")}
          Icon={PayIcon}
          onClick={hdlClickReadyToPay}
          isDisabled={!isAllVerified}
        />
      </div>
    </div>
  );
}

export default ConfirmOrder;
