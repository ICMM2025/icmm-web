import React, { useState, useEffect } from "react";
import ButtonRounded from "../main/ButtonRounded";
import { hdlCloseModalById } from "../../utils/common";
import { CloseIcon } from "../../icons/mainIcon";
import useModalStore from "../../stores/modal-store";

function TestModal() {
  const [isModalFadingOut, setIsModalFadingOut] = useState(false);
  const setIsTestModalOpen = useModalStore((state) => state.setIsTestModalOpen);

  useEffect(() => {
    console.log("useEffect Test");
    document.getElementById("test-modal").showModal();
  }, []);
  return (
    <div
      className={`w-[350px] h-auto  rounded-m shadow-m-m bg-m-bg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-fade-in-modal ${
        isModalFadingOut && "animate-fade-out-modal"
      }`}
    >
      {/* header */}
      <div className="w-full h-[40px] bg-m-menu rounded-t-m px-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-base font-bold text-t-light">Test</p>
        </div>
        {/* close button */}
        <ButtonRounded
          Icon={CloseIcon}
          onClick={(e) =>
            hdlCloseModalById(
              "test-modal",
              setIsModalFadingOut,
              setIsTestModalOpen
            )
          }
        />
      </div>
      {/* label area */}
      <div className="w-full py-4 px-8 break-words flex gap-1 text-s-red font-bold justify-center items-start max-h-[300px] overflow-y-auto">
        <p>Test</p>
      </div>
    </div>
  );
}

export default TestModal;
