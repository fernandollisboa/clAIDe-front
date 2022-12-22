import PropTypes from "prop-types";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import arrow from "../../assets/arrow.svg";

import Input from "../Input";
import Button from "../Button";
import Select from "../Select";
import FormGroup from "../FormGroup";
import FormDate from "../FormDate";

import useErrors from "../../hooks/useErrors";
import maskCpf from "../../utils/maskCpf";
import maskPhone from "../../utils/maskPhone";
import removeChar from "../../utils/removeChar";
import { transformDate } from "../../utils/transformDate";

MemberForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  typeLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  formSent: PropTypes.bool.isRequired,
  initialState: PropTypes.object,
};
export default function MemberForm({
  onSubmit,
  typeLabel,
  buttonLabel,
  formSent,
  initialState = {},
}) {
  const { setError, removeError, getErrorMessageByFieldName, errors } = useErrors();
  const [memberData, setMemberData] = useState({
    name: "",
    birthDate: "",
    username: "",
    cpf: "",
    rg: "",
    passport: "",
    phone: "",
    emailLsd: "",
    email: "",
    secondEmail: "",
    memberType: "",
    lattes: "",
    room: "",
    hasKey: "",
    isBrazilian: true,
  });

  useEffect(() => {
    if (initialState) {
      console.log(initialState);
    }
  }, []);

  const {
    name,
    birthDate,
    cpf,
    rg,
    passport,
    email,
    emailLsd,
    secondEmail,
    lattes,
    isBrazilian,
    username,
    phone,
    memberType,
    room,
    hasKey,
  } = memberData;

  function handleInputChange(event) {
    console.log(event.target);
    const { id: field, name, value, required } = event.target;

    setMemberData((state) => {
      return { ...state, [field]: value };
    });

    if (required) {
      if (!value) setError({ field, message: `${name} é obrigatório` });
      else removeError(field);
    }
  }

  function handleBirthDateInputChange(birthDate) {
    setMemberData((state) => {
      return { ...state, birthDate };
    });

    if (!birthDate) setError({ field: "birthDate", message: `Data de Aniversário é obrigatório` });
    else removeError("birthDate");
  }

  const isFormValid =
    name && birthDate && username && phone && memberType && email && !errors.length;

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(memberData);

    await onSubmit({
      ...memberData,
      birthDate: transformDate(birthDate),
      cpf: removeChar(cpf),
      phone: removeChar(phone),
      isBrazilian: !!isBrazilian,
      hasKey: !!hasKey,
    });

    if (formSent) {
      setMemberData({
        name: "",
        birthDate: "",
        username: "",
        cpf: "",
        rg: "",
        passport: "",
        phone: "",
        emailLsd: "",
        email: "",
        secondEmail: "",
        memberType: "",
        lattes: "",
        room: "",
        hasKey: "",
        isBrazilian: true,
      });
    }
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
          <Input
            required
            placeholder="Nome *"
            name="Nome"
            id="name"
            value={name}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <FormDate
            required
            name="Data de nascimento"
            id="birthDate"
            placeholder="Data de nascimento *"
            onChange={handleBirthDateInputChange}
            value={birthDate}
          />
        </FormGroup>
        <FormGroup error={getErrorMessageByFieldName("username")}>
          <Input
            required
            name="Username"
            id="username"
            placeholder="Username *"
            value={username}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="CPF"
            name="CPF"
            id="cpf"
            value={maskCpf(cpf)}
            onChange={handleInputChange}
            maxLength={14}
          />
        </FormGroup>
        <FormGroup>
          <Input name="rg" id="rg" placeholder="RG" value={rg} onChange={handleInputChange} />
        </FormGroup>
        <FormGroup>
          <Input
            name="Passaporte"
            id="passport"
            placeholder="Passaporte"
            value={passport}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup error={getErrorMessageByFieldName("phone")}>
          <Input
            required
            name="Telefone"
            id="phone"
            placeholder="Telefone *"
            value={maskPhone(phone)}
            onChange={handleInputChange}
            maxLength={15}
          />
        </FormGroup>
        <FormGroup error={getErrorMessageByFieldName("emailLsd")}>
          <Input
            required
            name="Email LSD"
            id="emailLsd"
            placeholder="Email LSD *"
            type="email"
            value={emailLsd}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup error={getErrorMessageByFieldName("email")}>
          <Input
            required
            name="Email"
            id="email"
            placeholder="Email *"
            value={email}
            type="email"
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup error={getErrorMessageByFieldName("secondEmail")}>
          <Input
            required
            name="Email secundário"
            id="secondEmail"
            placeholder="Email secundário"
            value={secondEmail}
            type="email"
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup error={getErrorMessageByFieldName("memberType")}>
          <Select
            required
            name="Tipo de Membro"
            id="memberType"
            onChange={handleInputChange}
            value={memberType}
          >
            <option value=""> Sem tipo </option>
            <option value="STUDENT"> Estudante </option>
            <option value="PROFESSOR"> Professor </option>
            <option value="EXTERNAL"> Externo </option>
            <option value="SUPPORT"> Suporte </option>
            <option value="ADMIN"> Administrador </option>
          </Select>
        </FormGroup>
        <FormGroup error={getErrorMessageByFieldName("lattes")}>
          <Input
            id="lattes"
            name="Lattes"
            placeholder="Lattes"
            value={lattes}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            id="room"
            name="Sala"
            placeholder="Sala"
            value={room}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Select
            required
            name="Nacionalidade"
            id="isBrazilian"
            onChange={handleInputChange}
            value={isBrazilian}
          >
            <option value={1}> Brasileiro </option>
            <option value={0}> Estrangeiro </option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Select id="hasKey" onChange={handleInputChange} value={hasKey}>
            <option value={0}> Não tem a chave </option>
            <option value={1}> Tem a chave </option>
          </Select>
        </FormGroup>
        <Button type="submit" disabled={!isFormValid}>
          {buttonLabel}
        </Button>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: block;
  align-items: center;
`;
const Form = styled.form`
  max-width: 500px;
  margin: 0 auto;
  .birthDate {
    width: 100%;
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
