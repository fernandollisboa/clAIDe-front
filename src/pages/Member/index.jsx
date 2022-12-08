import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";

import Menu from "../../components/Menu";
import Layout from "../../components/Layout";

import MembersService from "../../services/MembersService";

export default function Member() {
  const [members, setMembers] = useState([]);
  const [membersNameToBeSearched, setMembersNameToBeSearched] = useState("");
  const [isActive, setIsActive] = useState("");
  const [desc, setDesc] = useState("");

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
    setDesc((prevState) => (prevState === true ? false : true));
  }
  function handleChangeSearchMember(event) {
    setMembersNameToBeSearched(event.target.value);
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
            <Card key={member.id}>
              <div className="member-info">
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
              <div>{member.isActive ? "🟢" : "🔴"}</div>
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
  overflow: scroll;
  max-height: 70vh;
`;
const Card = styled.div`
  display: flex;
  width: 23%;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 20px;
  padding: 1.2%;
  justify-content: space-between;
  .member-info {
    font-size: 0.8rem;

    .name {
      font-size: 1rem;
      font-weight: 700;
    }
    div {
      margin-bottom: 3%;
    }
    span {
      color: #bcbcbc;
    }
  }
`;
