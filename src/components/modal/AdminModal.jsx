import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ButtonRounded from "../main/ButtonRounded";
import { hdlCloseModalById } from "../../utils/common";
import {
  AdminIcon,
  CheckOrderStatusIcon,
  CloseIcon,
} from "../../icons/mainIcon";
import useModalStore from "../../stores/modal-store";
import Input from "../main/Input";
import Button from "../main/Button";
import { checkOrderApi } from "../../apis/order-api";
import Badge from "../main/Badge";
import useMainStore from "../../stores/main-store";
import useUserStore from "../../stores/user-store";
import {
  addNoteApi,
  editDetailOrderApi,
  getOrderDetailAdminApi,
} from "../../apis/admin-api";
import { formatDateTimeThai } from "../../utils/common";
import TextArea from "../main/TextArea";

function AdminModal() {
  const { t } = useTranslation();
  const setErrTxt = useModalStore((state) => state.setErrTxt);
  const setIsErrorModalOpen = useModalStore(
    (state) => state.setIsErrorModalOpen
  );
  const setIsLoadingModalOpen = useModalStore(
    (state) => state.setIsLoadingModalOpen
  );
  const [isModalFadingOut, setIsModalFadingOut] = useState(false);
  const setIsAdminModalOpen = useModalStore(
    (state) => state.setIsAdminModalOpen
  );
  const selectedOrderId = useMainStore((state) => state.selectedOrderId);
  const setSelectedOrderId = useMainStore((state) => state.setSelectedOrderId);
  const token = useUserStore((state) => state.token);
  const [originOrder, setOriginOrder] = useState({});
  const [inputNote, setInputNote] = useState("");
  const [isMailerUser, setIsMailerUser] = useState(true);
  const [isMailerAdmin, setIsMailerAdmin] = useState(true);
  const setIsChangeStatusModalOpen = useModalStore(
    (state) => state.setIsChangeStatusModalOpen
  );
  const setStatus = useMainStore((state) => state.setStatus);
  const order = useMainStore((state) => state.order);
  const setOrder = useMainStore((state) => state.setOrder);

  const hdlError = (err) => {
    setErrTxt(err);
    setIsErrorModalOpen(true);
  };

  const getOrderDetailAdmin = async (selectedOrderId) => {
    setIsLoadingModalOpen(true);
    try {
      const result = await getOrderDetailAdminApi(token, {
        orderId: selectedOrderId,
      });
      console.log(result.data.order);
      setOrder(result.data.order);
      setOriginOrder(result.data.order);
      setStatus(() => result.data.status);
    } catch (err) {
      console.log(err?.response?.data?.msg || err.message);
      hdlError(t(err?.response?.data?.msg || err.message));
    } finally {
      setIsLoadingModalOpen(false);
    }
  };

  const hdlAddNote = async () => {
    if (!inputNote) return;

    setIsLoadingModalOpen(true);
    try {
      const result = await addNoteApi(token, {
        noteTxt: inputNote,
        orderId: order?.orderId,
      });
      console.log(result.data?.newNote);
      const newNote = result.data?.newNote;
      setOrder({
        ...order,
        notes: order.notes ? [...order.notes, newNote] : [newNote],
      });
      setInputNote("");
    } catch (err) {
      console.log(err?.response?.data?.msg || err.message);
      hdlError(t(err?.response?.data?.msg || err.message));
    } finally {
      setIsLoadingModalOpen(false);
    }
  };

  const hdlChangeOrder = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  };

  const hdlChangeStatus = () => {
    setIsChangeStatusModalOpen(true);
  };

  const hdlClickSaveEdit = async () => {
    setIsLoadingModalOpen(true);
    const body = {
      orderId: order.orderId,
      statusId: order.statusId,
      isImportant: order.isImportant,
      name: order.name,
      email: order.email,
      phone: order.phone,
      address: order.address,
      remark: order.remark,
      totalAmt: order.totalAmt,
      deliveryCost: order.deliveryCost,
      grandTotalAmt: order.grandTotalAmt,
    };
    try {
      const result = await editDetailOrderApi(token, body);
      console.log(result.data);
      await getOrderDetailAdmin(selectedOrderId);
    } catch (err) {
      console.log(err?.response?.data?.msg || err.message);
      hdlError(t(err?.response?.data?.msg || err.message));
    } finally {
      setIsLoadingModalOpen(false);
    }
  };

  useEffect(() => {
    setInputNote("");
    setIsMailerUser(true);
    setIsMailerAdmin(true);
    getOrderDetailAdmin(selectedOrderId);
    document.getElementById("admin-modal").showModal();
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
          <AdminIcon className="w-[15px] h-[15px]" />
          <p className="text-base font-bold text-t-light">
            Order detail for admin
          </p>
        </div>
        {/* close button */}
        <ButtonRounded
          Icon={CloseIcon}
          onClick={(e) => {
            setOrder({});
            setSelectedOrderId("");
            hdlCloseModalById(
              "admin-modal",
              setIsModalFadingOut,
              setIsAdminModalOpen
            );
          }}
        />
      </div>
      {/* main area */}
      <div className="w-full max-h-[calc(100vh-200px)] overflow-y-auto px-8 py-4">
        {/* // order detail */}
        <div className="w-full flex flex-col items-center py-2 gap-2 animate-fade-in-div">
          {/* current status */}
          <div className="w-full flex justify-between">
            <p className="">Current Status </p>
            <div
              className="font-bold h-[25px] flex justify-center items-center border px-2 rounded-m border-m-prim  btn-hover"
              onClick={hdlChangeStatus}
            >
              {t(order?.status?.name)}
            </div>
          </div>
          {/* important */}
          <div className="w-full flex justify-between">
            <p className="">Important Flag</p>
            {/* toggle */}
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={!!order?.isImportant}
                name="isImportant"
                onChange={(e) =>
                  setOrder((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.checked,
                  }))
                }
              />
              <div className="relative w-11 h-6 bg-m-gray rounded-full peer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:bg-m-prim focus:outline-none focus:ring-0" />
            </label>
          </div>
          {/* order No */}
          <div className="w-full flex justify-between">
            <p className="">{t("orderNo")} </p>
            <p className="font-bold">
              {" "}
              {order?.orderId != null
                ? `A${order.orderId.toString().padStart(4, "0")}`
                : "-"}
            </p>
          </div>
          {/* createdAt */}
          <div className="w-full flex justify-between text-xs text-m-dark/50">
            <p className="">{t("createdAt")} </p>
            <p>{formatDateTimeThai(order?.createdAt)}</p>
          </div>
          {/* updatedAt */}
          <div className="w-full flex justify-between  text-xs  text-m-dark/50">
            <p className="">{t("updatedAt")} </p>
            <p>{formatDateTimeThai(order?.updatedAt)}</p>
          </div>
          {/* name */}
          <div className="w-full flex justify-between">
            <p className="">{t("name")} </p>

            <Input
              type="text"
              placeholder={order?.name}
              value={order?.name}
              name="name"
              size="4"
              className="text-right px-1 border border-m-prim"
              onChange={hdlChangeOrder}
            />
          </div>
          {/* email */}
          <div className="w-full flex justify-between">
            <p className="">{t("email")} </p>
            <Input
              type="text"
              placeholder={order?.email}
              value={order?.email}
              name="email"
              size="4"
              className="text-right px-1 border border-m-prim"
              onChange={hdlChangeOrder}
            />
          </div>
          {/* phone */}
          <div className="w-full flex justify-between">
            <p className="">{t("phone")} </p>
            <Input
              type="text"
              placeholder={order?.phone}
              value={order?.phone}
              name="phone"
              size="4"
              className="text-right px-1 border border-m-prim"
              onChange={hdlChangeOrder}
            />
          </div>
          {/* address */}
          <div className="w-full flex justify-between">
            <p className="w-1/5 shrink-0">{t("deliveryAddress")} </p>
            <TextArea
              type="text"
              placeholder={order?.address}
              value={order?.address}
              name="address"
              size="4"
              className=" px-1 border border-m-prim"
              onChange={hdlChangeOrder}
            />
          </div>
          {/* remake */}
          <div className="w-full flex justify-between">
            <p className="w-1/5 shrink-0">{t("remark")} </p>
            <TextArea
              type="text"
              placeholder={order?.remark}
              value={order?.remark}
              name="remark"
              size="4"
              className=" px-1 border border-m-prim"
              onChange={hdlChangeOrder}
            />
          </div>
          {/* evidence */}
          <div className="w-full flex justify-between">
            <div className="w-1/5 shrink-0 flex flex-col">
              <p className="w-1/5 shrink-0">Evidence </p>
              <div className="border px-2 rounded-m border-m-prim  btn-hover">
                Change
              </div>
            </div>
            <div
              className="w-[50px] h-[50px] border btn-hover relative"
              onClick={() => {
                if (order?.userUploadPicUrl) {
                  window.open(order.userUploadPicUrl, "_blank");
                }
              }}
            >
              <img
                src={order?.userUploadPicUrl}
                alt="pic"
                className="object-contain w-[50px] h-[50px]"
              />
              <p className="text-xs font-bold absolute top-0 left-0 text-right -translate-x-[105%]">
                {`Click-->`}
              </p>
            </div>
          </div>
          {/* products list */}
          <div className="w-full h-auto bg-m-light  flex flex-col gap-[4px] py-2 px-3 border  rounded-m border-m-prim  btn-hover">
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
                      <p className="font-bo ">
                        {t(el?.product?.name + "Name")}
                      </p>
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
          {/* product summary */}
          <div className="w-full flex flex-col items-end py-1 gap-1 px-2 animate-fade-in-div">
            <div className="w-full flex justify-between animate-fade-in-div">
              <p className="">{t("totalProduct")} </p>
              <Input
                type="text"
                placeholder={order?.totalAmt?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                value={order?.totalAmt?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                name="totalAmt"
                size="2"
                className="text-right px-1 border border-m-prim"
                onChange={hdlChangeOrder}
              />
            </div>
            <div className="w-full flex justify-between animate-fade-in-div">
              <p className="">
                <span className="font-bold">{t("added")}</span>
                {" " + t("deliveryCost")}{" "}
              </p>
              <Input
                type="text"
                placeholder={order?.deliveryCost?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                value={order?.deliveryCost?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                name="deliveryCost"
                size="2"
                className="text-right px-1 border border-m-prim"
                onChange={hdlChangeOrder}
              />
            </div>
            <div className="w-full flex justify-between  text-[16px] font-bold animate-fade-in-div">
              <p className=" ">{t("totalAmt")} </p>
              <Input
                type="text"
                placeholder={order?.grandTotalAmt?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                value={order?.grandTotalAmt?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                name="grandTotalAmt"
                size="2"
                className="text-right px-1 border border-m-prim"
                onChange={hdlChangeOrder}
              />
            </div>
          </div>
        </div>

        {/* note area */}
        <p className="font-bold animate-fade-in-div">Admin Note</p>
        <div className="w-full border-2 border-m-acct min-h-[150px] max-h-[250px] flex flex-col justify-between p-1 rounded-m  animate-fade-in-div">
          <div className="w-full flex flex-col gap-1 overflow-y-auto p-1 text-xs ">
            {order?.notes?.map((el, idx) => (
              <div
                key={idx}
                className="w-full flex gap-1 items-center px-1 border-b border-m-dark/30 animate-fade-in-div"
              >
                <div className="font-bold w-[50px] text-m-dark/50">
                  {formatDateTimeThai(el.createdAt)}
                </div>
                <p
                  className={`flex ${
                    el?.isRobot ? "text-m-acct" : "font-bold"
                  }`}
                >
                  {el?.isRobot && (
                    <AdminIcon className="w-[18px] mr-1 text-m-acct" />
                  )}
                  {el.noteTxt}
                </p>
              </div>
            ))}
          </div>
          {/* input note */}
          <div className="flex justify-between gap-2 ">
            <Input
              className="flex-grow"
              value={inputNote}
              onChange={(e) => setInputNote(e.target.value)}
              placeholder="Add admin note here..."
            />
            <Button
              lbl="Add"
              className="!px-2"
              isAcct={true}
              onClick={hdlAddNote}
            />
            {/* <button onClick={() => console.log(order)}>Test</button> */}
          </div>
        </div>
        <hr className="my-2" />
        {/* button area */}
        <div className="w-full flex flex-col gap-2 animate-fade-in-div">
          <div className="w-full flex justify-between animate-fade-in-div">
            <p>
              Send email to <span className="font-bold"> User</span> this time
            </p>
            {/* toggle */}
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isMailerUser}
                onChange={(e) => setIsMailerUser(e.target.checked)}
              />
              <div className="relative w-11 h-6 bg-m-gray rounded-full peer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:bg-m-prim focus:outline-none focus:ring-0" />
            </label>
          </div>
          <div className="w-full flex justify-between animate-fade-in-div">
            <p>
              Send email to <span className="font-bold"> Admin</span> this time
            </p>
            {/* toggle */}
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isMailerAdmin}
                onChange={(e) => setIsMailerAdmin(e.target.checked)}
              />
              <div className="relative w-11 h-6 bg-m-gray rounded-full peer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:bg-m-prim focus:outline-none focus:ring-0" />
            </label>
          </div>
          {/* button */}
          <div className="w-full flex justify-between animate-fade-in-div">
            <div className="flex gap-2">
              <Button
                lbl="Save Edit"
                className="!bg-m-acct"
                onClick={hdlClickSaveEdit}
              />
              <Button
                lbl="Revert"
                className="!bg-m-second"
                onClick={() => setOrder(originOrder)}
              />
            </div>
            <Button
              lbl="Forward Next Status"
              onClick={() => console.log(order)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminModal;
