import { GameContainer, InfoContainer, PageContainer } from "../components/UI/Container";
import { ContentRegular, ContentSmall, Title } from "../components/UI/Text";
import { Link } from "react-router-dom";
import { HomeIcon } from "../components/UI/Icon";
import { IconButton } from "../components/UI/Button";

export default function Scores () {
  const scores = JSON.parse(localStorage.getItem("scores")).list || [];
  const sortByScore = scores.sort((a, b) => b[1] - a[1]);

  return (
    <PageContainer>
      <GameContainer orientation="vertical">
        <Title>Scores</Title>
        {sortByScore.map((score) => (
          <InfoContainer key={score[0]+score[1]}>
            <ContentRegular>{score[0]}</ContentRegular>
            <ContentSmall>{score[1]}</ContentSmall>
          </InfoContainer>
        ))}
        <Link to="/">
          <IconButton>
            <HomeIcon />
          </IconButton>
        </Link>
      </GameContainer>
      
    </PageContainer>
  )
}