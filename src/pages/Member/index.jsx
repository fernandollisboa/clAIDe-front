import styled from "styled-components";

import Layout from "../../components/Layout";

export default function Member() {
  return (
    <>
      <Layout>
        <Container>
          <Title>Informações de Membro</Title>
          <Dashboard>
            <Header>
              <Info status={true}>
                <div className="member-info">
                  <div className="name">Fulano da Silva</div>
                  <div className="type">Estudante</div>
                  <div className="status">Ativo</div>
                </div>
                <Username>Fulano.silva</Username>
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
                    E-mail principal: <p>fulano@email.com</p>
                  </span>
                  <span>
                    E-mail LSD: <p>fulano@email.com</p>
                  </span>
                  <span>
                    E-mail secundário: <p>fulano@email.com</p>
                  </span>
                  <span>
                    Lattes: <p>Teste teste teste</p>
                  </span>
                  <span>
                    Sala LSD: <p>105 B</p>
                  </span>
                  <span>
                    Tem chave: <p>Sim</p>
                  </span>
                </div>
                <div className="personal-data">
                  <span>
                    Data de nascimento: <p>01/01/2001</p>
                  </span>
                  <span>
                    CPF: <p>111.222.333-45</p>
                  </span>
                  <span>
                    RG: <p>4.044.043</p>
                  </span>
                  <span>
                    Passaporte: <p>FV1180321</p>
                  </span>
                </div>
              </ListInfo>
              <List>
                <ProjectTitle>Projeto</ProjectTitle>
                <ProjectCard>
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
                </ProjectCard>
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
  justify-content: space-between;
`;
const ListInfo = styled.div`
  border-right: 1px solid #bcbcbc;
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
    border-bottom: 1px solid #bcbcbc;
  }
`;
const List = styled.div``;
const ProjectTitle = styled.div``;

const ProjectCard = styled.div`
  width: 422px;
  height: 138.28px;
  background: red;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 20px;
`;
