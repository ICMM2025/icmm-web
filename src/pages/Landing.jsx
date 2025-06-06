import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../components/main/Button";
import useModalStore from "../stores/modal-store";
import LanguageSelect from "../components/main/LanguageSelect";
import { testDB } from "../apis/test-api";
function Landing() {
  const { t } = useTranslation();
  const setIsLoadingModalOpen = useModalStore(
    (state) => state.setIsLoadingModalOpen
  );

  const hdlTest = async () => {
    setIsLoadingModalOpen(true);
    try {
      const res = await testDB();
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
        <Button lbl="Test" size="2" onClick={hdlTest} />
        <p>{t("login")}</p>
        <LanguageSelect />
      </div>
    </>
  );
}

export default Landing;
