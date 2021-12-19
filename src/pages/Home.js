import styled from "@emotion/styled";
import { Button } from "../components/UI/Button";
import { DefaultContainer, GameContainer, PageContainer } from "../components/UI/Container";
import { Link } from "react-router-dom";
import { ConfigIcon, PlayIcon, StatsIcon } from "../components/UI/Icon";
import { ContentRegular, Title } from "../components/UI/Text";
import { useEffect } from "react";

const LinkContainer = styled(DefaultContainer)`
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  a {
    width: 100%;
  }
`;

export default function Home () {
  useEffect(() => {
    const settings = localStorage.getItem("settings");
    if (!settings) {
      localStorage.setItem("settings", JSON.stringify({
        turns: 100,
        difficulty: "easy",
        userName: "",
      }));
    }
    const scores = localStorage.getItem("scores");
    if (!scores) {
      localStorage.setItem("scores", JSON.stringify({}));
    }
  }, []);

  return (
    <PageContainer>
      <GameContainer>
        <Title>BATTLESHIP</Title>
        <LinkContainer>
          <Link to="/battle"><Button><PlayIcon/><ContentRegular>BATTLE</ContentRegular></Button></Link>
          <Link to="/config"><Button><ConfigIcon/><ContentRegular>SETTINGS</ContentRegular></Button></Link>
          <Link to="/scores"><Button><StatsIcon/><ContentRegular>SCORES</ContentRegular></Button></Link>
        </LinkContainer>
      </GameContainer>
    </PageContainer>
  ) 
}