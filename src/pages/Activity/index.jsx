import { useEffect, useState, useMemo } from "react";
import Layout from "../../components/Layout";
import ProjectsService from "../../services/ProjectsService";
import styled from "styled-components";
import Card from "../../components/Card";
import maskDate from "../../utils/maskDate";

export default function Activty() {
  const [activitys, setActivitys] = useState([]);
  const [activityUserNameToBeSearched, setActivityUserNameToBeSearched] = useState("");

  const filteredActivity = useMemo(
    () =>
      activitys.filter(({ user }) =>
        user?.toLowerCase().includes(activityUserNameToBeSearched.toLowerCase())
      ),
    [activitys, activityUserNameToBeSearched]
  );
  async function loadActivity() {
    try {
      const { data } = await ProjectsService.getActivity();

      setActivitys(data);
    } catch (error) {
      //   alertUser({ text: error.response.data.message, type: "error" });
    }
  }
  useEffect(() => {
    loadActivity();
  }, []);

  function handleChangeSearchActivity(event) {
    setActivityUserNameToBeSearched(event.target.value);
  }
  console.log(filteredActivity);
  return (
    <>
      <Layout>
        <Container>
          <Title>Log de atividades</Title>
          <Filters>
            <InputSearch
              value={activityUserNameToBeSearched}
              placeholder="Pesquisar por nome..."
              type="text"
              onChange={handleChangeSearchActivity}
            />
          </Filters>
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
                    Valor novo:{" "}
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
  color: rgba(0, 0, 0, 0.65);
  font-weight: 700;
  font-size: 3rem;
  padding-top: 2%;
  padding-bottom: 8%;
`;
const Filters = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 3%;
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
