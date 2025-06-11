import React, { useState, useEffect } from "react";
import ButtonRounded from "../main/ButtonRounded";
import { hdlCloseModalById } from "../../utils/common";
import { CloseIcon } from "../../icons/mainIcon";
import useModalStore from "../../stores/modal-store";
import useMainStore from "../../stores/main-store";

function ChangeStatusModal() {
  const [isModalFadingOut, setIsModalFadingOut] = useState(false);
  const setIsChangeStatusModalOpen = useModalStore(
    (state) => state.setIsChangeStatusModalOpen
  );
  const status = useMainStore((state) => state.status);
  const order = useMainStore((state) => state.order);
  const setOrder = useMainStore((state) => state.setOrder);

  const hdlChangeStatus = (el) => {
    setOrder({
      ...order,
      status: { statusId: el.statusId, name: el.name },
      statusId: el.statusId,
    });
    hdlCloseModalById(
      "change-status-modal",
      setIsModalFadingOut,
      setIsChangeStatusModalOpen
    );
  };

  useEffect(() => {
    console.log(status);
    document.getElementById("change-status-modal").showModal();
  }, []);
  return (
    <div
      className={`w-[220px] h-auto  rounded-m shadow-m-m bg-m-light fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-fade-in-modal ${
        isModalFadingOut && "animate-fade-out-modal"
      }`}
    >
      {/* header */}
      <div className="w-full h-[40px] bg-m-menu rounded-t-m px-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-base font-bold text-t-light">Change Status</p>
        </div>
        {/* close button */}
        <ButtonRounded
          Icon={CloseIcon}
          onClick={(e) =>
            hdlCloseModalById(
              "change-status-modal",
              setIsModalFadingOut,
              setIsChangeStatusModalOpen
            )
          }
        />
      </div>
      {/* label area */}
      <div className="w-full py-4 px-8 break-words flex gap-1 text-s-red font-bold justify-center items-start max-h-[300px] overflow-y-auto">
        {/* status list */}
        <div className="w-full flex flex-col items-center animate-fade-in-div gap-3">
          {status?.map((el, idx) => (
            <div
              key={idx}
              className={`flex gap-2 h-[25px] w-[150px]  px-4 justify-center items-center rounded-m text-m-light btn-hover ${
                order?.statusId == el?.statusId ? "bg-m-prim" : "bg-m-acct"
              }`}
              onClick={() => hdlChangeStatus(el)}
            >
              <div>{el?.statusId}</div>
              <div>{el?.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChangeStatusModal;
