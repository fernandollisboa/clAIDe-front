import styled from "styled-components";
import { useState } from "react";
import Container from "components/Container";
import maskCpf from "utils/maskCpf";
import maskDate from "utils/maskDate";
import Layout from "components/Layout";
import { IoCheckbox, IoCloseCircle, IoInformationCircleOutline } from "react-icons/io5";

export default function RegistrationRequests() {
  const [moreInfoVisibility, setMoreInfoVisibility] = useState(false);
  const memberData = {
    name: "Fulano de Tal",
    email: "fulano.tal@ccc.ufcg.edu.br",
    birthDate: "10/11/1987",
    username: "fulano.tal",
    cpf: "12345678931",
    rg: "9876543",
    passport: "AP1234567",
    phone: "12345678912",
    lsdEmail: "fulano.tal@lsd.ufcg.edu.br",
    secondaryEmail: "string",
    memberType: "ADMIN",
    lattes: "https://lattes.cnpq.br/FulanoDeTal",
    roomName: "Triunfo",
    hasKey: true,
    isActive: false,
    isBrazilian: true,
  };
  const {
    name,
    email,
    birthDate,
    username,
    cpf,
    rg,
    passport,
    phone,
    lsdEmail,
    secondaryEmail,
    memberType,
    lattes,
    https,
    roomName,
    hasKey,
    isActive,
    isBrazilian,
  } = memberData;

  function toggleInfoVisibility() {
    setMoreInfoVisibility((s) => !s);
  }

  return (
    <Layout>
      <PageTitle>Solicitações de Cadastro</PageTitle>
      <ContentWrapper>
        <CustomContainer>
          {/* <ContainerTitle>Novas Solicitações</ContainerTitle> */}
          <CustomContainer>
            <CardWrapper>
              <RequestCard>
                <MoreInfoIconWrapper>
                  <IoInformationCircleOutline onClick={toggleInfoVisibility} />
                </MoreInfoIconWrapper>
                <RequestInfo>
                  <Title>Novo Membro</Title>
                  aqui vai ter varias informacoes e quando clicar vai abrir um form
                </RequestInfo>
                <ActionButtons>
                  <IoCheckbox color="green" />
                  <IoCloseCircle color="red" />
                </ActionButtons>
              </RequestCard>
              <DropDownInfo isVisible={moreInfoVisibility}>
                <ListMemberInfo>
                  <Data>
                    <FormatData>
                      E-mail principal: <FontData>{email || "-"}</FontData>
                    </FormatData>
                    <FormatData>
                      E-mail LSD: <FontData>{lsdEmail || "-"}</FontData>
                    </FormatData>
                    <FormatData>
                      E-mail secundário: <FontData>{secondaryEmail || "-"}</FontData>
                    </FormatData>
                    <FormatData>
                      Lattes: <FontData>{lattes || "-"}</FontData>
                    </FormatData>
                    <FormatData>
                      Sala LSD: <FontData>{roomName || " Sem sala"}</FontData>
                    </FormatData>
                    <FormatData>
                      Tem a chave da sala? <FontData>{hasKey ? "Sim" : "Não"}</FontData>
                    </FormatData>
                  </Data>
                  <PersonalData>
                    <FormatData>
                      Data de nascimento: <FontData>{maskDate(birthDate) || "-"}</FontData>
                    </FormatData>
                    <FormatData>
                      CPF: <FontData>{maskCpf(cpf) || "-"}</FontData>
                    </FormatData>
                    <FormatData>
                      RG: <FontData>{rg || "-"}</FontData>
                    </FormatData>
                    <FormatData>
                      Passaporte: <FontData>{passport || "-"}</FontData>
                    </FormatData>
                  </PersonalData>
                </ListMemberInfo>
              </DropDownInfo>
            </CardWrapper>
            <CardWrapper>
              <RequestCard>
                <MoreInfoIconWrapper>
                  <IoInformationCircleOutline onClick={toggleInfoVisibility} />
                </MoreInfoIconWrapper>
                <RequestInfo>
                  <Title>Novo Membro</Title>
                  aqui vai ter varias informacoes e quando clicar vai abrir um form
                </RequestInfo>
                <ActionButtons>
                  <IoCheckbox color="green" />
                  <IoCloseCircle color="red" />
                </ActionButtons>
              </RequestCard>
              <DropDownInfo isVisible={null}>
                <ListMemberInfo>
                  <Data>
                    <FormatData>
                      E-mail principal: <FontData>{email || "-"}</FontData>
                    </FormatData>
                    <FormatData>
                      E-mail LSD: <FontData>{lsdEmail || "-"}</FontData>
                    </FormatData>
                    <FormatData>
                      E-mail secundário: <FontData>{secondaryEmail || "-"}</FontData>
                    </FormatData>
                    <FormatData>
                      Lattes: <FontData>{lattes || "-"}</FontData>
                    </FormatData>
                    <FormatData>
                      Sala LSD: <FontData>{roomName || " Sem sala"}</FontData>
                    </FormatData>
                    <FormatData>
                      Tem a chave da sala? <FontData>{hasKey ? "Sim" : "Não"}</FontData>
                    </FormatData>
                  </Data>
                  <PersonalData>
                    <FormatData>
                      Data de nascimento: <FontData>{maskDate(birthDate) || "-"}</FontData>
                    </FormatData>
                    <FormatData>
                      CPF: <FontData>{maskCpf(cpf) || "-"}</FontData>
                    </FormatData>
                    <FormatData>
                      RG: <FontData>{rg || "-"}</FontData>
                    </FormatData>
                    <FormatData>
                      Passaporte: <FontData>{passport || "-"}</FontData>
                    </FormatData>
                  </PersonalData>
                </ListMemberInfo>
              </DropDownInfo>
            </CardWrapper>
          </CustomContainer>
        </CustomContainer>
        {/* <CustomContainer>
          <RequestCard>
            <RequestInfo>
              <Title>Novo Projeto</Title>
              <RequestInfo>
                aqui vai ter varias informacoes e quando clicar vai abrir um form
              </RequestInfo>
            </RequestInfo>
            <ActionButtons>
              <IoCheckbox color="green" />
              <IoCloseCircle color="red" />
            </ActionButtons>
          </RequestCard>
        </CustomContainer> */}
      </ContentWrapper>
    </Layout>
  );
}

