import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../components/main/Button";
import Input from "../components/main/Input";
import { LoginIcon } from "../icons/mainIcon";
import { loginApi } from "../apis/login-api";
import useModalStore from "../stores/modal-store";

function Login() {
  const { t } = useTranslation();
  const setIsLoadingModalOpen = useModalStore(
    (state) => state.setIsLoadingModalOpen
  );
  const [input, setInput] = useState({
    name: "admin",
    password: "",
  });

  const hdlInput = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlLogin = async () => {
    setIsLoadingModalOpen(true);
    try {
      const res = await loginApi();
      console.log(res);
    } catch (err) {
      console.log(err?.response?.data?.msg || err.message);
    } finally {
      setIsLoadingModalOpen(false);
    }
  };

  return (
    <>
      {/* container */}
      <div className="w-full min-w-[360px] max-w-[1024px] min-h-svh mx-auto bg-m-light flex flex-col">
        {/* main */}
        <div className="w-[360px] mx-auto mt-8 border border-m-line/50 rounded-m p-4 flex justify-center items-center gap-1">
          <p>{t("admin")}</p>
          <Input
            type="password"
            size="2"
            placeholder={t("password")}
            value={input.password}
            onChange={hdlInput}
            name="password"
          />
          <Button lbl={t("login")} Icon={LoginIcon} onClick={hdlLogin} />
        </div>
      </div>
    </>
  );
}

export default Login;
