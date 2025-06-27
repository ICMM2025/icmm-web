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
import { getVirtualTrans } from "../apis/upload-api";

function AdminVirtualRun() {
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
  const [filter, setFilter] = useState({});
  const [rawTrans, setRawTrans] = useState([]);
  const [trans, setTrans] = useState([]);

  const hdlError = (err) => {
    setErrTxt(err);
    setIsErrorModalOpen(true);
  };

  const hdlLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const hdlClickRefresh = async () => {
    setIsLoadingModalOpen(true);
    try {
      const result = await getVirtualTrans(token);
      console.log(result.data);
      setRawTrans(result.data?.trans);
    } catch (err) {
      console.log(err?.response?.data?.msg || err.message);
      hdlError(t(err?.response?.data?.msg || err.message));
    } finally {
      setIsLoadingModalOpen(false);
    }
  };

  useEffect(() => {
    hdlClickRefresh();
  }, []);

  const hdlExportExcel = async () => {
    // setIsLoadingModalOpen(true);
    // try {
    //   const result = await exportExcelApi(token);
    //   const url = window.URL.createObjectURL(new Blob([result.data]));
    //   const link = document.createElement("a");
    //   link.href = url;
    //   link.setAttribute("download", "data.xlsx");
    //   document.body.appendChild(link);
    //   link.click();
    //   link.remove();
    // } catch (err) {
    //   console.log(err?.response?.data?.msg || err.message);
    //   hdlError(t(err?.response?.data?.msg || err.message));
    // } finally {
    //   setIsLoadingModalOpen(false);
    // }
  };

  const hdlGoShop = () => {
    navigate("/");
  };

  useEffect(() => {
    setTrans(rawTrans);
  }, [rawTrans]);

  useEffect(() => {
    // hdlClickRefresh();
  }, []);

  return (
    <>
      {/* container */}
      <div className="w-full sm:max-w-[700px] min-w-[400px]  min-h-svh mx-auto bg-m-light flex flex-col items-center py-4 px-4 sm:px-8 gap-2">
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
              onClick={hdlGoShop}
              lbl="Shop"
              size="2"
              Icon={ExitIcon}
              isAcct={true}
            />
          </div>
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
              lbl="Test"
              onClick={() => hdlFilterChange("1")}
              isAcct={!filter[1]}
            />
          </div>
        </div>

        {/* <hr className="border-t w-full border-m-dark/50" /> */}
        <div className="w-full flex gap-2">
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
          <div className="w-full h-[25px]">Test</div>
        </div>
      </div>
    </>
  );
}

export default AdminVirtualRun;
