import { object, bool, func } from "prop-types";
import { useEffect, useState } from "react";
import styled from "styled-components";

import Modal from "components/Modal";
import Card from "components/Card";
import Button from "components/Button";

import ServicesService from "services/ServicesService";
import { alertUser, alertUnmappedError } from "utils/alertUser";

CreateServiceAssociationModal.propTypes = {
  service: object.isRequired,
  member: object.isRequired,
  showModal: bool.isRequired,
  setShowModal: func.isRequired,
  initialState: object,
};
CreateServiceAssociationModal.defaultProps = {
  initialState: {},
};
export default function CreateServiceAssociationModal({ member, showModal, setShowModal }) {
  const [services, setServices] = useState([]);
  const [serviceSelected, setServiceSelected] = useState({});

  async function loadServices() {
    try {
      const membersList = await ServicesService.getAll();

      setServices(membersList.data);
    } catch (err) {
      // console.log(err);
    }
  }

  useEffect(() => {
    loadServices();
  }, []);

  async function onSubmit() {
    const { id: serviceId } = serviceSelected;
    const { id: memberId } = member;

    try {
      await ServicesService.createServiceAssociation(memberId, serviceId);
      setShowModal(false);
      alertUser({ text: "Serviço associado!", type: "success" });
    } catch (err) {
      const { status } = err.response;

      if (status === 409) {
        alertUser({
          text: `Serviço e Membro já associados`,
          type: "error",
        });
      } else if (status === 422) {
        alertUser({
          text: `Data de inicio não pode ser antes do projeto iniciar e data de fim não pode ser depois do projeto terminar `,
          type: "error",
        });
      } else alertUnmappedError(err);
    }
  }

  return (
    <Modal modalOpen={showModal} width="70vh" height="30vh">
      <Container>
        <Title>Associar serviço</Title>
        <Services>
          {services.map((service) => (
            <Card
              key={service.id}
              onClick={() => setServiceSelected(service)}
              style={{
                maxWidth: "20%",
                display: "flex",
                justifyContent: "center",
              }}
              isSelected={serviceSelected.id === service.id}
            >
              <div>{service.name}</div>
            </Card>
          ))}
        </Services>
        <Buttons>
          <Button
            onClick={() => {
              setShowModal(false);
              setServiceSelected({});
            }}
            width={"30%"}
          >
            Cancelar
          </Button>
          <Button
            width={"30%"}
            onClick={() => onSubmit()}
            disabled={Object.keys(serviceSelected).length ? false : false}
          >
            Confirmar
          </Button>
        </Buttons>
      </Container>
    </Modal>
  );
}
const Container = styled.div`
  width: 100%;
`;
const Title = styled.h1`
  display: flex;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
`;
const Services = styled.div`
  margin-bottom: 5%;
  flex-wrap: wrap;
  gap: 2vh;
`;
const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
`;
