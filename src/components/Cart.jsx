import React from "react";
import { useTranslation } from "react-i18next";
import { CartIcon, CheckoutIcon } from "../icons/mainIcon";
import Button from "./main/Button";
import useMainStore from "../stores/main-store";

function Cart() {
  const { t } = useTranslation();
  const cart = useMainStore((state) => state.cart);
  return (
    <div className="w-full p-2 rounded-m bg-m-acct/30 flex flex-col gap-1 animate-fade-in-div">
      {/* cart header */}
      <div className="w-full flex justify-between items-baseline ">
        <div className="font-bold flex gap-1 text-m-dart items-center">
          <CartIcon className="w-[15px] h-[15px]" /> {t("cart")}
        </div>
        <p className="text-xs"></p>
      </div>
      {/* cart list */}
      <div className="w-full min-h-[200px] bg-m-light rounded-m flex flex-col p-2">
        <div className="w-full h-2 border rounded-m"></div>
      </div>
      {/* cart summary */}
      <div className="w-full flex justify-end items-baseline gap-2 ">
        <p className="font-bold">
          {t("total")} 100.00 {t("baht")}
        </p>
      </div>
      {/* cart checkout */}
      <div className="w-full flex justify-end items-baseline gap-2 ">
        <button onClick={() => console.log(cart)}>Cart</button>
        <Button lbl={t("checkout")} isAcct={true} Icon={CheckoutIcon} />
      </div>
    </div>
  );
}

export default Cart;
