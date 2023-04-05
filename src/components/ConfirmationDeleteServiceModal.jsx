import styled from "styled-components";
import PropTypes from "prop-types";

import Button from "./Button";
import Modal from "./Modal";

ConfirmationDeleteServiceModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  serviceForDeleted: PropTypes.string.isRequired,
  setServiceForDeleted: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export function ConfirmationDeleteServiceModal({
  showModal,
  setShowModal,
  serviceForDeleted,
  setServiceForDeleted,
  onDelete,
}) {
  return (
    <Modal modalOpen={showModal} width="40vh" height="20vh">
      <ModalContainer>
        <h1>
          Tem certeza que quer excluir o serviço <Font>{serviceForDeleted}</Font>?
        </h1>
        <Buttons>
          <Button
            onClick={() => {
              setShowModal(false);
              setServiceForDeleted("");
            }}
            width={"30%"}
          >
            Cancelar
          </Button>
          <Button
            width={"30%"}
            onClick={() => {
              setShowModal(false);
              setServiceForDeleted("");
              onDelete();
            }}
            disabled={Object.keys(serviceForDeleted) ? false : false}
          >
            Confirmar
          </Button>
        </Buttons>
      </ModalContainer>
    </Modal>
  );
}
const Font = styled.span`
  font-weight: 700;
`;
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 80px;
`;
const ModalContainer = styled.div``;
