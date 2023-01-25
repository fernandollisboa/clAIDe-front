import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import PropTypes from "prop-types";
import { IoCalendarOutline } from "react-icons/io5";

export default function FormDate({ onChange, minDate = new Date("02-01-1920"), maxDate }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleCalendarVisibility() {
    setIsOpen((state) => !state);
  }
  return (
    <DatePickerWrapper>
      <Img onClick={toggleCalendarVisibility}></Img>
      <Frenando>
        <DatePicker
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={1000}
          className="date"
          onChange={onChange}
          minDate={minDate}
          maxDate={maxDate}
          tabIndex={-1}
        ></DatePicker>
      </Frenando>
    </DatePickerWrapper>
  );
}

FormDate.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.node,
};

const Frenando = styled.div`
  .date {
    flex: wrap;
    border-radius: 2px;
    border: none;
    outline: 0;
    padding: 0 5%;
    font-size: 1rem;
    height: 50px;
    width: 100%;
    z-index: 10;
  }
`;

const Img = styled(IoCalendarOutline)`
  color: black;
  position: absolute;
  pointer-events: none;
  background-color: white;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

export const DatePickerWrapper = styled.div`
  position: relative;
  width: 10%;
`;
