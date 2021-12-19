import styled from "@emotion/styled";
import { Board } from "../components/Board";
import { useState, useEffect } from "react";
import { ButtonContainer, GameContainer, InfoContainer, PageContainer } from "../components/UI/Container";
import { ContentRegular, ContentSmall, ContentXLarge, Title } from "../components/UI/Text";
import { Button, IconButton } from "../components/UI/Button";
import { Link } from "react-router-dom";
import { ConfigIcon, HomeIcon, RestartIcon, StopIcon } from "../components/UI/Icon";
export default function Game () {
  const [isPlaying, setIsPlaying] = useState(false);
  const [ships, setShips] = useState([]);
  const settings = JSON.parse(localStorage.getItem("settings"));
  const [turns, setTurns] = useState(settings.turns || 100);
  const [rePlay, setRePlay] = useState(false);
  const [score, setScore] = useState(0);
  let usedCoordinates = {};

  const columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const rows = ["A","B","C","D","E","F","G","H","I","J"];
      
  function randomPosition(length) {
    const random = Math.floor(Math.random() * 11) - length + 1 ;
    if (random < 1) {
      return randomPosition(length);
    } else { 
      return random;
    }
  }

  function createFleet() {
    let fleet = [];
    fleet.push(createShip(4));
    for (let i = 0; i < 2; i++) {
      fleet.push(createShip(3));
    }
    for (let i = 0; i < 3; i++) {
      fleet.push(createShip(2));
    }
    for (let i = 0; i < 4; i++) {
      fleet.push(createShip(1));
    }
    return fleet;
  }

  function createShip(length) {
    const ship = [];
    const vertical = Math.random() >= 0.5;
    const randomRow = rows[Math.floor(Math.random() * 10)];
    const randomColumn = columns[Math.floor(Math.random() * 10)];
    const randomInit = randomPosition(length);
    for (let i = 0; i < length; i++) {
      if (vertical) {
        ship.push([rows[randomInit + i - 1], randomColumn]);
      } else {
        ship.push([randomRow, randomInit + i]);
      }
    }
    if (ship.some(coord => usedCoordinates[coord])) {
      return createShip(length);
    } else {
      ship.forEach(coord => usedCoordinates[coord] = true);
      return ship;
    }
  }

  function createGame() {
    setIsPlaying(true);
    setShips(createFleet());
  }

  function askReplay() {
    setRePlay(true);
    switch(settings.difficulty) {
      case "easy":
        updateScore(turns * 10);
        break;
      case "medium":
        updateScore(turns * 25);
        break;
      case "hard":
        updateScore(turns * 50);
        break;
      default:
        updateScore(turns * 10);
    }
  }

  function endGame() {
    setRePlay(false);
    setIsPlaying(false);
    setShips([]);
    usedCoordinates = {};
    setTurns(settings.turns);
    setScore(0);
  }

  function playTurn() {
    setTurns(turns - 1);
  }

  function updateScore(number) {
    score + number < 0 ? setScore(0) : setScore(score + number);
  }

  return (
    <PageContainer>
      <GameContainer>
        <GameStats>
          <Title>Battle</Title>
          <InfoContainer>
            <ContentRegular>Difficulty</ContentRegular>
            <ContentSmall>{settings.difficulty}</ContentSmall>
          </InfoContainer>
          <InfoContainer>
            <ContentRegular>Turns</ContentRegular>
            <ContentSmall>{turns}</ContentSmall>
          </InfoContainer>
          <InfoContainer>
            <ContentRegular>Score</ContentRegular>
            <ContentSmall>{score}</ContentSmall>
          </InfoContainer>
          {isPlaying ? 
            <>
              {rePlay ?
                <ButtonContainer>
                  <Button onClick={endGame}>
                    <RestartIcon />
                    <ContentSmall>RETRY</ContentSmall>
                  </Button>
                  <Link to="/">
                    <IconButton>
                      <HomeIcon />
                    </IconButton>
                  </Link>
                </ButtonContainer> :
                <Button onClick={endGame}>
                  <StopIcon />
                  <ContentSmall>I GIVE UP!</ContentSmall>
                </Button>
              } 
            </>:
          <ButtonContainer>
            <Link to="/config">
              <Button>
                <ConfigIcon />
                <ContentSmall>SETTINGS</ContentSmall>
              </Button>
            </Link>
            <Link to="/">
              <IconButton>
                <HomeIcon />
              </IconButton>
            </Link>
          </ButtonContainer>
          }
        </GameStats>
        {isPlaying ?
          <Board
            fleet={ships}
            columns={columns}
            rows={rows}
            turns={turns}
            playTurn={playTurn}
            endGame={askReplay}
            locked={rePlay}
            updateScore={updateScore}
            score={score}
          />
          : 
          <Start onClick={createGame}><ContentXLarge>START</ContentXLarge></Start>
        }
      </GameContainer>
    </PageContainer>
  )
}

const Start = styled(Button)`
  width: 460px;
  height: 460px;
  justify-content: center;
  background-color: #50a9e7;
  border-radius: 10px;

  @media (max-width: 540px) {
    width: 295px;
    height: 295px;
  }
`;

const GameStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;