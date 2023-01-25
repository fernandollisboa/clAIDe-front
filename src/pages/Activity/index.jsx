import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import ProjectsService from "../../services/ProjectsService";
import styled from "styled-components";
import Card from "../../components/Card";
import maskDate from "../../utils/maskDate";

export default function Activty() {
  const [activity, setActivity] = useState([]);
  async function load() {
    try {
      const { data } = await ProjectsService.getActivity();

      setActivity(data);
    } catch (error) {
      //   alertUser({ text: error.response.data.message, type: "error" });
    }
  }
  useEffect(() => {
    load();
  }, []);
  console.log(activity);
  return (
    <>
      <Layout>
        <Container>
          <Title>Log de atividades</Title>
          <ListActivities>
            {activity.map((activity) => (
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
                    Valor novo: <FontData>{JSON.stringify(activity.newValue)}</FontData>
                  </FormatData>
                  {activity.oldValue && (
                    <FormatData>
                      Valor antigo: <FontData>{JSON.stringify(activity.oldValue)}</FontData>
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
  max-width: 68%;
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
const ListActivities = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2vh;
`;
const Log = styled.div`
  padding: 1%;
  width: 100%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  & + & {
    margin-bottom: 10px;
  }
  /* border: 1px solid black; */
`;
const FormatData = styled.p`
  padding: 7px;
  font-size: 1rem;
  font-weight: 700;
`;
const FontData = styled.span`
  font-weight: 400;
`;
