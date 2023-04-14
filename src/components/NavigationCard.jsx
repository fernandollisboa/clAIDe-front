import styled from "styled-components";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

export default function NavigationCard({ path, label }) {
  const navigate = useNavigate();

  function navigateToPath() {
    navigate(path);
  }

  return <NavigationCardWrapper onClick={navigateToPath}>{label}</NavigationCardWrapper>;
}

const NavigationCardWrapper = styled(Card)`
  background: #48bebb;
  color: white;
  justify-content: center;
  text-align: center;
  align-items: center;
  font-size: 2rem;
  height: 5rem;
  width: 100%;
  &:hover {
    background-color: #486fbd;
    border-color: green;
  }
`;
