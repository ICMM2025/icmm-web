import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../components/main/Button";
import Input from "../components/main/Input";
import { ExitIcon, SearchIcon } from "../icons/mainIcon";
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
  });

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
  }, [rawOrders, filter, input]);

  useEffect(() => {
    hdlClickRefresh();
  }, []);

  return (
    <>
      {/* container */}
      <div className="w-full sm:max-w-[700px]  min-h-svh mx-auto bg-m-light flex flex-col items-center py-4 px-4 sm:px-8 gap-2">
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
          <Button
            lbl="1.UserNotPaid"
            onClick={() => hdlFilterChange("1")}
            isAcct={!filter[1]}
          />
          <Button
            lbl="2.WaitConfirm"
            onClick={() => hdlFilterChange("2")}
            isAcct={!filter[2]}
          />
          <Button
            lbl="3.Confirmed"
            onClick={() => hdlFilterChange("3")}
            isAcct={!filter[3]}
          />
          <Button
            lbl="4.Delivered"
            onClick={() => hdlFilterChange("4")}
            isAcct={!filter[4]}
          />
          <Button
            lbl="5.Pending"
            onClick={() => hdlFilterChange("5")}
            isAcct={!filter[5]}
          />
          <Button
            lbl="6.Cancelled"
            onClick={() => hdlFilterChange("6")}
            isAcct={!filter[6]}
          />
        </div>
        {/* refresh */}
        <div className="w-full flex justify-center">
          <Button
            lbl="Refresh"
            size="4"
            className={"!bg-m-second"}
            onClick={hdlClickRefresh}
          />
        </div>
        {/* order list */}
        <div className="w-full flex flex-col gap-[6px] animate-fade-in-div">
          {orders.length > 0 ? (
            orders?.map((el, idx) => (
              <div
                key={idx}
                className="w-full flex justify-between items-center btn-hover"
                onClick={() => hdlSelectOrder(el)}
              >
                {/* staus */}
                <div
                  className={`w-[20px] h-[20px] shrink-0 flex justify-center items-center font-bold text-m-light rounded-m ${
                    statusColors[el?.statusId] || "bg-m-gray"
                  }`}
                >
                  {el?.statusId}
                </div>
                <div className="w-full h-[25px] hover:bg-m-dark/10 border border-m-dark/10 rounded-m flex justify-between items-center px-1 gap-1">
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
                <div className="w-[60px] shrink-0 text-[10px]">
                  {formatDateTimeThai(el?.createdAt)}
                </div>
              </div>
            ))
          ) : (
            <div className="mx-auto">NO DATA</div>
          )}
        </div>
      </div>
    </>
  );
}

export default Admin;
