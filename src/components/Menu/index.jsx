import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

import arrow from "../../assets/arrow.svg";

export default function Menu({
  type,
  desc,
  handleToggleDesc,
  nameToBeSearched,
  handleChangeSearch,
  handleToggleIsActive,
  url,
}) {
  return (
    <Container>
      <Title>{type} cadastrados</Title>
      <InputSearch
        value={nameToBeSearched}
        placeholder="Pesquisar por nome..."
        type="text"
        onChange={handleChangeSearch}
      />
      <FilterButton onClick={handleToggleDesc} desc={desc}>
        <span>Nome</span>
        <img src={arrow} alt="Arrow" />
      </FilterButton>
      <Filters>
        <span>Filtrar por: </span>
        <select onClick={handleToggleIsActive}>
          <option value={true}>Ativos</option>
          <option value={false}>Inativos</option>
          <option value={""}>Todos</option>
        </select>
      </Filters>

      <Link to={url} className="register-button">
        Cadastrar
      </Link>
    </Container>
  );
}
Menu.propTypes = {
  type: PropTypes.string.isRequired,
  desc: PropTypes.bool.isRequired,
  handleToggleDesc: PropTypes.func.isRequired,
  nameToBeSearched: PropTypes.string.isRequired,
  handleChangeSearch: PropTypes.func.isRequired,
  handleToggleIsActive: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 68%;
  margin: 1% auto;
  .register-button {
    border: 2px solid #131313;
    text-decoration: none;
    border-radius: 4px;
    padding: 1.2vh 2vh;
    color: #131313;
    font-weight: 700;
    font-size: 1rem;
  }
`;
const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
`;
const FilterButton = styled.button`
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

const Filters = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #131313;
  border-radius: 4px;
  font-size: 1rem;
  padding: 0 1%;
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
