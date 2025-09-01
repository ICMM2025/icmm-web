import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../components/main/Button";
import useModalStore from "../stores/modal-store";
import LanguageSelect from "../components/main/LanguageSelect";
import { CheckOrderStatusIcon } from "../icons/mainIcon";
import Cart from "../components/Cart";
import Products from "../components/Products";
import ConfirmOrder from "../components/ConfirmOrder";
import Pay from "../components/Pay";
import { getProductsApi } from "../apis/product-api";
import useMainStore from "../stores/main-store";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

function Shop() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const setIsCheckStatusModalOpen = useModalStore(
    (state) => state.setIsCheckStatusModalOpen
  );
  const setIsLoadingModalOpen = useModalStore(
    (state) => state.setIsLoadingModalOpen
  );
  const [isShowProduct, setIsShowProduct] = useState(true);
  const [isShowCart, setIsShowCart] = useState(true);
  const [isShowConfirmOrder, setIsShowConfirmOrder] = useState(false);
  const isShowPay = useMainStore((state) => state.isShowPay);
  const setCurProduct = useMainStore((state) => state.setCurProduct);
  const clearCart = useMainStore((state) => state.clearCart);
  const setInput = useMainStore((state) => state.setInput);
  const setIsShowPay = useMainStore((state) => state.setIsShowPay);
  const setTotalForPay = useMainStore((state) => state.setTotalForPay);
  const setOrderId = useMainStore((state) => state.setOrderId);
  const setQrUrl = useMainStore((state) => state.setQrUrl);

  const getProductsInfo = async () => {
    setIsLoadingModalOpen(true);
    try {
      const res = await getProductsApi();
      console.log(res);
      setProducts(res.data.products);
    } catch (err) {
      console.log(err?.response?.data?.msg || err.message);
      if (err.message === "Network Error") {
        navigate("/network-error");
      }
    } finally {
      setIsLoadingModalOpen(false);
    }
  };

  const hdlClickCheckout = () => {
    setIsShowProduct(false);
    setIsShowCart(false);
    setIsShowConfirmOrder(true);
  };

  const hdlClickBackToCart = () => {
    setIsShowProduct(true);
    setIsShowCart(true);
    setIsShowConfirmOrder(false);
  };

  const hdlClickCheckOrderStatus = () => {
    setIsCheckStatusModalOpen(true);
  };

  useEffect(() => {
    localStorage.clear();
    setCurProduct({});
    clearCart();
    setInput({ name: "", email: "", phone: "", address: "", remark: "" });
    setIsShowPay(false);
    // setIsShowPay(true);
    setTotalForPay(0);
    setOrderId("");
    setQrUrl("");
    getProductsInfo();
  }, []);

  return (
    <>
      {/* container */}
      <div className="w-full sm:max-w-[700px]  min-h-svh mx-auto bg-m-light flex flex-col items-center py-4 px-4 sm:px-8 gap-2">
        {/* language select */}
        <div className="w-full flex justify-between animate-fade-in-div">
          <Button
            lbl={t("checkOrderStatus")}
            Icon={CheckOrderStatusIcon}
            isAcct={true}
            onClick={hdlClickCheckOrderStatus}
          />
          <LanguageSelect />
        </div>
        {/* welcome badge */}
        <div className="w-full h-auto flex flex-col animate-fade-in-div overflow-hidden">
          {/* <div className="w-full flex items-baseline gap-2">
            <img
              src="/logo-icmm.png"
              alt="logo"
              className="w-[50px] h-[50px]"
            />
            <p className="font-bold text-m-light text-2xl -translate-y-1">
              ICMM Shop
            </p>
          </div>
          <div className="w-full flex justify-center">
            <p className="font-bold text-m-light text-lg">{t("welcomeTxt")}</p>
          </div> */}
          <img src="/icmmshop_banner.jpg" alt="logo" className=" rounded-m" />
          {/* <p className="font-bold text-m-prim text-lg text-center mt-2">
            {t("welcomeTxt")}
          </p> */}
        </div>
        {/* products */}
        {isShowProduct && <Products products={products} />}
        {/* cart */}
        {isShowCart && (
          <Cart products={products} hdlClickCheckout={hdlClickCheckout} />
        )}
        {/* ConfirmOrder */}
        {isShowConfirmOrder && (
          <ConfirmOrder
            products={products}
            hdlClickBackToCart={hdlClickBackToCart}
          />
        )}
        {/* pay */}
        {isShowPay && <Pay />}
      </div>
      {/* footer */}
      <Footer />
      {/* version */}
      <p className="absolute top-0 text-[8px]">v1.1.9</p>
    </>
  );
}

export default Shop;
