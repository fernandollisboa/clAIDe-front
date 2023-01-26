import React from "react";
import InputMask from "react-input-mask";

export default function DateInput(props) {
  const { children } = props;
  return (
    <InputMask {...props} mask="99/99/9999" maskChar=" ">
      {children}
    </InputMask>
  );
}
