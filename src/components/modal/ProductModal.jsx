import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ButtonRounded from "../main/ButtonRounded";
import { hdlCloseModalById } from "../../utils/common";
import {
  AddIcon,
  CartIcon,
  CloseIcon,
  ProductIcon,
  SubtractIcon,
} from "../../icons/mainIcon";
import useModalStore from "../../stores/modal-store";
import useMainStore from "../../stores/main-store";
import Button from "../main/Button";

function ProductModal() {
  const { t } = useTranslation();
  const [isModalFadingOut, setIsModalFadingOut] = useState(false);
  const setIsProductModalOpen = useModalStore(
    (state) => state.setIsProductModalOpen
  );
  const curProduct = useMainStore((state) => state.curProduct);
  const [curPic, setCurPic] = useState(0);
  const [curOpt, setCurOpt] = useState(0);
  const [input, setInput] = useState({
    productId: curProduct?.productId,
    productOptId: curProduct?.productOpts[curOpt]?.productOptId,
    unit: 1,
    price: curProduct?.productOpts[curOpt]?.price,
  });
  const setCart = useMainStore((state) => state.setCart);

  const hdlSelectedPic = (idx) => {
    setCurPic(idx);
  };

  const hdlSelectedOpt = (idx) => {
    setCurOpt(idx);
    setInput((prev) => ({
      ...prev,
      productOptId: curProduct?.productOpts[idx]?.productOptId,
      price: curProduct?.productOpts[idx]?.price * Number(prev.unit),
    }));
  };

  const hdlUnit = (side) => {
    if (side == "add") {
      if (input.unit <= 19) {
        setInput((prev) => ({
          ...prev,
          unit: Number(prev.unit) + 1,
          price:
            curProduct?.productOpts[curOpt]?.price * (Number(prev.unit) + 1),
        }));
      }
    } else {
      if (input.unit > 1) {
        setInput((prev) => ({
          ...prev,
          unit: Number(prev.unit) - 1,
          price:
            curProduct?.productOpts[curOpt]?.price * (Number(prev.unit) - 1),
        }));
      }
    }
  };

  const hdlAddToCart = () => {
    // console.log(input);
    setCart((prev) => [...prev, input]);
    hdlCloseModalById(
      "product-modal",
      setIsModalFadingOut,
      setIsProductModalOpen
    );
  };

  useEffect(() => {
    // console.log(curProduct);
    document.getElementById("product-modal").showModal();
  }, []);
  return (
    <div
      className={`w-[360px]  max-h-[90vh] overflow-y-auto rounded-m shadow-m-m bg-m-light fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-fade-in-modal ${
        isModalFadingOut && "animate-fade-out-modal"
      }`}
    >
      {/* header */}
      <div className="w-full h-[40px] bg-m-menu rounded-t-m px-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ProductIcon className="w-[15px] h-[15px]" />
          <p className="text-base font-bold text-t-light">
            {t(curProduct?.name + "Name")}
          </p>
        </div>
        {/* close button */}
        <ButtonRounded
          Icon={CloseIcon}
          onClick={(e) =>
            hdlCloseModalById(
              "product-modal",
              setIsModalFadingOut,
              setIsProductModalOpen
            )
          }
        />
      </div>
      {/* main area */}
      <div className="w-full max-h-[calc(100vh-200px)] overflow-y-auto px-8 py-4">
        {/* main picture */}
        <div className="w-full h-[300px] flex-shrink-0 flex justify-center items-center overflow-hidden">
          <img
            src={curProduct?.productPics[curPic].url}
            alt="pic"
            className="object-contain w-full h-full"
          />
        </div>
        {/* picture list */}
        <div className="w-full flex-shrink-0 overflow-x-auto h-[50px] bg-m-gray flex gap-1 px-1 items-center">
          {curProduct?.productPics.map((el, idx) => (
            <div
              key={idx}
              className="w-[40px] h-[40px] cursor-pointer"
              onClick={() => hdlSelectedPic(idx)}
            >
              <img
                src={curProduct?.productPics[idx].url}
                alt="pic"
                className="object-contain"
              />
            </div>
          ))}
        </div>
        {/* option */}
        <div className="w-full grid grid-cols-3 gap-2 my-2">
          {curProduct?.productOpts?.length > 0 &&
            curProduct?.productOpts?.map((el, idx) => (
              <Button
                key={idx}
                lbl={el.optName}
                isAcct={!(idx == curOpt)}
                onClick={() => {
                  hdlSelectedOpt(idx);
                }}
              />
            ))}{" "}
        </div>
        {/* price */}
        <div className="w-full justify-between flex">
          <p>{t("price")}</p>
          <p className="text-xl">
            {input.price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            {t("baht")}
          </p>
        </div>
        {/* product name */}
        <p> {t(curProduct?.name + "Name")}</p>
        <p className="font-normal text-xs">{t(curProduct?.name + "Detail")}</p>
        {/* unit */}
        <div className="w-full my-2 flex items-center justify-center gap-4">
          <ButtonRounded
            Icon={SubtractIcon}
            onClick={() => hdlUnit("subtract")}
          />
          <p className="text-2xl text-m-prim">{input.unit}</p>
          <ButtonRounded Icon={AddIcon} onClick={() => hdlUnit("add")} />
        </div>
        {/* button */}
        <div className="w-full flex justify-center mt-8">
          <Button
            lbl={t("addToCart")}
            Icon={CartIcon}
            size="3"
            onClick={hdlAddToCart}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
