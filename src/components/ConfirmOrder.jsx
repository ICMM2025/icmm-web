import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CartIcon,
  CheckoutIcon,
  CouponIcon,
  PayIcon,
  VerifyIcon,
} from "../icons/mainIcon";
import Button from "./main/Button";
import Input from "./main/Input";
import Badge from "./main/Badge";
import TextArea from "./main/TextArea";
import useMainStore from "../stores/main-store";
import { addOrderApi, applyCoupon } from "../apis/order-api";
import useModalStore from "../stores/modal-store";
import { sendOrderMailer } from "../apis/mailer-api";

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
  const setOrderId = useMainStore((state) => state.setOrderId);
  const setQrUrl = useMainStore((state) => state.setQrUrl);
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
  const [isDiscountCodeActive, setIsDiscountCodeActive] = useState(false);
  const [coupon, setCoupon] = useState({});

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
      setOrderId(res.data?.orderId);
      setQrUrl(res.data?.qrUrl);
      // mailer to user
      const mailOptions = {
        to: input?.email,
        subject: t("mailerSubjectReadyForPay"),
        text: `${t("mailerDear")}\n\n${t("mailerTextReadyForPay1")}\n${t(
          "mailerTextReadyForPay2"
        )}${`A${res.data?.orderId.toString().padStart(4, "0")}`}\n${t(
          "mailerTextReadyForPay3"
        )}\n\n${t("mailerRegards")}\n${t("mailerName")}`,
      };
      sendOrderMailer(mailOptions);
      // mailter to admin
      const mailOptionsAdmin = {
        to: import.meta.env.VITE_ADMIN_EMAIL,
        subject: "[ICMM2025] You received new order!",
        text: `The new order no. ${`A${res.data?.orderId
          .toString()
          .padStart(
            4,
            "0"
          )}`}\nPLease confirm the new order within 24 hours.\n\nBest Regrads,\nRobot`,
      };
      sendOrderMailer(mailOptionsAdmin);
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

  const hdlApplyCoupon = async () => {
    console.log(input);
    try {
      const res = await applyCoupon({ discountCode: input.code });
      console.log(res.data?.coupon);
      setIsDiscountCodeActive(true);
      setCoupon(res.data?.coupon);
    } catch (err) {
      console.log(err?.response?.data?.msg || err.message);
      hdlError(t(err?.response?.data?.msg || err.message));
    } finally {
      setIsLoadingModalOpen(false);
    }
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
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    setTotalAmt(total);
  }, [cart]);

  useEffect(() => {
    setGrandTotalAmt(totalAmt + DELIVERY_COST);
  }, [totalAmt]);

  useEffect(() => {
    if (!coupon?.discountType) return;
    let discount = 0;
    if (coupon.discountType === 1) {
      // Type 1: fixed discount
      discount = Math.min(coupon.discountAmt, grandTotalAmt);
    } else if (coupon.discountType === 2) {
      // Type 2: percentage discount (e.g., 0.15 for 15%)
      const percentDiscount = coupon.discountAmt * grandTotalAmt;
      discount = Math.min(percentDiscount, coupon.maxDiscountAmt);
    }
    const newGrandTotal = Math.max(totalAmt + DELIVERY_COST - discount, 0);
    setGrandTotalAmt(newGrandTotal);
    // update input.discountAmt in store
    setInput({ ...input, discountAmt: discount });
  }, [coupon, totalAmt]);

  useEffect(() => {
    setInput({ ...input, code: "" });
  }, []);
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
        {/* total product */}
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
        {/* add delivery cost */}
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
        {/* discount */}
        <div className="w-full flex justify-between">
          <p className="">{t("code")} </p>
          <div className="flex gap-1">
            <Input
              type="Text"
              size="1"
              placeholder={t("fillCode")}
              value={input.code}
              onChange={hdlChangeInput}
              name="code"
              disabled={isDiscountCodeActive}
            />
            <Button
              lbl={t("apply")}
              size="1"
              Icon={CouponIcon}
              onClick={hdlApplyCoupon}
              isDisabled={isDiscountCodeActive}
            />
          </div>
        </div>
        {/* discount detail */}
        {isDiscountCodeActive && (
          <div className="w-full flex justify-between animate-fade-in-div">
            <p className="font-bold">
              {t("discount")}{" "}
              {coupon.discountType === 1 &&
                `${t("notOver")}  ${coupon.discountAmt.toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}`}
              {coupon.discountType === 2 &&
                `${coupon.discountAmt * 100}% ${t(
                  "notOver"
                )} ${coupon.maxDiscountAmt.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}
            </p>

            <p className="">
              {" "}
              {"-"}
              {(input.discountAmt ?? 0).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              {t("baht")}
            </p>
          </div>
        )}
        {/* total amt */}
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
        {/* <Button
          lbl="test"
          onClick={() =>
            console.log({
              input,
              cart,
              totalAmt,
              grandTotalAmt,
              deliveryCost: DELIVERY_COST,
            })
          }
        /> */}
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
