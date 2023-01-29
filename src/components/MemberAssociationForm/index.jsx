import { useState } from "react";

import parseDateBrToISO from "utils/parseDateBrToISO";
//TODO maskdate
import maskDate from "utils/maskDate";
import useErrors from "hooks/useErrors";
import Form from "components/Form";

export default function MemberAssociationForm({
  onSubmit,
  typeLabel,
  formSent,
  initialState = {},
  incomingErrors = false,
  ...rest
}) {
  const { setError, removeError, errors } = useErrors();

  const [projectAssociationData, setProjectAssociationData] = useState({
    startDate: "",
    endDate: "",
    ...initialState,
  });
  const { startDate, endDate } = projectAssociationData;

  function handleDateInputChange({ id, value, name }) {
    setProjectAssociationData((state) => ({ ...state, [id]: maskDate(value) }));
    // if (!parseDateBrToISO(value)) setError({ field: id, message: `Data inválida (${name})` });
    // else removeError({ field: id });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    await onSubmit({
      startDate: parseDateBrToISO(startDate),
      endDate: parseDateBrToISO(endDate),
    });

    if (formSent) {
      setProjectAssociationData({
        startDate: "",
        endDate: "",
        ...initialState,
      });
    }
  }

  const inputs = [
    {
      required: true,
      inputType: "date",
      name: "Data de início",
      id: "startDate",
      placeholder: "Data de início *",
      onChange: (value) => handleDateInputChange({ value, id: "startDate", name: "startDate" }),
      value: startDate,
    },
    {
      required: false,
      inputType: "date",
      name: "Data de fim",
      id: "endDate",
      placeholder: "Data de fim *",
      onChange: (value) => handleDateInputChange({ value, id: "endDate", name: "endDate" }),
      value: endDate,
    },
  ];
  const isFormValid =
    inputs.filter(({ required }) => required).every(({ value }) => value) && !errors.length;

  return (
    <>
      <Form
        isFormValid={isFormValid}
        handleSubmit={handleSubmit}
        inputs={inputs}
        setInputValues={setProjectAssociationData}
        buttonLabel="Enviar"
        typeLabel={typeLabel}
        incomingErrors={incomingErrors}
        height={"25vh"}
        maxWidth="90%"
        {...rest}
      />
    </>
  );
}
