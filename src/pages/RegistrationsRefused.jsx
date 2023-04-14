import { useState, useEffect } from "react";
import Container from "components/Container";
import styled from "styled-components";

import Layout from "layouts/Layout";
import SupportService from "services/SupportService";
import RegistrationRequestCard from "components/RegistrationRequestCard";
import NoDataMessage from "components/NoDataMessage";
import { alertUser } from "utils/alertUser";
import Loader from "components/Loader";

export default function RegistrationsRefused() {
  const [soliciations, setSoliciations] = useState([]);
  const [openCardDetails, setOpenCardDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData() {
    setIsLoading(true);
    const { data } = await SupportService.getRejectedRegistrations();
    setIsLoading(false);
    setSoliciations(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function openCardCardDetails(cardId) {
    setOpenCardDetails(cardId);
  }

  function closeCardDetails() {
    setOpenCardDetails(null);
  }

  async function handleSubmitReview({ memberId, comment, status }) {
    await SupportService.postRegistrationReview({ memberId, comment, status });
    fetchData();
    alertUser({ text: "Revisão enviada com sucesso", type: "success" });
  }

  return (
    <Layout>
      <PageTitle>Cadastros recusados</PageTitle>
      <ContentWrapper>
        <Container>
          <CardsContainer>
            {isLoading ? (
              <Loader />
            ) : soliciations.length === 0 ? (
              <NoDataMessage message={"Não há novas solicitações de ajuste"} />
            ) : (
              soliciations.map(({ id, ...solicitation }) => (
                <RegistrationRequestCard
                  id={id}
                  key={id}
                  isDetailsVisible={openCardDetails === id}
                  onOpenDetails={() => openCardCardDetails(id)}
                  onCloseDetails={() => closeCardDetails(id)}
                  onSubmitReload={fetchData}
                  onSubmitReview={handleSubmitReview}
                  {...solicitation}
                />
              ))
            )}
          </CardsContainer>
        </Container>
      </ContentWrapper>
    </Layout>
  );
}

const PageTitle = styled.div`
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
`;

const ContentWrapper = styled.div`
  width: 100%;
  padding: 2% 5%;
  display: flex;
  justify-content: center;
`;

const CardsContainer = styled.div`
  flex-direction: column;
  padding: 0 1%;
  display: grid;
  gap: 1rem;
`;
