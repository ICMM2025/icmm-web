import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../components/main/Button";
import { ExitIcon } from "../icons/mainIcon";
import { useNavigate } from "react-router-dom";

function Admin() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const hdlLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      {/* container */}
      <div className="w-full min-w-[360px] max-w-[1024px] min-h-svh mx-auto bg-m-light flex flex-col">
        <Button
          onClick={hdlLogout}
          lbl={t("logout")}
          size="2"
          Icon={ExitIcon}
        />
      </div>
    </>
  );
}

export default Admin;
