import { object, bool, func, string } from "prop-types";
import { useState } from "react";
import styled from "styled-components";

import Modal from "components/Modal";
import Button from "components/Button";
import Card from "components/Card";

CreateServiceAssociationModal.propTypes = {
  showModal: bool.isRequired,
  setShowModal: func.isRequired,
  serviceSelected: string.isRequired,
  setServiceSelected: func.isRequired,
  onUpdate: func.isRequired,
  initialState: object,
};
CreateServiceAssociationModal.defaultProps = {
  initialState: {},
};
export default function CreateServiceAssociationModal({
  showModal,
  setShowModal,
  onUpdate,
  serviceSelected,
  setServiceSelected,
}) {
  // const [otherService, setOtherService] = useState("");
  const [services] = useState([
    { name: "Mattermost" },
    { name: "GitLab" },
    { name: "Redmine" },
    { name: "VPN" },
    { name: "OTRS" },
    { name: "OpenStack" },
  ]);

  // function handleChangeOtherService(event) {
  //   setOtherService(event.target.value);
  // }

  function handleChangeService(service) {
    if (serviceSelected?.includes(service)) {
      const updateServiceSelected = serviceSelected.filter((item) => service !== item);
      setServiceSelected(updateServiceSelected);
    } else {
      setServiceSelected([...serviceSelected, service]);
    }
  }

  return (
    <Modal modalOpen={showModal} width="70vh" height="35vh">
      <Container>
        <Title>Associar serviço</Title>
        <Services>
          {services.map((service) => (
            <Card
              key={service.name}
              onClick={() => handleChangeService(service.name)}
              style={{
                maxWidth: "20%",
                display: "flex",
                justifyContent: "center",
              }}
              isSelected={serviceSelected?.includes(service.name)}
            >
              <div>{service.name}</div>
            </Card>
          ))}

          {/* <InputService
            type="text"
            placeholder="Outros"
            value={otherService}
            onChange={handleChangeOtherService}
          /> */}
        </Services>
        <ButtonsContainer>
          <Button
            onClick={() => {
              setShowModal(false);
            }}
            width={"30%"}
          >
            Cancelar
          </Button>
          <Button
            width={"30%"}
            onClick={() => {
              onUpdate();
              // handleChangeService(otherService);
            }}
            disabled={Object.keys(serviceSelected).length ? false : false}
          >
            Confirmar
          </Button>
        </ButtonsContainer>
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
  margin-bottom: 8%;
`;
const Services = styled.div`
  margin-bottom: 5%;
  display: flex;
  flex-wrap: wrap;
  gap: 2vh;
`;
const ButtonsContainer = styled.div`
  display: flex;
  margin-top: 8%;
  justify-content: space-around;
`;
// const InputService = styled.input`
//   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.184);
//   border-radius: 15px;
//   border: none;
//   width: 20%;
//   padding: 1.2%;
//   margin: 0 0.5% 1% 0.5%;
// `;