const ContainerTitle = styled.div`
  font-size: 2rem;
  width: 100%;
`;

const PageTitle = styled.div`
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const DropDownInfo = styled.div`
  /* visibility: ${({ isVisible }) => (!isVisible ? "hidden" : "visible")}; */
  display: ${({ isVisible }) => (!isVisible ? "none" : "block")};
  height: ${({ isVisible }) => (!isVisible ? "0" : "100%")};
  border: 1px solid green;
`;

const Title = styled.div`
  font-size: 1.5rem;
`;

const MoreInfoIconWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  & > :hover {
    transition: all 50ms ease-in;
    transform: scale(0.98);
    cursor: pointer;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  padding: 2% 5%;
  gap: 5%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const CustomContainer = styled(Container)`
  flex-direction: column;
  padding: 0 1%;
  gap: 5%;
  height: 70%;
  border-radius: 15px;
`;

const RequestCard = styled.div`
  display: flex;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.184);
  border-radius: 10px;
  padding: 2% 1% 2% 1%;
  width: 700px;
  min-width: 20%;
  justify-content: space-between;
`;

const RequestInfo = styled.div`
  min-width: 80%;
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

////

const FormatData = styled.p`
  padding: 7px;
  font-size: 1rem;
  font-weight: 700;
`;
const PersonalData = styled.div`
  height: 200px;
  padding-top: 2%;
`;

const FontData = styled.span`
  font-weight: 400;
`;

const Data = styled.p``;

const ListMemberInfo = styled.div`
  width: 100%;
`;
