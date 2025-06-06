import React from "react";
import { useTranslation } from "react-i18next";

function Login() {
  const { t } = useTranslation();

  return (
    <>
      {/* container */}
      <div className="w-full min-w-[360px] max-w-[1024px] min-h-svh mx-auto bg-m-bg flex flex-col">
        Login Page
      </div>
    </>
  );
}

export default Login;
