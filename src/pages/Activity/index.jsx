import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import ProjectsService from "../../services/ProjectsService";
import styled from "styled-components";
import Card from "../../components/Card";
import { transformDate } from "../../utils/transformDate";

export default function Activty() {
  const [activity, setActivity] = useState([]);
  async function load() {
    try {
      const { data: projects } = await ProjectsService.getActivity();

      setActivity(projects);
    } catch (error) {
      //   alertUser({ text: error.response.data.message, type: "error" });
    }
  }
  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <Layout>
        <Title>Log de atividades</Title>
        <ul>
          {activity.map((a) => (
            <li key={a.id}>
              <Card style={{ flexDirection: "column" }}>
                <div>Operacao: {a.operation}</div>
                <div>Tipo: {a.entity}</div>
                <div>User: {a.user}</div>
                <div>Data da operacao: {transformDate(a.date)}</div>
              </Card>
            </li>
          ))}
        </ul>
      </Layout>
    </>
  );
}
const Title = styled.h1`
  font-style: italic;
  color: rgba(0, 0, 0, 0.65);
  font-weight: 500;
  font-size: 3rem;
  padding-top: 2%;
  padding-bottom: 8%;
`;
