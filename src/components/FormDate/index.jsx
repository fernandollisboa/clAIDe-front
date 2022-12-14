import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import PropTypes from "prop-types";
import { transformDate } from "../../utils/transformDate";

export default function FormDate({ placeholder, onChange, value }) {
  return (
    <Container>
      <DatePicker
        showYearDropdown
        yearDropdownItemNumber={1000}
        scrollableYearDropdown
        placeholderText={placeholder}
        className="date"
        onChange={onChange}
        value={transformDate(value)}
      />
    </Container>
  );
}

FormDate.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.node.isRequired,
};

export const Container = styled.div`
  .date {
    width: 100%;
    height: 52px;
    border: none;
    outline: 0;
    padding: 0 5%;
    font-size: 1rem;
  }
`;
