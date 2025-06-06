import React, { useEffect } from "react";

function Loading() {
  useEffect(() => {
    document.getElementById("loading-modal").showModal();
  });
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-m-line/10 backdrop-blur-[0.5px]">
      <div className="flex space-x-2 justify-center items-center h-screen">
        <div className="h-4 w-4  bg-m-prim rounded-full animate-bounce [animation-delay:-0.3s] shadow-m-s"></div>
        <div className="h-4 w-4  bg-m-second rounded-full animate-bounce [animation-delay:-0.15s] shadow-m-s"></div>
        <div className="h-4 w-4 bg-m-acct rounded-full animate-bounce shadow-m-s"></div>
      </div>
    </div>
  );
}

export default Loading;
