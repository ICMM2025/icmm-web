import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../components/main/Button";
import { ExitIcon } from "../icons/mainIcon";
import { useNavigate } from "react-router-dom";
import useUserStore from "../stores/user-store";
import useModalStore from "../stores/modal-store";
import useMainStore from "../stores/main-store";
import { exportExcelApi } from "../apis/admin-api";

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
  const setErrTxt = useModalStore((state) => state.setErrTxt);

  const hdlError = (err) => {
    setErrTxt(err);
    setIsErrorModalOpen(true);
  };

  const hdlLogout = () => {
    localStorage.clear();
    navigate("/login");
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
      </div>
    </>
  );
}

export default Admin;
