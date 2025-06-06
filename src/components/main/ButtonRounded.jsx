import React from "react";

function ButtonRounded({
  onClick,
  Icon,
  className,
  isAcct = false,
  isDisabled = false,
}) {
  return (
    <div
      className={`w-[25px] h-[25px] rounded-m shadow-m-s flex justify-center items-center ${
        isDisabled
          ? " bg-m-gray text-m-light  btn-hover-dis pointer-events-none"
          : isAcct
          ? "  bg-m-acct text-m-light btn-hover"
          : " bg-m-prim text-m-light btn-hover"
      } ${className}`}
      onClick={isDisabled ? undefined : onClick}
    >
      <Icon className="w-[18px] h-[18px]" />
    </div>
  );
}

export default ButtonRounded;
