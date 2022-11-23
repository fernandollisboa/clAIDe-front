import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Layout from "../../components/Layout";

import MembersService from "../../services/MembersService";

export default function Member() {
  const [members, setMembers] = useState([]);
  const [membersNameToBeSearched, setMembersNameToBeSearched] = useState("");

  const filteredMembers = useMemo(
    () =>
      members.filter(({ name }) =>
        name.toLowerCase().includes(membersNameToBeSearched.toLowerCase())
      ),
    [members, membersNameToBeSearched]
  );

  async function loadMembers() {
    try {
      const membersList = await MembersService.getAll();

      setMembers(membersList.data);
    } catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    loadMembers();
  }, []);

  function handleChangeSearchMember(event) {
    setMembersNameToBeSearched(event.target.value);
  }
  return (
    <>
      <Layout>
        <Menu>
          <h1>Membros cadastrados</h1>
          <InputSearch
            value={membersNameToBeSearched}
            placeholder="Pesquisar Membro..."
            type="text"
            onChange={handleChangeSearchMember}
          />
          <div className="buttons">
            <Link to="/newMember">Cadastrar Membro </Link>
          </div>
        </Menu>
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

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 68%;
  margin: 1% auto;
  h1 {
    font-size: 2rem;
    font-weight: 600;
  }
  .buttons {
    a {
      text-decoration: none;
      border: 2px solid #131313;
      border-radius: 4px;
      padding: 1vh 2vh;
      color: #131313;
      font-weight: 700;
      font-size: 1rem;
    }
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
