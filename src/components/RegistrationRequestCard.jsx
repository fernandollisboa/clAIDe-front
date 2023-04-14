import { useState } from "react";
import { IoCheckbox, IoCloseCircle, IoInformationCircleOutline } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import PropTypes, { string, bool, func, number } from "prop-types";

import styled from "styled-components";
import maskCpf from "utils/maskCpf";
import maskDate from "utils/maskDate";
import parseMemberTypeToPortuguese from "utils/parseMemberTypeToPortuguese";
import EditMemberModal from "pages/EditMemberModal";

export default function RegistrationRequestCard(props) {
  const [showEditModal, setShowEditModal] = useState(false);
  const {
    name,
    id,
    email,
    lsdEmail,
    secondaryEmail,
    lattes,
    roomName,
    hasKey,
    memberType,
    birthDate,
    cpf,
    rg,
    isDetailsVisible,
    onCloseDetails,
    onOpenDetails,
    passport,
    onSubmitReview,
    services,
    registrationStatus,
    onSubmitReload,
  } = props;

  function toggleIsDetailsVisible() {
    if (isDetailsVisible) onCloseDetails(id);
    else onOpenDetails(id);
  }

  async function acceptRegistration() {
    const comment = "";
    await onSubmitReview({ memberId: id, comment, status: "APPROVED" });
  }

  async function rejectRegistration() {
    const comment = prompt("Digite um comentário da revisão");
    await onSubmitReview({ memberId: id, comment, status: "REJECTED" });
  }

  return (
    <CardWrapper isDetailsVisible={isDetailsVisible}>
      <EditMemberModal
        setShowModal={setShowEditModal}
        showModal={showEditModal}
        initialState={props}
        isRejected={true}
        onSubmitReload={onSubmitReload}
      />
      <RequestCard>
        <MoreInfoIconWrapper isDetailsVisible={isDetailsVisible}>
          <IoInformationCircleOutline onClick={toggleIsDetailsVisible} />
        </MoreInfoIconWrapper>
        <RequestInfo>
          <Title>Novo Membro </Title>
          {name} - {parseMemberTypeToPortuguese(memberType)}
        </RequestInfo>
        {registrationStatus.status === "REJECTED" ? (
          <RequestUpdate>
            <p>
              Revisado por:<span>{parseMemberTypeToPortuguese(registrationStatus.reviewedBy)}</span>
            </p>
            <p>
              Comentário:
              <span> {registrationStatus.comment}</span>
            </p>
            <AiOutlineEdit
              size={40}
              color={props.isDetailsVisible ? "#486FBD" : "grey"}
              onClick={() => setShowEditModal(true)}
            />
          </RequestUpdate>
        ) : (
          <ActionButtons>
            <IoCheckbox
              color={props.isDetailsVisible ? "green" : "grey"}
              onClick={acceptRegistration}
            />
            <IoCloseCircle
              color={props.isDetailsVisible ? "red" : "grey"}
              onClick={rejectRegistration}
            />
          </ActionButtons>
        )}
      </RequestCard>
      <DropDownInfo isVisible={isDetailsVisible}>
        <MemberInfo>
          <p>
            E-mail principal: <span>{email || "-"}</span>
          </p>
          <p>
            E-mail LSD: <span>{lsdEmail || "-"}</span>
          </p>
          <p>
            E-mail secundário: <span>{secondaryEmail || "-"}</span>
          </p>
          <p>
            Lattes: <span>{lattes || "-"}</span>
          </p>
          <p>
            Sala LSD: <span>{roomName || " Sem sala"}</span>
          </p>
          <p>
            Tem a chave da sala? <span>{hasKey ? "Sim" : "Não"}</span>
          </p>
          <p>
            Data de nascimento: <span>{maskDate(birthDate) || "-"}</span>
          </p>
          <p>
            CPF: <span>{maskCpf(cpf) || "-"}</span>
          </p>
          <p>
            RG: <span>{rg || "-"}</span>
          </p>
          <p>
            Passaporte: <span>{passport || "-"}</span>
          </p>
          <p>
            Serviços: <span>{Object.values(services).join(", ") || "-"}</span>
          </p>
        </MemberInfo>
      </DropDownInfo>
    </CardWrapper>
  );
}

const RequestCard = styled.div`
  display: flex;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.184);
  border-radius: 10px;
  padding: 2% 1% 2% 1%;
  width: 800px;
  min-width: 20%;
  height: 70px;
  justify-content: space-evenly;
`;

const RequestInfo = styled.div`
  width: 82%;
`;
const RequestUpdate = styled.div`
  display: flex;
  justify-content: center;
  p {
    padding: 7px;
    font-size: 1rem;
    font-weight: 700;
    span {
      font-weight: 400;
    }
  }
`;
const ActionButtons = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 2.2rem;
  & > :hover {
    transition: all 50ms ease-in;
    transform: scale(0.98);
    cursor: pointer;
  }
`;

const MemberInfo = styled.div`
  width: 100%;
  p {
    padding: 7px;
    font-size: 1rem;
    font-weight: 700;
    span {
      font-weight: 400;
    }
  }
`;

const CardWrapper = styled.div`
  transform: translateY(${(props) => (props.isDetailsVisible ? "5px" : "0")});
  transition: transform 0.4s ease-in-out;
`;

const DropDownInfo = styled.div`
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  height: ${({ isVisible }) => (isVisible ? "fit-content" : "0")};
  border: 1px solid black;
  margin-bottom: 5px;
  border-top: none;
  border-radius: 15px;
  width: 100%;
`;

const Title = styled.div`
  font-size: 1.5rem;
  padding-bottom: 5px;
`;

const MoreInfoIconWrapper = styled.div`
  display: flex;
  padding-left: 5px;
  align-items: center;
  font-size: 1.5rem;
  & > :hover {
    transition: all 50ms ease-in;
    transform: scale(0.98);
    cursor: pointer;
  }
  animation: ${(props) => (props.isDetailsVisible ? "none" : "blink 2s infinite")};
  @keyframes blink {
    0% {
      color: green;
    }
    50% {
      color: white;
    }
    100% {
      color: green;
    }
  }
`;

RegistrationRequestCard.propTypes = {
  name: string.isRequired,
  id: number.isRequired,
  email: string.isRequired,
  lsdEmail: string.isRequired,
  secondaryEmail: string.isRequired,
  lattes: string.isRequired,
  roomName: string.isRequired,
  hasKey: bool.isRequired,
  memberType: string.isRequired,
  birthDate: string.isRequired,
  cpf: string.isRequired,
  rg: string.isRequired,
  isDetailsVisible: bool.isRequired,
  onCloseDetails: func.isRequired,
  onOpenDetails: func.isRequired,
  passport: string.isRequired,
  onSubmitReview: func.isRequired,
  services: PropTypes.arrayOf(string).isRequired,
  registrationStatus: string.isRequired,
  onSubmitReload: func.isRequired,
};
