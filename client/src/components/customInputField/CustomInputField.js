import React from "react";

function CustomInputField({ onChange, name, placeholder, value }) {
  return (
    <input
      className="custom-input"
      placeholder={placeholder}
      onChange={onChange}
      name={name}
      value={value}
      type="text"
    />
  );
}

export default CustomInputField;
