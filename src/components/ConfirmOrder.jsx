import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CartIcon, CheckoutIcon, PayIcon, VerifyIcon } from "../icons/mainIcon";
import Button from "./main/Button";
import Input from "./main/Input";
import Badge from "./main/Badge";
import TextArea from "./main/TextArea";
import useMainStore from "../stores/main-store";

function ConfirmOrder({ products, hdlClickBackToCart }) {
  const DELIVERY_COST = 50;
  const { t } = useTranslation();
  const cart = useMainStore((state) => state.cart);
  const [totalAmt, setTotalAmt] = useState("");
  const [grandTotalAmt, setGrandTotalAmt] = useState("");

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
        {/* email */}
        <div className="w-full flex items-center gap-2">
          <p className="w-[80px] text-right">{t("email")} </p>
          <Input type="text" className="flex-grow" />
          <Badge
            Icon={VerifyIcon}
            className="!bg-m-acct !text-m-light animate-fade-in-div"
          />
        </div>
        {/* name */}
        <div className="w-full flex items-center gap-2">
          <p className="w-[80px] text-right">{t("name")} </p>
          <Input type="text" className="flex-grow" />
          <Badge
            Icon={VerifyIcon}
            className="!bg-m-acct !text-m-light animate-fade-in-div"
          />
        </div>
        {/* phone */}
        <div className="w-full flex items-center gap-2">
          <p className="w-[80px] text-right">{t("phone")} </p>
          <Input type="text" className="flex-grow" />
          <Badge
            Icon={VerifyIcon}
            className="!bg-m-acct !text-m-light animate-fade-in-div"
          />
        </div>
        {/* address */}
        <div className="w-full flex items-start gap-2">
          <p className="w-[80px] text-right">{t("deliveryAddress")} </p>
          <div className="flex-grow">
            <TextArea />
          </div>
          <Badge
            Icon={VerifyIcon}
            className="!bg-m-acct !text-m-light animate-fade-in-div self-center"
          />
        </div>
      </div>
      {/* button */}
      <div className="w-full flex justify-between">
        <Button
          lbl={t("backToCart")}
          Icon={CartIcon}
          isAcct={true}
          onClick={hdlClickBackToCart}
        />
        <Button lbl={t("readyToPay")} Icon={PayIcon} />
      </div>
    </div>
  );
}

export default ConfirmOrder;
