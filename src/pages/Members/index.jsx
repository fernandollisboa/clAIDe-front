import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Card from "../../components/Card";
import Menu from "../../components/Menu";
import Layout from "../../components/Layout";
import { alertUnmappedError, alertUser } from "utils/alertUser";
import maskPhone from "../../utils/maskPhone";
import MembersService from "../../services/MembersService";
import Loader from "components/Loader";
import NoDataMessage from "components/NoDataMessage";
import useAuth from "hooks/useAuth";

export default function Members() {
  const { setUser } = useAuth();
  const [members, setMembers] = useState([]);
  const [membersNameToBeSearched, setMembersNameToBeSearched] = useState("");
  const [isActive, setIsActive] = useState("");
  const [desc, setDesc] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const filteredMembers = useMemo(
    () =>
      members.filter(({ name }) =>
        name.toLowerCase().includes(membersNameToBeSearched.toLowerCase())
      ),
    [members, membersNameToBeSearched]
  );

  async function loadMembers() {
    setIsLoading(true);
    try {
      const membersList = await MembersService.getAll(isActive, desc);

      setMembers(membersList.data);
    } catch (err) {
      const { status } = err.response;
      if (status === 401) {
        setUser(null);
        alertUser({ text: "Token expirado, por favor logue novamente", type: "warning" });
        navigate("/");
      } else alertUnmappedError(err);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    loadMembers();
  }, [isActive, desc]);

  function handleToggleIsActive(event) {
    setIsActive(event.target.value);
  }
  function handleToggleDesc() {
    setDesc((prevState) => !prevState);
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
          {isLoading ? (
            <Loader />
          ) : !members.length ? (
            <NoDataMessage />
          ) : (
            <MemberListContainer>
              {filteredMembers.map(({ id, name, roomName, lsdEmail, email, isActive, phone }) => (
                <Card
                  key={id}
                  onClick={() => {
                    navigateToMember(id);
                  }}
                  style={{ width: "30%", height: "15%" }}
                >
                  <Info>
                    <Name>{name}</Name>

                    <Data>
                      Sala: <FontData>{roomName}</FontData>
                    </Data>
                    <Data>
                      Email: <FontData>{lsdEmail ? lsdEmail : email}</FontData>
                    </Data>
                    <Data>
                      Telefone: <FontData>{maskPhone(phone)}</FontData>
                    </Data>
                  </Info>
                  <div>{isActive ? "🟢" : "🔴"}</div>
                </Card>
              ))}
            </MemberListContainer>
          )}
        </Container>
      </Layout>
    </>
  );
}
const Container = styled.div`
  display: flex;
  align-items: center;
  max-width: 90%;
  margin: 0 auto;
  flex-wrap: wrap;
  margin-top: 1%;
`;
const Info = styled.div`
  p {
    margin-bottom: 4px;
  }
`;
const Name = styled.p`
  font-size: 1rem;
  font-weight: 700;
`;
const Data = styled.p``;
const FontData = styled.span`
  color: #2e2d2d;
`;

const MemberListContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
