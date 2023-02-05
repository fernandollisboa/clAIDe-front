import PropTypes from "prop-types";
import { useState } from "react";

import Form from "components/Form";
import useErrors from "../../hooks/useErrors";
import maskDate from "utils/maskDate";
import parseDateBrToISO from "utils/parseDateBrToISO";

// isEditingActiveProjeto NAO QUER DIZER isso, na verdade deveria ser isEditingProject
export default function ProjectForm({
  onSubmit,
  typeLabel,
  buttonLabel,
  formSent,
  maxWidth,
  initialState = {},
  incomingErrors = false,
  isEditingActiveProject = false,
  ...rest
}) {
  const { setError, removeError, errors } = useErrors();
  const [projectData, setProjectData] = useState({
    name: "",
    creationDate: "",
    endDate: "",
    room: "",
    building: "",
    embrapiiCode: "",
    financier: "",
    ...initialState,
  });
  const { name, creationDate, endDate, room, building, embrapiiCode, financier } = projectData;

  async function handleSubmit() {
    await onSubmit({
      name,
      creationDate: parseDateBrToISO(creationDate),
      endDate: parseDateBrToISO(endDate),
      room,
      building,
      embrapiiCode,
      financier,
    });

    if (formSent) {
      setProjectData({
        name: "",
        creationDate: "",
        endDate: "",
        room: "",
        building: "",
        embrapiiCode: "",
        financier: "",
      });
    }
  }

  function handleCreationDateInputChange(creationDate) {
    setProjectData((state) => {
      return { ...state, creationDate: maskDate(creationDate) };
    });

    if (!creationDate)
      setError({ field: "creationDate", message: `Data de Criação é obrigatória` });
    else removeError("creationDate");
  }
  function handleEndDateInputChange(endDate) {
    setProjectData((state) => {
      return { ...state, endDate: maskDate(endDate) };
    });

    if (!endDate) setError({ field: "endDate", message: `Data de Término é obrigatório` });
    else removeError("endDate");
  }
  const inputs = [
    { required: true, name: "Nome", id: "name", placeholder: "Nome *", value: name },
    {
      inputType: "date",
      name: "Data de Criação",
      id: "creationDate",
      required: true,
      placeholder: "Data de Criação *",
      onChange: handleCreationDateInputChange,
      value: creationDate,
      maxDate: endDate || "",
    },

    {
      name: "Sala",
      id: "room",
      placeholder: "Sala",
      value: room,
    },
    {
      id: "building",
      name: "Prédio",
      placeholder: "Prédio",
      value: building,
    },
    {
      name: "Código Embrapii",
      id: "embrapiiCode",
      placeholder: "Codigo Embrapii ",
      value: embrapiiCode,
    },
    { name: "Financiador", id: "financier", placeholder: "Financiador", value: financier },
    {
      required: false,
      inputType: "date",
      name: isEditingActiveProject ? "Data de Término *" : "Data de Término",
      id: "endDate",
      onChange: handleEndDateInputChange,
      placeholder: "Data de Término",
      value: endDate,
      minDate: creationDate || "",
    },
  ];

  //TODO refatorar formvalid como função
  const isFormValid =
    inputs.filter(({ required }) => required).every(({ value }) => value) &&
    parseDateBrToISO(creationDate) &&
    (!isEditingActiveProject || parseDateBrToISO(endDate)) &&
    !errors.length;

  return (
    <>
      <Form
        isFormValid={isFormValid}
        handleSubmit={handleSubmit}
        inputs={inputs}
        setInputValues={setProjectData}
        buttonLabel={buttonLabel}
        typeLabel={typeLabel}
        maxWidth={maxWidth}
        incomingErrors={incomingErrors}
        {...rest}
      />
    </>
  );
}
ProjectForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  typeLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  formSent: PropTypes.bool.isRequired,
};
