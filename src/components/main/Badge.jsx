import React from "react";

function Badge({
  Icon,
  className = "",
  isAcct = false,
  isDisabled = false,
  size = "s",
}) {
  return (
    <div
      style={
        size === "m"
          ? { width: "25px", height: "25px" }
          : { width: "20px", height: "20px" }
      }
      className={`rounded-m flex justify-center items-center ${
        isDisabled
          ? "bg-m-light text-m-gray"
          : isAcct
          ? "bg-m-light text-m-acct"
          : "bg-m-light text-m-prim"
      } ${className}`}
    >
      {Icon && (
        <Icon
          style={
            size === "m"
              ? { wWidth: "18px", height: "18px" }
              : { width: "15px", height: "15px" }
          }
        />
      )}
    </div>
  );
}

export default Badge;
