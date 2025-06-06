import React from "react";

function ModalContainer({ id, children }) {
  return (
    <dialog
      id={id}
      className="modal backdrop:bg-black/10 backdrop:backdrop-blur-[2px]"
    >
      {children}
    </dialog>
  );
}

export default ModalContainer;
