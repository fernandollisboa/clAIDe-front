import { string, func, bool, object } from "prop-types";
import { useState, useEffect, useMemo } from "react";

import { MINIMUM_REQUIRED_AGE, getTodaySubtractYears } from "utils/dateUtil";
import useErrors from "../../hooks/useErrors";
import maskCpf from "../../utils/maskCpf";
import maskPhone from "../../utils/maskPhone";
import removeChar from "../../utils/removeChar";
import Form from "components/Form";
import maskDate from "utils/maskDate";
import parseDateBrToISO from "utils/parseDateBrToISO";

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
  incomingErrors = false,
  initialState = {},
  ...rest
}) {
  const { setError, removeError, errors } = useErrors();
  const [memberData, setMemberData] = useState({
    name: "",
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
    roomName: "",
    ...initialState,
    birthDate: maskDate(initialState?.birthDate),
    isBrazilian: initialState?.isBrazilian ?? 1,
    hasKey: initialState?.hasKey ?? 0,
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
    roomName,
    hasKey,
  } = memberData;
  function handleBirthDateInputChange(birthDate) {
    setMemberData((state) => ({ ...state, birthDate: maskDate(birthDate) }));

    if (!birthDate) setError({ field: "birthDate", message: `Data de Aniversário é obrigatório` });
    else removeError("birthDate");
  }

  const getIsBrazilian = useMemo(() => !!Number(isBrazilian), [isBrazilian]);

  async function handleSubmit(event) {
    event.preventDefault();

    await onSubmit({
      ...memberData,
      birthDate: parseDateBrToISO(birthDate),
      cpf: removeChar(cpf),
      phone: removeChar(phone),
      isBrazilian: !!Number(isBrazilian),
      hasKey: !!Number(hasKey),
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
        roomName: "",
        hasKey: false,
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
      maxDate: getTodaySubtractYears(MINIMUM_REQUIRED_AGE),
    },
    {
      required: true,
      name: "Username",
      id: "username",
      placeholder: "Username *",
      value: username,
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
      required: true,
      name: "Telefone",
      id: "phone",
      placeholder: "Telefone *",
      value: maskPhone(phone),
      maxLength: 15,
    },
    {
      inputType: "select",
      required: true,
      name: "Tipo de Membro",
      id: "memberType",
      value: memberType,
      options: [
        { value: "", label: "Tipo de Membro" },
        { value: "STUDENT", label: "Estudante" },
        { value: "PROFESSOR", label: "Professor" },
        { value: "EXTERNAL", label: "Externo" },
        { value: "SUPPORT", label: "Suporte" },
        { value: "ADMIN", label: "Administrador" },
      ],
    },
    {
      id: "lattes",
      name: "Lattes",
      placeholder: "Lattes",
      value: lattes,
    },
    {
      id: "roomName",
      name: "Sala",
      placeholder: "Sala",
      value: roomName,
    },
    {
      inputType: "select",
      name: "Possui a chave da sala?",
      id: "hasKey",
      value: hasKey,
      options: [
        { value: 0, label: " Não tem a chave da sala" },
        { value: 1, label: " Tem a chave da sala ", selected: true },
      ],
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
      inputType: "select",
      name: "Nacionalidade",
      id: "isBrazilian",
      value: getIsBrazilian ? 1 : 0,
      options: [
        { value: 1, label: " Brasileiro " },
        { value: 0, label: " Estrangeiro " },
      ],
    },
    {
      required: getIsBrazilian,
      placeholder: getIsBrazilian ? "CPF * " : "CPF",
      name: "CPF",
      id: "cpf",
      value: maskCpf(cpf),
      maxLength: 14,
      minLength: 14,
    },
    {
      required: getIsBrazilian,
      name: "RG",
      id: "rg",
      placeholder: getIsBrazilian ? "RG * " : "RG",
      value: rg,
    },
    {
      required: !getIsBrazilian,
      name: "Passaporte",
      id: "passport",
      placeholder: !getIsBrazilian ? "Passaporte *" : "Passaporte",
      value: passport,
    },
    {
      name: "Email secundário",
      id: "secondaryEmail",
      placeholder: "Email Secundário",
      value: secondaryEmail,
      type: "email",
    },
  ];

  useEffect(() => {
    ["passport", "rg", "cpf"].forEach(removeError);
  }, [isBrazilian]);

  const isFormValid =
    inputs.filter(({ required }) => required).every(({ value }) => value) &&
    parseDateBrToISO(birthDate) &&
    !errors.length;

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
        isBrazilian={isBrazilian}
        incomingErrors={incomingErrors}
        {...rest}
      />
    </>
  );
}
