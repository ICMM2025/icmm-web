import React from "react";
import { useTranslation } from "react-i18next";
import { CartIcon, CheckoutIcon, PayIcon, VerifyIcon } from "../icons/mainIcon";
import Button from "./main/Button";
import Input from "./main/Input";
import Badge from "./main/Badge";
import TextArea from "./main/TextArea";

function ConfirmOrder() {
  const { t } = useTranslation();
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
      <div className="w-full">
        <p>Product1</p>
        <p>Product2</p>
        <p>Product3</p>
        <p>Product4</p>
      </div>
      {/* product summary */}
      <div className="w-full flex justify-end">
        <p className="font-bold">
          {t("total")} 100.00 {t("baht")}
        </p>
      </div>
      {/* delivery information */}
      <div className="w-full flex flex-col gap-2">
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
        <Button lbl={t("backToCart")} Icon={CartIcon} isAcct={true} />
        <Button lbl={t("readyToPay")} Icon={PayIcon} />
      </div>
    </div>
  );
}

export default ConfirmOrder;
