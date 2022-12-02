import PropTypes from "prop-types";
import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";

import arrow from "../../assets/arrow.svg";

import Input from "../Input";
import Button from "../Button";
import Select from "../Select";
import FormGroup from "../FormGroup";

import useErrors from "../../hooks/useErrors";
import maskDate from "../../utils/maskDate";
import maskCpf from "../../utils/maskCpf";
import maskPhone from "../../utils/maskPhone";
import removeChar from "../../utils/removeChar";
import isEmailValid from "../../utils/isEmailValid";

export default function MemberForm({ onSubmit, typeLabel, buttonLabel }) {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [username, setUsername] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [passport, setPassport] = useState("");
  const [phone, setPhone] = useState("");
  const [emailLsd, setEmailLsd] = useState("");
  const [email, setEmail] = useState("");
  const [secondEmail, setSecondEmail] = useState("");
  const [memberType, setMemberType] = useState("");
  const [lattes, setLattes] = useState("");
  const [room, setRoom] = useState("");
  const [hasKey, setHasKey] = useState(false);
  const [isBrazilian, setIsBrazilian] = useState(true);
  const { setError, removeError, getErrorMessageByFieldName, errors } = useErrors();

  const isFormValid =
    name &&
    birthDate &&
    username &&
    phone &&
    emailLsd &&
    memberType &&
    lattes &&
    email &&
    errors.length === 0;

  function handleChangeName(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: "name", message: "Nome é obrigatório" });
    } else {
      removeError("name");
    }
  }
  function handleChangeBirthDate(event) {
    setBirthDate(maskDate(event.target.value));
    if (!event.target.value) {
      setError({ field: "birthDate", message: "Data de nascimento é obrigatório" });
    } else {
      removeError("birthDate");
    }
  }
  function handleChangeUsername(event) {
    setUsername(event.target.value);

    if (!event.target.value) {
      setError({ field: "username", message: "Username é obrigatório" });
    } else {
      removeError("username");
    }
  }
  function handleChangeCpf(event) {
    setCpf(event.target.value);
  }
  function handleChangeRg(event) {
    setRg(event.target.value);
  }
  function handleChangePassport(event) {
    setPassport(event.target.value);
  }
  function handleChangePhone(event) {
    setPhone(event.target.value);
    if (!event.target.value) {
      setError({ field: "phone", message: "Telefone é obrigatório" });
    } else {
      removeError("phone");
    }
  }
  function handleChangeEmailLsd(event) {
    setEmailLsd(event.target.value);
    if (!event.target.value || !isEmailValid(event.target.value)) {
      setError({ field: "emailLsd", message: "Email LSD é invalido" });
    } else {
      removeError("emailLsd");
    }
  }
  function handleChangeEmail(event) {
    setEmail(event.target.value);
    if (!event.target.value || !isEmailValid(event.target.value)) {
      setError({ field: "email", message: "Email é invalido" });
    } else {
      removeError("email");
    }
  }
  function handleChangeSecondEmail(event) {
    setSecondEmail(event.target.value);
    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: "secondEmail", message: "Email secundario é invalido" });
    } else {
      removeError("secondEmail");
    }
  }
  function handleChangeMemberType(event) {
    setMemberType(event.target.value);
    if (!event.target.value) {
      setError({ field: "memberType", message: "Tipo de membro é obrigatório" });
    } else {
      removeError("memberType");
    }
  }
  function handleChangeLattes(event) {
    setLattes(event.target.value);
    if (!event.target.value) {
      setError({ field: "lattes", message: "Lattes é obrigatório" });
    } else {
      removeError("lattes");
    }
  }
  function handleChangeRoom(event) {
    setRoom(event.target.value);
  }
  function handleChangeIsBrazilian(event) {
    setIsBrazilian(event.target.value);
  }
  function handleChangeHasKey(event) {
    setHasKey(event.target.value);
  }
  async function handleSubmit(event) {
    event.preventDefault();

    await onSubmit({
      name,
      birthDate,
      username,
      cpf: removeChar(cpf),
      rg,
      passport,
      phone: removeChar(phone),
      emailLsd,
      email,
      secondEmail,
      memberType,
      lattes,
      room,
      isBrazilian,
      hasKey,
    });
    // setName("");
    // setBirthDate("");
    // setUsername("");
    // setCpf("");
    // setRg("");
    // setPassport("");
    // setPhone("");
    // setEmailLsd("");
    // setEmail("");
    // setSecondEmail("");
    // setMemberType("");
    // setLattes("");
    // setRoom("");
    // setIsBrazilian("");
    // setHasKey("");
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>
          <Link to="/members">
            <img src={arrow} style={{ zIndex: -1 }} alt="voltar" />
            <span>Voltar</span>
          </Link>
          <h1>{typeLabel}</h1>
        </Title>
        <FormGroup error={getErrorMessageByFieldName("name")}>
          <Input placeholder="Nome *" value={name} onChange={handleChangeName} />
        </FormGroup>
        <FormGroup error={getErrorMessageByFieldName("birthDate")}>
          <Input
            placeholder="Data de nascimento *"
            value={birthDate}
            onChange={handleChangeBirthDate}
            type="text"
          />
        </FormGroup>
        <FormGroup error={getErrorMessageByFieldName("username")}>
          <Input placeholder="Username *" value={username} onChange={handleChangeUsername} />
        </FormGroup>
        <FormGroup>
          <Input placeholder="CPF" value={maskCpf(cpf)} onChange={handleChangeCpf} maxLength={14} />
        </FormGroup>
        <FormGroup>
          <Input placeholder="RG" value={rg} onChange={handleChangeRg} />
        </FormGroup>
        <FormGroup>
          <Input placeholder="Passaporte" value={passport} onChange={handleChangePassport} />
        </FormGroup>
        <FormGroup error={getErrorMessageByFieldName("phone")}>
          <Input
            placeholder="Telefone *"
            value={maskPhone(phone)}
            onChange={handleChangePhone}
            maxLength={15}
          />
        </FormGroup>
        <FormGroup error={getErrorMessageByFieldName("emailLsd")}>
          <Input placeholder="Email LSD *" value={emailLsd} onChange={handleChangeEmailLsd} />
        </FormGroup>
        <FormGroup error={getErrorMessageByFieldName("email")}>
          <Input placeholder="Email *" value={email} onChange={handleChangeEmail} />
        </FormGroup>
        <FormGroup error={getErrorMessageByFieldName("secondEmail")}>
          <Input
            placeholder="Email secundario"
            value={secondEmail}
            onChange={handleChangeSecondEmail}
          />
        </FormGroup>
        <FormGroup error={getErrorMessageByFieldName("memberType")}>
          <Select onChange={handleChangeMemberType} value={memberType}>
            <option value=""> Sem tipo </option>
            <option value="STUDENT"> Estudante </option>
            <option value="PROFESSOR"> Professor </option>
            <option value="PROFESSIONAL"> Profissional </option>
            <option value="EXTERNAL"> Externo </option>
            <option value="SUPPORT"> Suporte </option>
          </Select>
        </FormGroup>
        <FormGroup error={getErrorMessageByFieldName("lattes")}>
          <Input placeholder="Lattes *" value={lattes} onChange={handleChangeLattes} />
        </FormGroup>
        <FormGroup>
          <Input placeholder="Sala" value={room} onChange={handleChangeRoom} />
        </FormGroup>
        <FormGroup>
          <Select onChange={handleChangeIsBrazilian} value={isBrazilian}>
            <option value={true}> Brasileiro </option>
            <option value={false}> Estrangeiro </option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Select onChange={handleChangeHasKey} value={hasKey}>
            <option value={false}> Não tem a chave </option>
            <option value={true}> Tem a chave </option>
          </Select>
        </FormGroup>
        <Button type="submit" disabled={!isFormValid}>
          {buttonLabel}
        </Button>
      </Form>
    </Container>
  );
}
MemberForm.propTypes = {
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
      color: #5061fc;
      font-weight: bold;
    }
  }
  h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 3%;
  }
`;
