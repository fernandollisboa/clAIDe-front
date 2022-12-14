import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";

import Card from "../../components/Card";
import Menu from "../../components/Menu";
import Layout from "../../components/Layout";

import MembersService from "../../services/MembersService";
import { useNavigate } from "react-router-dom";

export default function Member() {
  const [members, setMembers] = useState([]);
  const [membersNameToBeSearched, setMembersNameToBeSearched] = useState("");
  const [isActive, setIsActive] = useState("");
  const [desc, setDesc] = useState(false);
  const navigate = useNavigate();

  const filteredMembers = useMemo(
    () =>
      members.filter(({ name }) =>
        name.toLowerCase().includes(membersNameToBeSearched.toLowerCase())
      ),
    [members, membersNameToBeSearched]
  );

  async function loadMembers() {
    try {
      const membersList = await MembersService.getAll(isActive, desc);

      setMembers(membersList.data);
    } catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    loadMembers();
  }, [isActive, desc]);

  function handleToggleIsActive(event) {
    setIsActive(event.target.value);
  }
  function handleToggleDesc() {
    setDesc((prevState) => (prevState ? false : true));
  }
  function handleChangeSearchMember(event) {
    setMembersNameToBeSearched(event.target.value);
  }
  function navigateToMember(id) {
    navigate(`/member/${id}`);
  }
  return (
    <>
      <Layout>
        <Menu
          type="Membros"
          desc={desc}
          handleToggleDesc={handleToggleDesc}
          nameToBeSearched={membersNameToBeSearched}
          handleChangeSearch={handleChangeSearchMember}
          handleToggleIsActive={handleToggleIsActive}
          url="/newMember"
        />
        <Container>
          {filteredMembers.map((member) => (
            <Card
              key={member.id}
              onClick={() => {
                navigateToMember(member.id);
              }}
            >
              <div className="info">
                <div className="name">{member.name}</div>
                <div>
                  Projeto: <span>Falta colocar no obj</span>
                </div>
                <div>
                  Sala: <span>{member.roomName}</span>
                </div>
                <div>
                  Email LSD: <span>{member.lsdEmail}</span>
                </div>
              </div>
              <div>{member.isActive ? "????" : "????"}</div>
            </Card>
          ))}
        </Container>
      </Layout>
    </>
  );
}
const Container = styled.div`
  display: flex;
  align-items: center;
  max-width: 68%;
  margin: 0 auto;
  flex-wrap: wrap;
  gap: 2vh;
  margin-top: 1%;
`;
