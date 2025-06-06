import React from "react";
import { useTranslation } from "react-i18next";
import Badge from "./main/Badge";
import { ProductIcon } from "../icons/mainIcon";
import useModalStore from "../stores/modal-store";
import useMainStore from "../stores/main-store";

function Products({ products }) {
  const { t } = useTranslation();
  const setIsProductModalOpen = useModalStore(
    (state) => state.setIsProductModalOpen
  );
  const setCurProduct = useMainStore((state) => state.setCurProduct);

  const hldClickProduct = (el) => {
    setCurProduct(el);
    setIsProductModalOpen(true);
  };
  return (
    <>
      {/* product header */}
      <div className="w-full flex justify-between items-baseline animate-fade-in-div">
        <div className="font-bold flex gap-1">
          <ProductIcon className="w-[15px] h-[15px]" /> {t("products")}
        </div>
        <p className="text-xs">{t("clickToSelectProduct")}</p>
      </div>
      {/* product list */}
      <div className="w-full grid grid-cols-3 gap-1  animate-fade-in-div">
        {products.map((el, idx) => (
          <div
            key={idx}
            className=" h-auto  shadow-m-s rounded-m cursor-pointer hover:border bg-white hover:border-m-prim p-2 flex flex-col"
            onClick={() => hldClickProduct(el)}
          >
            <img
              src={el?.productPics[0]?.url}
              alt="pic"
              className="w-full h-full object-obtain"
            />
            <p className="text-xs">{t(el?.name + "Name")}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Products;
