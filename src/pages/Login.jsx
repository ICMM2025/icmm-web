import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../components/main/Button";
import Input from "../components/main/Input";
import { LoginIcon } from "../icons/mainIcon";
import { loginApi, testDBApi } from "../apis/login-api";
import useModalStore from "../stores/modal-store";
import useUserStore from "../stores/user-store";
import { useNavigate } from "react-router-dom";
import LanguageSelect from "../components/main/LanguageSelect";

function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const setErrTxt = useModalStore((state) => state.setErrTxt);
  const setIsErrorModalOpen = useModalStore(
    (state) => state.setIsErrorModalOpen
  );
  const setIsLoadingModalOpen = useModalStore(
    (state) => state.setIsLoadingModalOpen
  );
  const setToken = useUserStore((state) => state.setToken);
  const setUser = useUserStore((state) => state.setUser);
  const [input, setInput] = useState({
    name: "admin",
    password: "",
  });

  const hdlInput = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlError = (err) => {
    setErrTxt(err);
    setIsErrorModalOpen(true);
  };

  const hdlLogin = async (e) => {
    e.preventDefault();
    setIsLoadingModalOpen(true);
    try {
      const res = await loginApi(input);
      setToken(res.data.token);
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      console.log(err?.response?.data?.msg || err.message);
      hdlError(err?.response?.data?.msg || err.message);
    } finally {
      setIsLoadingModalOpen(false);
    }
  };

  const hdlTestDB = async () => {
    setIsLoadingModalOpen(true);
    try {
      const res = await testDBApi();
      hdlError(res.data.test.test);
    } catch (err) {
      console.log(err?.response?.data?.msg || err.message);
      hdlError(err?.response?.data?.msg || err.message);
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
          <form
            onSubmit={hdlLogin}
            className="flex justify-center items-center gap-1"
          >
            <p>{t("admin")}</p>
            <Input
              type="password"
              size="2"
              placeholder={t("password")}
              value={input.password}
              onChange={hdlInput}
              name="password"
            />
            <Button
              lbl={t("login")}
              Icon={LoginIcon}
              onClick={hdlLogin}
              type="submit"
            />
          </form>
        </div>
        <div className="w-full flex justify-center mt-4">
          <LanguageSelect />
        </div>
        <div className="w-full flex justify-center py-4">
          <Button lbl="Test DB" size="2" onClick={hdlTestDB} />
        </div>
      </div>
    </>
  );
}

export default Login;
