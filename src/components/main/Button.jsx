import React from "react";
import Badge from "./Badge";

function Button({
  onClick,
  lbl,
  size,
  Icon,
  className,
  isAcct = false,
  isDisabled = false,
}) {
  return (
    <div
      name={name}
      style={size ? { width: `${size * 50 + 25}px` } : {}}
      className={` h-[25px] rounded-m flex justify-start items-center font-bold shadow-m-s relative px-[2.5px] gap-1 ${
        isDisabled
          ? " bg-m-gray btn-hover-dis pointer-events-none"
          : isAcct
          ? " bg-m-acct btn-hover"
          : " bg-m-prim btn-hover"
      } ${!size && "pr-2"} ${className}`}
      onClick={isDisabled ? undefined : onClick}
    >
      {Icon && <Badge Icon={Icon} isAcct={isAcct} isDisabled={isDisabled} />}
      <p
        className={` text-center flex-grow ${
          isDisabled ? "text-m-light" : isAcct ? "text-m-light" : "text-m-light"
        }`}
      >
        {lbl}
      </p>
    </div>
  );
}

export default Button;
