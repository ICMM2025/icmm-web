import React, { useEffect, useState } from "react";

function Input({
  type,
  size,
  placeholder,
  className,
  disabled = false,
  value,
  onChange,
  name,
  onDebounced,
}) {
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    if (!onDebounced) return;
    if (!value) return;

    const id = setTimeout(() => {
      onDebounced();
    }, 500);

    return () => clearTimeout(id);
  }, [value]);
  return (
    <input
      style={size ? { width: `${size * 50 + 25}px` } : {}}
      type={type}
      className={`h-[25px] border border-m-line/50  rounded-m pl-2 focus:outline-none focus:border-m-line ${
        disabled && "text-t-gray "
      } ${className}`}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      onChange={onChange}
      name={name}
    />
  );
}

export default Input;
