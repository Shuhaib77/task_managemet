import React from "react";

function Input({
  type,
  placeholder,
  handlechange,
  handleblur,
  value,
  name,
}) {
  const baseStyle = "border p-3 w-full";
  return (
    <input
      name={name}
      value={value}
      onBlur={handleblur}
      onChange={handlechange}
      type={type}
      placeholder={placeholder}
      className={`${baseStyle}`}
    ></input>
  );
}

export default Input;