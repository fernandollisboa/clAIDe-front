import { string, func, bool, object } from "prop-types";
import { useState } from "react";
import { MINIMUM_REQUIRED_AGE, getTodaySubtractYears } from "utils/dateUtil";

import useErrors from "../../hooks/useErrors";
import maskCpf from "../../utils/maskCpf";
import maskPhone from "../../utils/maskPhone";
import removeChar from "../../utils/removeChar";

import { transformDate } from "../../utils/transformDate";
import Form from "components/Form";

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
    lsdEmail: "",
    email: "",
    secondEmail: "",
    memberType: "",
    lattes: "",
    room: "",
    hasKey: "",
    isBrazilian: true,
    ...initialState,
  });

  const {
    name,
    birthDate,
    cpf,
    rg,
    passport,
    email,
    lsdEmail,
    secondaryEmail,
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
        lsdEmail: "",
        email: "",
        secondaryEmail: "",
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
      id: "lsdEmail",
      placeholder: "Email LSD",
      type: "email",
      value: lsdEmail,
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
      id: "secondaryEmail",
      placeholder: "Email secundário",
      value: secondaryEmail,
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
      value: hasKey,
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
      <Form
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
