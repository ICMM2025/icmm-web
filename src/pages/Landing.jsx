import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../components/main/Button";
import useModalStore from "../stores/modal-store";
import LanguageSelect from "../components/main/LanguageSelect";
import { CheckOrderStatusIcon, ProductIcon } from "../icons/mainIcon";
import Cart from "../components/Cart";
import Products from "../components/Products";
import ConfirmOrder from "../components/ConfirmOrder";
import Pay from "../components/Pay";
import { getProductsApi } from "../apis/product-api";

function Landing() {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const setIsLoadingModalOpen = useModalStore(
    (state) => state.setIsLoadingModalOpen
  );

  const getProductsInfo = async () => {
    setIsLoadingModalOpen(true);
    try {
      const res = await getProductsApi();
      console.log(res);
      setProducts(res.data.products);
    } catch (err) {
      console.log(err?.response?.data?.msg || err.message);
    } finally {
      setIsLoadingModalOpen(false);
    }
  };

  useEffect(() => {
    getProductsInfo();
  }, []);

  return (
    <>
      {/* container */}
      <div className="w-full max-w-[400px]  min-h-svh mx-auto bg-m-light flex flex-col items-center py-4 px-2 gap-2">
        {/* language select */}
        <div className="w-full flex justify-between animate-fade-in-div">
          <Button
            lbl={t("checkOrderStatus")}
            Icon={CheckOrderStatusIcon}
            isAcct={true}
          />
          <LanguageSelect />
        </div>
        {/* welcome badge */}
        <div className="w-full h-auto bg-m-prim rounded-m flex flex-col animate-fade-in-div p-2">
          <div className="w-full flex items-baseline gap-2">
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
          </div>
        </div>
        {/* products */}
        <Products products={products} />
        {/* cart */}
        <Cart products={products} />
        {/* ConfirmOrder */}
        <ConfirmOrder />
        {/* pay */}
        <Pay />
      </div>
      {/* footer */}
      <div className="w-full max-w-[400px] mx-auto  h-[80px] bg-m-line/25 p-2 flex justify-between items-center flex-col text-xs animate-fade-in-div">
        <div className="flex flex-col items-center">
          <p>Contact us : @icmm2015</p>
          <p>info.icmm2025@gmail.com</p>
        </div>
        <p>copy right 2025</p>
      </div>
    </>
  );
}

export default Landing;
