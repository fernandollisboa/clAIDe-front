import { useEffect, useState, useMemo } from "react";

import Layout from "../../components/Layout";
import styled from "styled-components";

import arrow from "../../assets/arrow.svg";

import ProjectsService from "../../services/ProjectsService";
import maskDate from "../../utils/maskDate";
import Loader from "components/Loader";

export default function Activty() {
  const [activitys, setActivitys] = useState([]);
  const [activityUserNameToBeSearched, setActivityUserNameToBeSearched] = useState("");
  const [desc, setDesc] = useState(false);
  const [entity, setEntity] = useState("");
  const [operation, setOperation] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const filteredActivity = useMemo(
    () =>
      activitys.filter(({ user }) =>
        user?.toLowerCase().includes(activityUserNameToBeSearched.toLowerCase())
      ),
    [activitys, activityUserNameToBeSearched]
  );
  async function loadActivity() {
    setIsLoading(true);
    try {
      const { data } = await ProjectsService.getActivity(desc, entity, operation);

      setActivitys(data);
    } catch (error) {
      //   alertUser({ text: error.response.data.message, type: "error" });
    }
    setIsLoading(false);
  }
  useEffect(() => {
    loadActivity();
  }, [desc, entity, operation]);

  function handleChangeSearchActivity(event) {
    setActivityUserNameToBeSearched(event.target.value);
  }
  function handleChangeEntity(event) {
    setEntity(event.target.value);
  }
  function handleChangeOperation(event) {
    setOperation(event.target.value);
  }
  return (
    <>
      <Layout>
        <Container>
          <Title>Log de atividades</Title>

          <Filters>
            <FilterDesc onClick={() => setDesc((s) => !s)} desc={desc}>
              <span>Nome</span>
              <img src={arrow} alt="Arrow" />
            </FilterDesc>
            <InputSearch
              value={activityUserNameToBeSearched}
              placeholder="Pesquisar por nome..."
              type="text"
              onChange={handleChangeSearchActivity}
            />
            <FilterOperation>
              <Filter>
                <span>Filtrar por: </span>
                <select onClick={handleChangeEntity}>
                  <option value={""}>Todos</option>
                  <option value={"MEMBER"}>Membro</option>
                  <option value={"PROJECT"}>Projeto</option>
                  {/* <option value={"SERVICE"}>Serviço</option> */}
                  <option value={"PROJECT_ASSOCIATION"}>Associação de projeto</option>
                  <option value={"SERVICE_ASSOCIATION"}>Associação de serviço</option>
                </select>
              </Filter>
              <Filter>
                <span>Filtrar por: </span>
                <select onClick={handleChangeOperation}>
                  <option value={""}>Todos</option>
                  <option value={"CREATE"}>Criação</option>
                  <option value={"UPDATE"}>Atualização</option>
                </select>
              </Filter>
            </FilterOperation>
          </Filters>
          {isLoading ? (
            <Loader />
          ) : (
            <ListActivities>
              {filteredActivity.map((activity) => (
                <Log key={activity.id} style={{ flexDirection: "column" }}>
                  <FormatData>
                    Usuário: <FontData>{activity.user}</FontData>
                  </FormatData>
                  <FormatData>
                    Entidade: <FontData>{activity.entity}</FontData>
                  </FormatData>
                  <FormatData>
                    Operação: <FontData>{activity.operation}</FontData>
                  </FormatData>
                  <FormatData>
                    Data: <FontData>{maskDate(activity.date)}</FontData>
                  </FormatData>
                  <Log key={activity.newValue.id} style={{ border: "none" }}>
                    <FormatData>
                      Valor novo:
                      {Object.keys(activity.newValue).map((key, index) => (
                        <div key={index}>
                          <span>{key}</span>: <FontData>{activity.newValue[key]}</FontData>
                        </div>
                      ))}
                    </FormatData>
                    {activity.oldValue && (
                      <FormatData>
                        Valor antigo:
                        {Object.keys(activity.oldValue).map((key, index) => (
                          <div key={index}>
                            <span>{key}</span>: <FontData>{activity.oldValue[key]}</FontData>
                          </div>
                        ))}
                      </FormatData>
                    )}
                  </Log>
                </Log>
              ))}
            </ListActivities>
          )}
        </Container>
      </Layout>
    </>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1% auto;
  max-width: 50%;
`;
const Title = styled.h1`
  justify-content: center;
  font-style: italic;
  font-weight: 700;
  font-size: 3rem;
  padding-bottom: 8%;
`;
const Filters = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3%;
`;
const FilterDesc = styled.button`
  border: 1px solid #131313;
  padding: 1%;
  cursor: pointer;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  background: #f6f5fc;
  display: flex;
  align-items: center;

  span {
    font-weight: 700;
    margin-right: 10%;
  }
  img {
    cursor: pointer;
    transform: ${({ desc }) => (!desc ? "rotate(-180deg)" : "rotate(0deg)")};
    transition: transform 0.2s ease-in;
  }
`;
const FilterOperation = styled.div`
  display: flex;
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #131313;
  border-radius: 4px;
  font-size: 1rem;
  padding: 0 1%;
  & + & {
    margin-left: 3%;
  }

  span {
    font-weight: 600;
  }
  select {
    height: 40px;
    cursor: pointer;
    background: transparent;
    color: rgb(102, 102, 102);
    border: none;
    outline: none;
  }
`;
const InputSearch = styled.input`
  width: 30%;
  background: #fff;
  border: 2px solid #fff;
  height: 50px;
  border-radius: 25px;
  font-size: 1rem;
  justify-content: center;
  padding: 0 2%;
`;
const ListActivities = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3vh;
`;
const Log = styled.div`
  background: white;
  padding: 1%;
  width: 100%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  & + & {
    margin-bottom: 10px;
  }
`;
const FormatData = styled.span`
  padding: 7px;
  font-size: 1rem;
  font-weight: 700;
`;
const FontData = styled.span`
  font-weight: 400;
`;
