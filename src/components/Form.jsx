import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import arrow from "../assets/arrow.svg";
import FormGroup from "components/FormGroup";
import FormDate from "components/FormDate";
import Input from "components/Input";
import Button from "components/Button";
import useErrors from "hooks/useErrors";
import Select from "components/Select";

export default function Form({
  isFormValid,
  handleSubmit,
  inputs,
  setInputValues,
  buttonLabel,
  typeLabel,
  onReturnNavigate,
  maxWidth,
}) {
  const { setError, removeError, getErrorMessageByFieldName } = useErrors();

  function handleInputChange(event) {
    const { id, name, value, required } = event.target;

    setInputValues((state) => {
      return { ...state, [id]: value };
    });

    if (required) {
      if (!value) setError({ field: id, message: `${name} é obrigatório` });
      else removeError(id);
    }
  }

  const navigate = useNavigate();

  function handleNavigationReturn() {
    if (onReturnNavigate) onReturnNavigate();
    else navigate(-1);
  }

  return (
    <>
      <FormWrapper onSubmit={handleSubmit} maxWidth={maxWidth}>
        <Title>
          <Link onClick={handleNavigationReturn}>
            <img src={arrow} alt="voltar" />
            <span>Voltar</span>
          </Link>
          <h1>{typeLabel}</h1>
        </Title>
        <InputsContainer>
          {inputs.map(
            ({
              required = false,
              placeholder,
              name,
              id,
              value,
              type = "text",
              inputType,
              onChange = handleInputChange,
              maxLength,
              ...rest
            }) => {
              if (inputType === "select") {
                const { options } = { ...rest };

                return (
                  <FormGroup key={id} error={getErrorMessageByFieldName(id)}>
                    <Select id={id} onChange={onChange} value={value}>
                      {options.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </Select>
                  </FormGroup>
                );
              } else if (inputType === "date") {
                const { startDate, endDate } = { ...rest };
                return (
                  <FormGroup key={id} error={getErrorMessageByFieldName(id)}>
                    <FormDate
                      placeholder={placeholder}
                      onChange={onChange}
                      value={value}
                      minDate={startDate}
                      maxDate={endDate}
                    />
                  </FormGroup>
                );
              } else {
                return (
                  <FormGroup key={id} error={getErrorMessageByFieldName(id)}>
                    <Input
                      required={!!required}
                      placeholder={placeholder}
                      name={name}
                      id={id}
                      value={value}
                      onChange={onChange}
                      maxLength={maxLength}
                      type={type}
                    />
                  </FormGroup>
                );
              }
            }
          )}
        </InputsContainer>
        <Button type="submit" disabled={!isFormValid}>
          {buttonLabel}
        </Button>
      </FormWrapper>
    </>
  );
}

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 700px;
  flex-wrap: wrap;
`;
const FormWrapper = styled.form`
  max-width: ${({ maxWidth }) => maxWidth || "60%"};
  margin: 0 auto;

  .birthDate {
    background: #fff;
    border: none;
    border: 2px solid #fff;
    height: 52px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    border-radius: 4px;
    border: 0 none;
    outline: 0;
    padding: 0 5%;
    font-size: 1rem;
    transition: border-color 0.2s ease-in;
    appearance: none;
  }
`;
const Title = styled.div`
  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    margin-bottom: 1%;
    img {
      margin-right: 1.5%;
      transform: rotate(-90deg);
    }
    span {
      color: #131313;
      font-weight: bold;
    }
  }
  h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 3%;
  }
`;
