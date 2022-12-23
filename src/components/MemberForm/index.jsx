import { string, func, bool, object } from "prop-types";
import { useState, useEffect } from "react";
import { MINIMUM_REQUIRED_AGE, getTodaySubtractYears } from "utils/dateUtil";

import useErrors from "../../hooks/useErrors";
import maskCpf from "../../utils/maskCpf";
import maskPhone from "../../utils/maskPhone";
import removeChar from "../../utils/removeChar";
import isEmailValid from "../../utils/isEmailValid";
import isLsdEmailValid from "../../utils/isLsdEmailValid";

import { transformDate } from "../../utils/transformDate";
import StyledForm from "components/Form";

MemberForm.propTypes = {
  buttonLabel: string.isRequired,
  typeLabel: string.isRequired,
  onSubmit: func.isRequired,
  formSent: bool.isRequired,
  initialState: object,
  maxWidth: string,
};
export default function MemberForm({
  onSubmit,
  typeLabel,
  buttonLabel,
  formSent,
  maxWidth,
  initialState = {},
  ...rest
}) {
  const { setError, removeError, errors } = useErrors();
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
    if (initialState) setMemberData({ ...initialState });
  }, [initialState]);

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

    console.log(event);

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

  const inputs = [
    {
      required: true,
      placeholder: "Nome *",
      name: "Nome",
      id: "name",
      value: name,
    },
    {
      required: true,
      inputType: "date",
      name: "Data de nascimento",
      id: "birthDate",
      placeholder: "Data de nascimento *",
      onChange: handleBirthDateInputChange,
      value: birthDate,
      endDate: getTodaySubtractYears(MINIMUM_REQUIRED_AGE),
    },
    {
      required: true,
      name: "Username",
      id: "username",
      placeholder: "Username *",
      value: username,
    },
    {
      placeholder: "CPF",
      name: "CPF",
      id: "cpf",
      value: maskCpf(cpf),
      maxLength: 14,
    },
    { name: "rg", id: "rg", placeholder: "RG", value: rg },
    {
      name: "Passaporte",
      id: "passport",
      placeholder: "Passaporte",
      value: passport,
    },
    {
      required: true,
      name: "Telefone",
      id: "phone",
      placeholder: "Telefone *",
      value: maskPhone(phone),
      maxLength: 15,
    },
    {
      required: false,
      name: "Email LSD",
      id: "emailLsd",
      placeholder: "Email LSD",
      type: "email",
      value: emailLsd,
    },
    {
      required: true,
      name: "Email",
      id: "email",
      placeholder: "Email *",
      value: email,
      type: "email",
    },
    {
      name: "Email secundário",
      id: "secondEmail",
      placeholder: "Email secundário",
      value: secondEmail,
      type: "email",
    },
    {
      inputType: "select",
      required: true,
      name: "Tipo de Membro",
      id: "memberType",
      value: memberType,
      options: [
        { value: "", label: " Sem tipo " },
        { value: "STUDENT", label: " Estudante " },
        { value: "PROFESSOR", label: " Professor " },
        { value: "EXTERNAL", label: " Externo " },
        { value: "SUPPORT", label: " Suporte " },
        { value: "ADMIN", label: " Administrador " },
      ],
    },
    {
      required: false,
      id: "lattes",
      name: "Lattes",
      placeholder: "Lattes",
      value: lattes,
    },
    {
      id: "room",
      name: "Sala",
      placeholder: "Sala",
      value: room,
    },
    {
      inputType: "select",
      required: true,
      name: "Possui a chave da sala?",
      id: "hasKey",
      value: { hasKey },
      options: [
        { value: 1, label: " Tem a chave da sala " },
        { value: 0, label: " Não tem a chave da sala" },
      ],
    },
    {
      inputType: "select",
      required: true,
      name: "Nacionalidade",
      id: "isBrazilian",
      value: isBrazilian,
      options: [
        { value: 1, label: " Brasileiro " },
        { value: 0, label: " Estrangeiro " },
      ],
    },
  ];
  return (
    <>
      <StyledForm
        isFormValid={isFormValid}
        handleSubmit={handleSubmit}
        inputs={inputs}
        setInputValues={setMemberData}
        buttonLabel={buttonLabel}
        typeLabel={typeLabel}
        maxWidth={maxWidth}
        {...rest}
      />
    </>

  );
}
