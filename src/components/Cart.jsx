import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CartIcon,
  CheckoutIcon,
  PackageXIcon,
  RemoveIcon,
} from "../icons/mainIcon";
import Button from "./main/Button";
import useMainStore from "../stores/main-store";
import ButtonRounded from "./main/ButtonRounded";

function Cart({ products, hdlClickCheckout }) {
  const { t } = useTranslation();
  const cart = useMainStore((state) => state.cart);
  const removeCartItemByIndex = useMainStore(
    (state) => state.removeCartItemByIndex
  );
  const [isCartHasItem, setIsCartHasItem] = useState(false);
  const [totalAmt, setTotalAmt] = useState("");

  useEffect(() => {
    setIsCartHasItem(cart.length > 0);
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    setTotalAmt(total);
  }, [cart]);

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
      <div className="w-full min-h-[150px] bg-m-light rounded-m flex flex-col gap-[4px] py-2 px-3">
        {cart.length > 0 ? (
          cart.map((el, idx) => {
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
                <ButtonRounded
                  Icon={RemoveIcon}
                  onClick={() => removeCartItemByIndex(idx)}
                />
              </div>
            );
          })
        ) : (
          <div>
            <PackageXIcon className="text-m-dark/30 w-[50px] mx-auto mt-10" />
          </div>
        )}
      </div>
      {/* cart summary */}
      <div className="w-full flex justify-between items-center py-1 gap-2 ">
        <p className="font-bold ml-2">
          {t("total")}{" "}
          {totalAmt.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          {t("baht")}
        </p>
        {/* <button
          onClick={() => {
            console.log(products);
            console.log(cart);
          }}
        >
          Cart
        </button> */}

        <Button
          lbl={t("checkout")}
          isAcct={true}
          Icon={CheckoutIcon}
          isDisabled={!isCartHasItem}
          onClick={hdlClickCheckout}
        />
      </div>
    </div>
  );
}

export default Cart;
