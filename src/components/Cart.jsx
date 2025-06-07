import React from "react";
import { useTranslation } from "react-i18next";
import { CartIcon, CheckoutIcon, RemoveIcon } from "../icons/mainIcon";
import Button from "./main/Button";
import useMainStore from "../stores/main-store";
import ButtonRounded from "./main/ButtonRounded";

function Cart({ products }) {
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
      <div className="w-full min-h-[150px] bg-m-light rounded-m flex flex-col gap-1 py-2 px-3">
        {cart.map((el, idx) => {
          const product = products.find((p) => p.productId === el.productId);
          const option = product?.productOpts.find(
            (opt) => opt.productOptId === el.productOptId
          );

          return (
            <div key={idx} className="flex justify-between items-center gap-2">
              <div className="w-full h-auto flex flex-grow justify-between">
                <div className="flex gap-1">
                  <p className="font-bold">{t(product?.name + "Name")}</p>
                  <p>[{option?.optName}]</p>
                  <p>x {el.unit}</p>
                </div>
                <div className="flex gap-1">
                  <p>
                    {el.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
              <ButtonRounded Icon={RemoveIcon} />
            </div>
          );
        })}
      </div>
      {/* cart summary */}
      <div className="w-full flex justify-end items-baseline gap-2 ">
        <p className="font-bold">
          {t("total")} 100.00 {t("baht")}
        </p>
      </div>
      {/* cart checkout */}
      <div className="w-full flex justify-end items-baseline gap-2 ">
        <button
          onClick={() => {
            console.log(products);
            console.log(cart);
          }}
        >
          Cart
        </button>
        <Button lbl={t("checkout")} isAcct={true} Icon={CheckoutIcon} />
      </div>
    </div>
  );
}

export default Cart;
