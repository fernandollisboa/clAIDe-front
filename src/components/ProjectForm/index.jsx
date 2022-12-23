import PropTypes from "prop-types";
import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";

import arrow from "../../assets/arrow.svg";

import Input from "../Input";
import Button from "../Button";
import FormGroup from "../FormGroup";
import FormDate from "../FormDate";
import Form from "components/Form";

import useErrors from "../../hooks/useErrors";
import { transformDate } from "../../utils/transformDate";

export default function ProjectForm({
  onSubmit,
  typeLabel,
  buttonLabel,
  formSent,
  maxWidth,
  initialState = {},
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

  const isFormValid = name && creationDate && !errors.length;

  async function handleSubmit(event) {
    event.preventDefault();

    await onSubmit({
      name,
      creationDate: transformDate(creationDate),
      endDate: transformDate(endDate),
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
      return { ...state, creationDate };
    });

    if (!creationDate)
      setError({ field: "creationDate", message: `Data de Criação é obrigatório` });
    else removeError("creationDate");
  }
  function handleEndDateInputChange(endDate) {
    setProjectData((state) => {
      return { ...state, endDate };
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
    },
    {
      inputType: "date",
      name: "Data de Término",
      id: "endDate",
      required: true,
      onChange: handleEndDateInputChange,
      placeholder: "Data de Término *",
      value: endDate,
    },
    { name: "Sala", id: "room", placeholder: "Sala", value: room },
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
  ];
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
