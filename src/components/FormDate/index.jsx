import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import PropTypes from "prop-types";
import { IoCalendarOutline } from "react-icons/io5";

export default function FormDate({ onChange, minDate, maxDate, value }) {
  return (
    <DatePickerWrapper>
      <Img />
      <HiddenDatePickerWrapper>
        <DatePicker
          peekNextMonth
          showYearDropdown
          showMonthDropdown
          yearDropdownItemNumber={20}
          className="date"
          onChange={onChange}
          tabIndex={-1}
          minDate={minDate}
          maxDate={maxDate}
        ></DatePicker>
      </HiddenDatePickerWrapper>
    </DatePickerWrapper>
  );
}

FormDate.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.node,
};

const HiddenDatePickerWrapper = styled.div`
  .date {
    flex: wrap;
    border-radius: 2px;
    border: none;
    outline: 0;
    padding: 0 5%;
    font-size: 1rem;
    height: 50px;
    width: 100%;
    cursor: pointer;
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
