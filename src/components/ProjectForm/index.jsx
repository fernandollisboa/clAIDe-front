import PropTypes from "prop-types";
import { useState } from "react";

import Form from "components/Form";
import useErrors from "../../hooks/useErrors";
import maskDate from "utils/maskDate";

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
      required: isEditingActiveProject,
      name: isEditingActiveProject ? "Sala *" : "Sala",
      id: "room",
      placeholder: "Sala",
      value: room,
    },
    {
      required: isEditingActiveProject,
      id: "building",
      name: isEditingActiveProject ? "Prédio *" : "Prédio",
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
      required: isEditingActiveProject,
      inputType: "date",
      name: isEditingActiveProject ? "Data de Término *" : "Data de Término",
      id: "endDate",
      onChange: handleEndDateInputChange,
      placeholder: "Data de Término",
      value: endDate,
      minDate: creationDate || "",
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
