import styled from "styled-components";
import { useState } from "react";
import PropTypes from "prop-types";
import Input from "../Input";
import Button from "../Button";
import logoLsd from "../../assets/foto_lsd.svg";
import arrow from "../../assets/arrow.svg";
import { Link } from "react-router-dom";
import useErrors from "../../hooks/useErrors";
import FormGroup from "../FormGroup";

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
    setCreationDate(event.target.value);
    if (!event.target.value) {
      setError({ field: "creationDate", message: "Data de criação é obrigatório" });
    } else {
      removeError("creationDate");
    }
  }
  function handleChangeEndDate(event) {
    setEndDate(event.target.value);
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
  }
  return (
    <Container>
      <div className="logo">
        <img src={logoLsd} alt="Logo lsd" width="345" />
      </div>
      <Form onSubmit={handleSubmit}>
        <Header>
          <Link to="/">
            <img src={arrow} alt="voltars" />
            <span>Voltar</span>
          </Link>
          <h1>{typeLabel}</h1>
        </Header>
        <FormGroup error={getErrorMessageByFieldName("name")}>
          <Input placeholder="Nome" value={name} onChange={handleChangeName} />
        </FormGroup>
        <FormGroup error={getErrorMessageByFieldName("creationDate")}>
          <Input
            placeholder="Data de criação"
            value={creationDate}
            onChange={handleChangeCreationDate}
            datatype="dd/mm/yyyy"
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
          <Input placeholder="Financeiro" value={financier} onChange={handleChangeFinancier} />
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
  .logo {
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }
`;
const Form = styled.form`
  max-width: 500px;
  margin: 0 auto;
`;
const Header = styled.div`
  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    img {
      margin-right: 8px;
      transform: rotate(-90deg);
    }
    span {
      color: #5061fc;
      font-weight: bold;
    }
  }
  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 15px;
  }
`;
