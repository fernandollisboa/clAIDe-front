import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { IoCloseCircle, IoAddCircle } from "react-icons/io5";

import Card from "./Card";
import CreateServiceAssociationModal from "components/CreateServiceAssociationModal";

import { alertUser } from "utils/alertUser";
import { alertUnmappedError } from "utils/alertUser";

import MembersService from "services/MembersService";
import { ConfirmationDeleteServiceModal } from "./ConfirmationDeleteServiceModal";

ServiceList.propTypes = {
  member: PropTypes.object.isRequired,
  onSubmitReload: PropTypes.func.isRequired,
};
export default function ServiceList({ member, onSubmitReload }) {
  const [managerService, setManagerService] = useState(false);
  const [serviceSelected, setServiceSelected] = useState(member.services);
  const [showServiceAddModal, setShowServiceAddModal] = useState(false);
  const [showServiceDeleteModal, setShowServiceDeleteModal] = useState(false);

  async function onDelete() {
    const services = member.services.filter((service) => service !== serviceSelected);

    const updatedMember = { ...member, services };
    try {
      await MembersService.update(updatedMember);
      setShowServiceDeleteModal(false);
      alertUser({ text: "Serviço deletado!", type: "success" });
      onSubmitReload();
    } catch (err) {
      alertUnmappedError(err);
    }
  }
  async function onUpdate() {
    const updatedMember = { ...member, services: serviceSelected };
    try {
      await MembersService.update(updatedMember);
      setShowServiceAddModal(false);
      alertUser({ text: "Serviço associado!", type: "success" });
      onSubmitReload();
    } catch (err) {
      alertUnmappedError(err);
    }
  }
  function handleToggleManagerService() {
    setManagerService((prevState) => !prevState);
  }
  return (
    <Services>
      <CreateServiceAssociationModal
        member={member}
        showModal={showServiceAddModal}
        setShowModal={setShowServiceAddModal}
        serviceSelected={serviceSelected}
        setServiceSelected={setServiceSelected}
        onUpdate={onUpdate}
      />
      <ConfirmationDeleteServiceModal
        showModal={showServiceDeleteModal}
        setShowModal={setShowServiceDeleteModal}
        serviceForDeleted={serviceSelected}
        setServiceForDeleted={setServiceSelected}
        onDelete={onDelete}
      />
      <ServiceHeader>
        <Title>Serviços</Title>

        <IoAddCircle
          visibility={managerService ? "visible" : "hidden"}
          cursor={"pointer"}
          size={40}
          title="Adicionar Serviço"
          alt="Adicionar Serviço"
          color="#486fbd"
          onClick={() => setShowServiceAddModal(true)}
        />

        <ButtonManager isSelected={managerService} onClick={handleToggleManagerService}>
          Gerenciar
        </ButtonManager>
      </ServiceHeader>
      <ServiceContainer>
        {member.services.map((service) => (
          <CardsContainer key={service.name}>
            <ServiceCard>
              {service}
              {managerService && (
                <IoCloseCircle
                  cursor={"pointer"}
                  color="red"
                  onClick={() => {
                    setServiceSelected(service);
                    setShowServiceDeleteModal(true);
                  }}
                />
              )}
            </ServiceCard>
          </CardsContainer>
        ))}
      </ServiceContainer>
    </Services>
  );
}
const ServiceCard = styled(Card)`
  max-width: 15vh;
  min-width: 7vh;
  padding: 4%;
`;
const ButtonManager = styled.button`
  background: ${({ isSelected }) => (isSelected ? "#486fbd37" : "#fff")};
  border: 2px solid ${({ isSelected }) => (isSelected ? "#486fbd" : "#131313")};
  text-decoration: none;
  border-radius: 4px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
`;

const CardsContainer = styled.div`
  align-items: center;
  display: flex;
`;
const Title = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  padding: 1%;
`;
const Services = styled.div`
  height: 200px;
  padding-top: 2%;
  border-top: 2px solid #bcbcbc;
`;
const ServiceHeader = styled.div`
  display: grid;
  grid-template-columns: 12fr 1fr 2fr;
`;
const ServiceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2vh;
  font-size: 1rem;
  margin-top: 2vh;
`;
