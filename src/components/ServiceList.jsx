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
  const [serviceSelected, setServiceSelected] = useState("");

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
    const updatedMember = { ...member, services: [...member.services, serviceSelected] };
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
        {managerService && (
          <IoAddCircle cursor={"pointer"} size={40} onClick={() => setShowServiceAddModal(true)} />
        )}
        <ButtonManager onClick={handleToggleManagerService} style={{ padding: 12 }}>
          Gerenciar
        </ButtonManager>
      </ServiceHeader>
      <ServiceContainer>
        {member.services.map((service) => (
          <div className="cards" key={service.key}>
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
          </div>
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
  border: 2px solid #131313;
  text-decoration: none;
  border-radius: 4px;
  padding: 4%;
  background: #fff;
  font-weight: 700;
  font-size: 1rem;
  margin-right: 5%;
  cursor: pointer;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  padding: 3% 0;
`;
const Services = styled.div`
  height: 200px;
  padding-top: 2%;
  border-top: 2px solid #bcbcbc;
`;
const ServiceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ServiceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2vh;
  font-size: 1rem;
  overflow: auto;
  .cards {
    align-items: center;
    display: flex;
  }
`;
