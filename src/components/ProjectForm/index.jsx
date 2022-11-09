import styled from "styled-components";
import { useState } from "react";
import PropTypes from "prop-types";
import Input from "../Input";
import Button from "../Button";
import logoLsd from "../../assets/foto_lsd.svg";
import arrow from "../../assets/arrow.svg";
import { Link } from "react-router-dom";

export default function ProjectForm({ typeLabel, buttonLabel }) {
  const [name, setName] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [room, setRoom] = useState("");
  const [building, setBuilding] = useState("");
  const [embrapiiCode, setEmbrapiiCode] = useState("");
  const [financier, setFinancier] = useState("");

  function handleChangeName(event) {
    setName(event.target.value);
  }
  function handleChangeCreationDate(event) {
    setCreationDate(event.target.value);
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
  return (
    <Container>
      <div className="logo">
        <img src={logoLsd} alt="Logo lsd" width="345" />
      </div>
      <Form>
        <Header>
          <Link to="/">
            <img src={arrow} alt="voltars" />
            <span>Voltar</span>
          </Link>
          <h1>{typeLabel}</h1>
        </Header>
        <Input placeholder="Nome" value={name} onChange={handleChangeName} />
        <Input
          placeholder="Data de criação"
          value={creationDate}
          onChange={handleChangeCreationDate}
        />
        <Input placeholder="Data de término" value={endDate} onChange={handleChangeEndDate} />
        <Input placeholder="Sala" value={room} onChange={handleChangeRoom} />
        <Input placeholder="Predio" value={building} onChange={handleChangeBuilding} />
        <Input
          placeholder="Codigo embrapii "
          value={embrapiiCode}
          onChange={handleChangeEmbrapiiCode}
        />
        <Input placeholder="Financeiro" value={financier} onChange={handleChangeFinancier} />
        <Button>{buttonLabel}</Button>
      </Form>
      <Footer />
    </Container>
  );
}
ProjectForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  typeLabel: PropTypes.string.isRequired,
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
const Footer = styled.div`
  width: 100%;
  height: 100px1;
  background: blue;
`;
