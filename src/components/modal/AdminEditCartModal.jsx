import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ButtonRounded from "../main/ButtonRounded";
import { hdlCloseModalById } from "../../utils/common";
import { AddIcon, CloseIcon, RemoveIcon } from "../../icons/mainIcon";
import useModalStore from "../../stores/modal-store";
import useMainStore from "../../stores/main-store";
import { getProductsApi } from "../../apis/product-api";
import Button from "../main/Button";
import Input from "../main/Input";
import { editCartOrderApi } from "../../apis/admin-api";
import useUserStore from "../../stores/user-store";

function AdminEditCartModal() {
  const { t } = useTranslation();
  const [isModalFadingOut, setIsModalFadingOut] = useState(false);
  const setIsAdminEditCartModalOpen = useModalStore(
    (state) => state.setIsAdminEditCartModalOpen
  );
  const order = useMainStore((state) => state.order);
  const [newCart, setNewCart] = useState([]);
  const [products, setProducts] = useState([]);
  const setIsLoadingModalOpen = useModalStore(
    (state) => state.setIsLoadingModalOpen
  );
  const [productsList, setProductsList] = useState([]);
  const token = useUserStore((state) => state.token);
  const toggleRefreshAdminModal = useMainStore(
    (state) => state.toggleRefreshAdminModal
  );

  const getProductsInfo = async () => {
    setIsLoadingModalOpen(true);
    try {
      const res = await getProductsApi();
      console.log(res.data);
      setProducts(res.data.products);

      //   Transform the product data
      const simplifiedList = res.data.products.flatMap((product) =>
        product.productOpts.map((opt) => ({
          name: product.name,
          productId: product.productId,
          productOptId: opt.productOptId,
          optName: opt.optName,
          price: opt.price,
        }))
      );

      setProductsList(simplifiedList);
    } catch (err) {
      console.log(err?.response?.data?.msg || err.message);
      if (err.message === "Network Error") {
        navigate("/network-error");
      }
    } finally {
      setIsLoadingModalOpen(false);
    }
  };

  const hdlClickSaveNewCart = async () => {
    setIsLoadingModalOpen(true);
    try {
      await editCartOrderApi(token, {
        newCart,
        orderId: order.orderId,
      });
      setNewCart([]);
      toggleRefreshAdminModal();
      hdlCloseModalById(
        "admin-edit-cart-modal",
        setIsModalFadingOut,
        setIsAdminEditCartModalOpen
      );
    } catch (err) {
      console.log(err?.response?.data?.msg || err.message);
      hdlError(t(err?.response?.data?.msg || err.message));
    } finally {
      setIsLoadingModalOpen(false);
    }
  };

  const simplifiedOrderDetails = (order) => {
    return order.orderDetails.map((el) => ({
      productId: el.productId,
      productOptId: el.productOptId,
      unit: el.unit,
      price: el.price,
    }));
  };

  useEffect(() => {
    console.log(order);
    getProductsInfo();
    setNewCart(simplifiedOrderDetails(order));
    document.getElementById("admin-edit-cart-modal").showModal();
  }, []);
  return (
    <div
      className={`w-[400px]  max-h-[90vh] overflow-y-auto rounded-m shadow-m-m bg-m-light fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-fade-in-modal ${
        isModalFadingOut && "animate-fade-out-modal"
      }`}
    >
      {/* header */}
      <div className="w-full h-[40px] bg-m-menu rounded-t-m px-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-base font-bold text-t-light">Edit cart</p>
        </div>
        {/* close button */}
        <ButtonRounded
          Icon={CloseIcon}
          onClick={(e) => {
            setNewCart([]);
            hdlCloseModalById(
              "admin-edit-cart-modal",
              setIsModalFadingOut,
              setIsAdminEditCartModalOpen
            );
          }}
        />
      </div>
      {/* main area */}
      <div className="w-full max-h-[calc(100vh-200px)] overflow-y-auto px-8 py-4">
        {/* original product list */}
        <p className="font-bold text-m-prim">Original Cart</p>
        <div className="w-full h-auto bg-m-light  flex flex-col gap-[4px] py-2 px-3 border  rounded-m border-m-prim">
          {order?.orderDetails?.map((el, idx) => {
            return (
              <div
                key={idx}
                className="flex justify-between items-center gap-2 animate-fade-in-div animate-fade-out-div"
              >
                <div className="w-full h-auto flex flex-grow justify-between">
                  <div className="flex gap-1 items-center">
                    <div className="w-[25px] h-[25px]  rounded-m overflow-hidden">
                      <img src={el?.product?.productPics[0]?.url} alt="" />
                    </div>
                    <p className="font-bo ">{t(el?.product?.name + "Name")}</p>
                    <p>[{el?.productOpt?.optName}]</p>
                    <p>x {el?.unit}</p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <p className="font-bold">
                      {el?.price.toLocaleString(undefined, {
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
        {/* new product list */}
        <p className="font-bold text-m-acct">New Cart</p>
        <div className="w-full h-auto bg-m-light  flex flex-col gap-[4px] py-2 px-3 border  rounded-m border-m-acct">
          {newCart?.map((el, idx) => {
            return (
              <div
                key={idx}
                className="flex flex-col justify-between items-center gap-1 animate-fade-in-div animate-fade-out-div"
              >
                <div className="w-full">
                  {/* product */}
                  <select
                    className="w-full border h-[25px] rounded-m px-1 text-sm overflow-auto"
                    value={`${el.productOptId}`}
                    onChange={(e) => {
                      const selectedOptId = parseInt(e.target.value);
                      const selectedProduct = productsList.find(
                        (p) => p.productOptId === selectedOptId
                      );
                      if (!selectedProduct) return;
                      const updatedCart = [...newCart];
                      updatedCart[idx] = {
                        ...updatedCart[idx],
                        productId: selectedProduct.productId,
                        productOptId: selectedProduct.productOptId,
                        price: selectedProduct.price,
                      };
                      setNewCart(updatedCart);
                    }}
                  >
                    <option value="">Select product</option>
                    {productsList.map((p, index) => (
                      <option key={index} value={`${p.productOptId}`}>
                        {t(p.name + "Name")} - {p.optName} - {p.price}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full flex gap-1 justify-end">
                  {/* unit */}
                  <Input
                    className="!w-[40px] text-center h-[25px] rounded-m px-1"
                    type="number"
                    step="1"
                    size="1"
                    value={el.unit}
                    onChange={(e) => {
                      const unit = parseFloat(e.target.value) || 0;
                      const selectedProduct = productsList.find(
                        (p) => p.productOptId === newCart[idx].productOptId
                      );
                      const eachPrice = selectedProduct
                        ? selectedProduct.price
                        : 0;
                      const updatedCart = [...newCart];
                      updatedCart[idx] = {
                        ...updatedCart[idx],
                        unit,
                        price: unit * eachPrice,
                      };
                      setNewCart(updatedCart);
                    }}
                  />
                  {/* price */}
                  <Input
                    type="number"
                    step="0.01"
                    size="1"
                    className="!w-[90px] h-[25px] rounded-m text-right px-1"
                    value={el.price}
                    onChange={(e) => {
                      const raw = e.target.value;
                      const price = parseFloat(raw);
                      const updatedCart = [...newCart];
                      updatedCart[idx] = {
                        ...updatedCart[idx],
                        price: isNaN(price) ? 0 : Math.floor(price * 100) / 100, // Keep 2 decimals
                      };
                      setNewCart(updatedCart);
                    }}
                  />
                  {/* delete */}
                  <div
                    className="w-[25px] shrink-0 h-[25px] bg-m-prim p-1 rounded-m btn-hover"
                    onClick={() => {
                      const updatedCart = newCart.filter((_, i) => i !== idx);
                      setNewCart(updatedCart);
                    }}
                  >
                    <RemoveIcon className="text-m-light" />
                  </div>
                </div>
              </div>
            );
          })}
          <div className="flex justify-between items-center gap-2 animate-fade-in-div animate-fade-out-div">
            {/* add button */}
            <div className="flex-grow "></div>
            <div
              className="w-[25px] h-[25px] bg-m-acct p-1 rounded-m btn-hover"
              onClick={() => {
                const newItem = {
                  productId: null,
                  productOptId: "",
                  price: 0,
                  unit: 1,
                };
                setNewCart([...newCart, newItem]);
              }}
            >
              <AddIcon className="text-m-light" />
            </div>
          </div>
        </div>
        {/* save button */}
        <div className="w-full flex justify-center py-4">
          <Button lbl="Save new cart" size="3" onClick={hdlClickSaveNewCart} />
        </div>
      </div>
    </div>
  );
}

export default AdminEditCartModal;
