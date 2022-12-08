import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// import useSafeAsyncAction from "../../hooks/useSafeAsyncAction";

import Layout from "../../components/Layout";

import MembersService from "../../services/MembersService";

import maskCpf from "../../utils/maskCpf";

export default function Member() {
  const [member, setMember] = useState({});
  const params = useParams();

  async function loadMember() {
    try {
      const { data } = await MembersService.getById(params.id);

      setMember(data);
    } catch (error) {
      alert(error);
    }
  }
  useEffect(() => {
    loadMember();
  }, [params.id]);
  return (
    <>
      <Layout>
        <Container>
          <Title>Informações de Membro</Title>
          <Dashboard>
            <Header>
              <Info status={member.status}>
                <div className="member-info">
                  <div className="name">{member.name}</div>
                  <div className="type">{member.memberType}</div>
                  <div className="status">{(member.status && <p>Ativo</p>) || <p>Inativo</p>}</div>
                </div>
                <Username>{member.username}</Username>
              </Info>
              <Buttons>
                <Button> Editar</Button>
                <Select>
                  <option value="">Gerenciar projetos</option>
                </Select>
              </Buttons>
            </Header>
            <Body>
              <ListInfo>
                <div className="data">
                  <span>
                    E-mail principal: <p>{member.email}</p>
                  </span>
                  <span>
                    E-mail LSD: <p>{member.lsdEmail}</p>
                  </span>
                  <span>
                    E-mail secundário: <p>{member.secondaryEmail}</p>
                  </span>
                  <span>
                    Lattes: <p>{member.lattes}</p>
                  </span>
                  <span>
                    Sala LSD: <p>{member.roomName}</p>
                  </span>
                  <span>
                    Tem chave: {(member.hasKey && <p>Tem a chave</p>) || <p>Tem a chave</p>}
                  </span>
                </div>
                <div className="personal-data">
                  <span>
                    Data de nascimento: <p>{member.birthDate}</p>
                  </span>
                  <span>
                    CPF: <p>{maskCpf(member.cpf)}</p>
                  </span>
                  <span>
                    RG: <p>{member.rg}</p>
                  </span>
                  {(member.passport && (
                    <span>
                      Passaporte: <p>{member.passport}</p>{" "}
                    </span>
                  )) || (
                    <span>
                      Passaporte: <p>Nao tem informacao</p>{" "}
                    </span>
                  )}
                </div>
              </ListInfo>
              <List>
                <ProjectTitle>Projeto</ProjectTitle>
                <ProjectCard>
                  <div>
                    <span>Projeto 199</span>
                    <span>
                      Professor: <p>Eanes</p>
                    </span>
                    <span>
                      Sala: <p>105 B</p>
                    </span>
                    <span>
                      Data de inicio: <p>00/00/0000</p>
                    </span>
                  </div>
                  <div>{"🟢"} </div>
                </ProjectCard>
                <Services>
                  <ServiceHeader>
                    <ServiceTitle>Servicos</ServiceTitle>
                    <AssociationSelect>
                      <option value="">Associar Servico</option>
                      <option value="">GitHub</option>
                      <option value="">Cloud</option>
                    </AssociationSelect>
                  </ServiceHeader>
                  <Cards>
                    <ServiceCard>Card 1</ServiceCard>
                    <ServiceCard>Card 1</ServiceCard>
                    <ServiceCard>Card 1</ServiceCard>
                    <ServiceCard>Card 1</ServiceCard>
                    <ServiceCard>Card 1</ServiceCard>
                    <ServiceCard>Card 1</ServiceCard>
                    <ServiceCard>Card 1</ServiceCard>
                    <ServiceCard>Card 1</ServiceCard>
                    <ServiceCard>Card 1</ServiceCard>
                    <ServiceCard>Card 1</ServiceCard>
                    <ServiceCard>Card 1</ServiceCard>
                    <ServiceCard>Card 1</ServiceCard>
                    <ServiceCard>Card 1</ServiceCard>
                    <ServiceCard>Card 1</ServiceCard>
                    <ServiceCard>Card 1</ServiceCard>
                    <ServiceCard>Card 1</ServiceCard>
                    <ServiceCard>Card 1</ServiceCard>
                    <ServiceCard>Card 1</ServiceCard>
                    <ServiceCard>Card 1</ServiceCard>
                    <ServiceCard>Card 1</ServiceCard>
                    <ServiceCard>Card 1</ServiceCard>
                  </Cards>
                </Services>
              </List>
            </Body>
          </Dashboard>
        </Container>
      </Layout>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 88%;
  height: 653px;
  background: #fff;
  border-radius: 10px;
  padding: 1% 2%;
`;
const Title = styled.h1`
  font-weight: 400;
  font-size: 3rem;
  margin: 0 auto;
`;
const Dashboard = styled.div``;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #bcbcbc;
  padding-bottom: 1%;
`;
const Info = styled.div`
  width: 500px;
  .member-info {
    display: flex;
    align-items: center;
    .name {
      font-weight: 700;
      font-size: 2.5rem;
      line-height: 50px;
    }
    .type {
      font-weight: 800;
      font-size: 0.7rem;
      color: #486fbd;
      background: #f6f5fc;
      border-radius: 4px;
      padding: 0.5vh;
      margin-left: 1%;
      margin-right: 1%;
    }
    .status {
      font-weight: 800;
      font-size: 0.7rem;
      color: ${({ status }) => (status ? "#069d15" : "red")};
      background: #f6f5fc;
      border-radius: 4px;
      padding: 0.5vh;
    }
  }
`;
const Username = styled.span`
  font-weight: 400;
  font-size: 1rem;
  line-height: 25px;
  color: rgba(0, 0, 0, 0.54);
`;
const Buttons = styled.div`
  width: 300px;
  display: flex;
`;
const Button = styled.button`
  border: 2px solid #131313;
  text-decoration: none;
  border-radius: 4px;
  padding: 1.2vh 2vh;
  background: #fff;
  font-weight: 700;
  font-size: 1rem;
  margin-right: 5%;
  cursor: pointer;
`;
const Select = styled.select`
  border: 2px solid #131313;
  text-decoration: none;
  border-radius: 4px;
  padding: 1.2vh 2vh;
  background: #fff;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
`;
const Body = styled.div`
  width: 100%;
  display: flex;
  height: 480px;
`;
const ListInfo = styled.div`
  /* border-right: 1px solid #bcbcbc; */
  width: 50%;
  span {
    margin: 2%;
    font-size: 1rem;
    display: flex;
    font-weight: 700;
    p {
      font-weight: 400;
    }
  }
  .data {
    /* border-bottom: 1px solid #bcbcbc; */
  }
  .personal-data {
  }
`;
const List = styled.div`
  margin: 0 auto;
  width: 45%;
`;
const ProjectTitle = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  padding: 3% 0;
`;
const ProjectCard = styled.div`
  margin: 0 auto;
  width: 422px;
  display: flex;
  justify-content: space-between;
  padding: 3%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  font-size: 1rem;
  span {
    display: flex;
    font-weight: 700;
    margin-bottom: 4%;

    p {
      font-weight: 400;
    }
  }
`;
const Services = styled.div`
  margin-top: 5%;
  padding-top: 5%;
  /* border-top: 1px solid #bcbcbc; ; */
`;
const ServiceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ServiceTitle = styled.h1`
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
`;
const AssociationSelect = styled.select`
  border: 2px solid #131313;
  text-decoration: none;
  border-radius: 4px;
  padding: 1.2vh 2vh;
  background: #fff;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
`;
const Cards = styled.div`
  display: flex;
  margin-top: 2%;
  overflow-y: scroll;
  flex-wrap: wrap;
  gap: 2vh;
  max-height: 15vh;
  padding: 1%;
`;

const ServiceCard = styled.div`
  font-weight: 700;
  font-size: 1rem;
  max-width: 15%;
  padding: 2%;
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
`;
