import PropTypes from "prop-types";
import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";

import arrow from "../../assets/arrow.svg";

import Input from "../Input";
import Button from "../Button";
import FormGroup from "../FormGroup";

import useErrors from "../../hooks/useErrors";
import maskDate from "../../utils/maskDate";

export default function ProjectForm({ onSubmit, typeLabel, buttonLabel }) {
  const [name, setName] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [room, setRoom] = useState("");
  const [building, setBuilding] = useState("");
  const [embrapiiCode, setEmbrapiiCode] = useState("");
  const [financier, setFinancier] = useState("");
  const { setError, removeError, getErrorMessageByFieldName, errors } = useErrors();

  const isFormValid = name && creationDate && errors.length === 0;
  function handleChangeName(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: "name", message: "Nome é obrigatório" });
    } else {
      removeError("name");
    }
  }
  function handleChangeCreationDate(event) {
    setCreationDate(maskDate(event.target.value));
    if (!event.target.value) {
      setError({ field: "creationDate", message: "Data de criação é obrigatório" });
    } else {
      removeError("creationDate");
    }
  }
  function handleChangeEndDate(event) {
    setEndDate(maskDate(event.target.value));
  }
  function handleChangeRoom(event) {
    setRoom(event.target.value);
  }
  function handleChangeBuilding(event) {
    setBuilding(event.target.value);
  }
  function handleChangeEmbrapiiCode(event) {
    setEmbrapiiCode(event.target.value);
  }
  function handleChangeFinancier(event) {
    setFinancier(event.target.value);
  }
  async function handleSubmit(event) {
    event.preventDefault();

    await onSubmit({
      name,
      creationDate,
      endDate,
      room,
      building,
      embrapiiCode,
      financier,
    });
    setName("");
    setCreationDate("");
    setEndDate("");
    setRoom("");
    setBuilding("");
    setEmbrapiiCode("");
    setFinancier("");
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>
          <Link to="/projects">
            <img src={arrow} alt="voltar" />
            <span>Voltar</span>
          </Link>
          <h1>{typeLabel}</h1>
        </Title>
        <FormGroup error={getErrorMessageByFieldName("name")}>
          <Input placeholder="Nome *" value={name} onChange={handleChangeName} />
        </FormGroup>
        <FormGroup error={getErrorMessageByFieldName("creationDate")}>
          <Input
            placeholder="Data de criação *"
            value={creationDate}
            onChange={handleChangeCreationDate}
            type="text"
            onfocus="(this.type='date')"
          />
        </FormGroup>
        <FormGroup>
          <Input placeholder="Data de término" value={endDate} onChange={handleChangeEndDate} />
        </FormGroup>
        <FormGroup>
          <Input placeholder="Sala" value={room} onChange={handleChangeRoom} />
        </FormGroup>
        <FormGroup>
          <Input placeholder="Predio" value={building} onChange={handleChangeBuilding} />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="Codigo embrapii "
            value={embrapiiCode}
            onChange={handleChangeEmbrapiiCode}
          />
        </FormGroup>
        <FormGroup>
          <Input placeholder="Financiador" value={financier} onChange={handleChangeFinancier} />
        </FormGroup>
        <Button type="submit" disabled={!isFormValid}>
          {buttonLabel}
        </Button>
      </Form>
    </Container>
  );
}
ProjectForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  typeLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
const Container = styled.div`
  width: 100%;
  display: block;
  align-items: center;
`;
const Form = styled.form`
  max-width: 500px;
  margin: 0 auto;
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
