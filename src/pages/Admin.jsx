import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../components/main/Button";
import Input from "../components/main/Input";
import {
  ExitIcon,
  ImportantIcon,
  NoteIcon,
  SearchIcon,
} from "../icons/mainIcon";
import { useNavigate } from "react-router-dom";
import useUserStore from "../stores/user-store";
import useModalStore from "../stores/modal-store";
import useMainStore from "../stores/main-store";
import { exportExcelApi, getAllOrdersApi } from "../apis/admin-api";
import { formatDateTimeThai } from "../utils/common";

const statusColors = {
  1: "bg-m-gray",
  2: "bg-m-prim",
  3: "bg-m-acct",
  4: "bg-m-second",
  5: "bg-m-error",
};

function Admin() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const token = useUserStore((state) => state.token);
  const setIsLoadingModalOpen = useModalStore(
    (state) => state.setIsLoadingModalOpen
  );
  const setIsErrorModalOpen = useModalStore(
    (state) => state.setIsErrorModalOpen
  );
  const [input, setInput] = useState("");
  const setErrTxt = useModalStore((state) => state.setErrTxt);
  const [rawOrders, setRawOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const setSelectedOrderId = useMainStore((state) => state.setSelectedOrderId);
  const setIsAdminModalOpen = useModalStore(
    (state) => state.setIsAdminModalOpen
  );
  const [filter, setFilter] = useState({
    1: false,
    2: true,
    3: false,
    4: false,
    5: false,
    6: false,
    important: false,
    haveNote: false,
  });
  const refreshOrders = useMainStore((state) => state.refreshOrders);
  const [countStatus, setCountStatus] = useState({});

  const hdlFilterChange = (val) => {
    setFilter((prev) => ({
      ...prev,
      [val]: !prev[val],
    }));
  };

  const hdlError = (err) => {
    setErrTxt(err);
    setIsErrorModalOpen(true);
  };

  const hdlLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const hdlSelectOrder = (el) => {
    setSelectedOrderId(el.orderId);
    setIsAdminModalOpen(true);
  };

  const hdlExportExcel = async () => {
    setIsLoadingModalOpen(true);
    try {
      const result = await exportExcelApi(token);
      const url = window.URL.createObjectURL(new Blob([result.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "data.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.log(err?.response?.data?.msg || err.message);
      hdlError(t(err?.response?.data?.msg || err.message));
    } finally {
      setIsLoadingModalOpen(false);
    }
  };

  const hdlClickRefresh = async () => {
    setIsLoadingModalOpen(true);
    try {
      const result = await getAllOrdersApi(token);
      console.log(result.data?.orders);
      setRawOrders(result.data?.orders);
    } catch (err) {
      console.log(err?.response?.data?.msg || err.message);
      hdlError(t(err?.response?.data?.msg || err.message));
    } finally {
      setIsLoadingModalOpen(false);
    }
  };

  useEffect(() => {
    const searchText = input.trim().toLowerCase();

    // First filter by status filter
    let filtered = rawOrders.filter((order) => filter[order.status.statusId]);

    // Filter by important if enabled
    if (filter.important) {
      filtered = filtered.filter((order) => order.isImportant === true);
    }

    // Filter by haveNote if enabled
    if (filter.haveNote) {
      filtered = filtered.filter((order) => order.haveNote === true);
    }

    // Then, if input exists, filter by search text
    if (searchText !== "") {
      filtered = filtered.filter((order) => {
        const orderIdStr = order.orderId.toString().toLowerCase();
        const nameStr = order.name?.toLowerCase() || "";
        const phoneStr = order.phone?.toLowerCase() || "";
        const emailStr = order.email?.toLowerCase() || "";
        const remarkStr = order.remark?.toLowerCase() || "";
        const amtStr = order.grandTotalAmt?.toString() || "";

        return (
          orderIdStr.includes(searchText) ||
          nameStr.includes(searchText) ||
          phoneStr.includes(searchText) ||
          emailStr.includes(searchText) ||
          remarkStr.includes(searchText) ||
          amtStr.includes(searchText)
        );
      });
    }

    setOrders(filtered);
    // Count orders by status
    const newStatusCounts = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    };

    rawOrders.forEach((order) => {
      const statusId = order.status?.statusId;
      if (newStatusCounts.hasOwnProperty(statusId)) {
        newStatusCounts[statusId]++;
      }
    });

    setCountStatus(newStatusCounts);
  }, [rawOrders, filter, input]);

  useEffect(() => {
    hdlClickRefresh();
  }, [refreshOrders]);

  useEffect(() => {
    hdlClickRefresh();
  }, []);

  return (
    <>
      {/* container */}
      <div className="w-full sm:max-w-[700px] min-w-[420px]  min-h-svh mx-auto bg-m-light flex flex-col items-center py-4 px-4 sm:px-8 gap-2">
        {/* button */}
        <div className="w-full flex justify-between">
          {/* left */}
          <div>
            <Button
              lbl="Export Excel"
              size="2"
              className="!bg-green-700"
              onClick={hdlExportExcel}
            />
          </div>
          {/* right */}
          <div>
            <Button
              onClick={hdlLogout}
              lbl={t("logout")}
              size="2"
              Icon={ExitIcon}
            />
          </div>
        </div>
        {/* search */}
        <div className="w-full flex gap-1">
          <SearchIcon className="w-[20px] h-[20px]" />
          <Input
            className="w-full"
            placeholder="OrderNo, Name, Phone, Remark, TotalAmt"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        {/* filter */}
        <div className="w-full flex flex-wrap gap-1">
          <div className=" flex items-center relative">
            <Button
              lbl={
                <>
                  1.UserNotPaid{" "}
                  <span className="text-m-dark">({countStatus[1]})</span>
                </>
              }
              onClick={() => hdlFilterChange("1")}
              isAcct={!filter[1]}
            />
          </div>
          <div className=" flex items-center relative">
            <Button
              lbl={
                <>
                  2.WaitConfirm{" "}
                  <span className="text-m-dark">({countStatus[2]})</span>
                </>
              }
              onClick={() => hdlFilterChange("2")}
              isAcct={!filter[2]}
            />
          </div>
          <div className=" flex items-center relative">
            <Button
              lbl={
                <>
                  3.Confirmed{" "}
                  <span className="text-m-dark">({countStatus[3]})</span>
                </>
              }
              onClick={() => hdlFilterChange("3")}
              isAcct={!filter[3]}
            />
          </div>
          <div className=" flex items-center relative">
            <Button
              lbl={
                <>
                  4.Delivered{" "}
                  <span className="text-m-dark">({countStatus[4]})</span>
                </>
              }
              onClick={() => hdlFilterChange("4")}
              isAcct={!filter[4]}
            />
          </div>
          <div className=" flex items-center relative">
            <Button
              lbl={
                <>
                  5.Pending{" "}
                  <span className="text-m-dark">({countStatus[5]})</span>
                </>
              }
              onClick={() => hdlFilterChange("5")}
              isAcct={!filter[5]}
            />
          </div>
          <div className=" flex items-center relative">
            <Button
              lbl={
                <>
                  6.Cancelled{" "}
                  <span className="text-m-dark">({countStatus[6]})</span>
                </>
              }
              onClick={() => hdlFilterChange("6")}
              isAcct={!filter[6]}
            />
          </div>
        </div>

        {/* <hr className="border-t w-full border-m-dark/50" /> */}
        <div className="w-full flex gap-2">
          <Button
            lbl="Important"
            onClick={() => hdlFilterChange("important")}
            isAcct={!filter["important"]}
          />
          <Button
            lbl="HaveNote"
            onClick={() => hdlFilterChange("haveNote")}
            isAcct={!filter["haveNote"]}
          />
          {/* refresh */}
          <div className="w-full flex">
            <Button
              lbl="Refresh"
              className="!bg-m-second w-full"
              onClick={hdlClickRefresh}
            />
          </div>
        </div>
        {/* <hr className="border-t w-full border-m-dark/50" /> */}

        {/* order list */}
        <div className="w-full flex flex-col gap-[8px] animate-fade-in-div">
          {orders.length > 0 ? (
            orders?.map((el, idx) => (
              <div
                key={idx}
                className="w-full flex justify-between items-center btn-hover gap-[2px]"
                onClick={() => hdlSelectOrder(el)}
              >
                {" "}
                {/* have note */}
                {el?.haveNote && (
                  <div
                    className={`w-[20px] h-[20px] shrink-0 flex justify-center items-center font-bold text-m-light rounded-m`}
                  >
                    <NoteIcon className="w-[20px] h-[20px] rounded-m bg-m-second text-m-light" />
                  </div>
                )}
                {/* important */}
                {el?.isImportant && (
                  <div
                    className={`w-[20px] h-[20px] shrink-0 flex justify-center items-center font-bold text-m-light rounded-m`}
                  >
                    <ImportantIcon className="w-[20px] h-[20px] rounded-m bg-m-error text-m-light" />
                  </div>
                )}
                {/* staus */}
                <div
                  className={`w-[20px] h-[20px] shrink-0 flex justify-center items-center font-bold text-m-light rounded-m ${
                    statusColors[el?.statusId] || "bg-m-gray"
                  }`}
                >
                  {el?.statusId}
                </div>
                <div className="w-full h-[30px] hover:bg-m-dark/10 border border-m-dark/10 rounded-m flex justify-between items-center px-1 gap-2">
                  {/* left */}
                  <div className="flex-grow flex gap-1 text-xs">
                    {/* order id */}
                    <p className="font-bold">{`A${el?.orderId
                      .toString()
                      .padStart(4, "0")}`}</p>
                    {/* name */}
                    <p className="max-w-[60px] truncate overflow-hidden whitespace-nowrap">
                      {el?.name}
                    </p>
                    {/* email */}
                    <p className="max-w-[60px] truncate overflow-hidden whitespace-nowrap">
                      {el?.email}
                    </p>
                    {/* phone */}
                    <p className="max-w-[60px] truncate overflow-hidden whitespace-nowrap">
                      {el?.phone}
                    </p>
                  </div>

                  {/* right */}
                  <div className=" text-right flex">
                    {/* grandtotal */}
                    <p className="max-w-[80px] truncate overflow-hidden whitespace-nowrap font-bold">
                      {el?.grandTotalAmt.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>
                {/* icon */}
                <div className="w-[30px] shrink-0 text-[10px]">
                  {formatDateTimeThai(el?.createdAt)}
                </div>
              </div>
            ))
          ) : (
            <div className="mx-auto">NO DATA</div>
          )}
        </div>
        {/* version */}
        <p className="absolute top-0 left-0 text-[8px]">v1.1.0</p>
      </div>
    </>
  );
}

export default Admin;
