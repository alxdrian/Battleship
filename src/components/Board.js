import styled from "@emotion/styled";
import Coordinate from "./Coordinate";
import { useEffect, useState } from "react";
import Ship from "./Ship";
import { ContentXLarge, ContentRegular, ContentXSmall } from "./UI/Text";
import { Input } from "./UI/Input";
import { Button } from "./UI/Button";
import { SaveIcon } from "./UI/Icon";

const BoardContainer = styled.div`
  position: relative;
  background-color: #50a9e7;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 10px 15px 5px rgba(0, 0, 0, 0.1);
`;

const Table = styled.div`
  display: grid;
  grid-template-columns: repeat(11, 40px);
  grid-template-rows: repeat(11, 40px);
  grid-column-gap: 0px;
  grid-row-gap: 0px;

  @media (max-width: 540px) {
    grid-template-columns: repeat(11, 25px);
    grid-template-rows: repeat(11, 25px);
  }
`;

const ColumnTitle = styled.div`
  width: 40px;
  height: 40px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 540px) {
    width: 25px;
    height: 25px;
  }
`;

const BoardLocked = styled(BoardContainer)`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  background-color: #f6f6f9a1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  div {
    display: flex;
    flex-direction: column; 
    width: 50%;
    background-color: #f6f6f9c9;
    align-items: center;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
    gap: 10px;
    color: #9595dd;

    input {
      width: 100%;
    }

    @media (max-width: 540px) {
      width: 75%;
    }
  }
`;

const RowTitle = styled(ColumnTitle)`
`;

export function Board ({fleet, columns, rows, playTurn, turns, endGame, locked, updateScore, score, shipsToFind}) {
  const [moves, setMoves] = useState([]);
  const [shipsFound, setShipsFound] = useState([]);
  const settings = localStorage.getItem("settings");
  const [userName, setUserName] = useState(settings ? JSON.parse(settings).userName : "");
  const [scoreSaved, setScoreSaved] = useState(false);
  const [winner, setWinner] = useState("");

  useEffect(() => {
    const restShips = fleet.filter(ship => !shipsFound.includes(ship));
    const counter = {};
    restShips.forEach(ship => {
      if (counter[ship.length]) {
        counter[ship.length]++;
      } else {
        counter[ship.length] = 1;
      }
    });
    shipsToFind(counter);
    if (shipsFound.length === fleet.length) {
      setWinner(true);
      endGame();
    }
    if (turns === 0) {
      console.log("You lose!");
      endGame();
    }
  }, [moves, shipsFound]);

  function addMove(coord) {
    setMoves([...moves, coord]);
    playTurn();
  }

  function saveShipFounded(ship) {
    if (!shipsFound.includes(ship)) {
      setShipsFound([...shipsFound, ship]);
    }
  }

  function handleChangeName(e) {
    e.preventDefault();
    setUserName(e.target.value);
  }

  function handleSubmitScore(e) {
    e.preventDefault();
    if (userName.length > 0) {
      let scores = JSON.parse(localStorage.getItem("scores")).list;
      scores.push([userName, score]);
      localStorage.setItem("scores", JSON.stringify({
        list: scores
      }));
      setScoreSaved(true);
    }
  }

  return (
    <BoardContainer locked={locked}>
      <Table>
        <div></div>
        {columns.map(column => <ColumnTitle key={`column-${column}`}><ContentXSmall>{column}</ContentXSmall></ColumnTitle>)}
        {rows.map(row => 
          <>
            <RowTitle key={`row-${row}`}><ContentXSmall>{row}</ContentXSmall></RowTitle>
            {columns.map(column => 
              <Coordinate
                key={`coordinate-${row}-${column}`}
                x={row}
                y={column}
                fleet={fleet}
                saveCoord={addMove}
                ship={fleet.find(ship => ship.some(coord => coord[0] === row && coord[1] === column))}
                updateScore={updateScore}
              />
            )}
          </>
        )}
      </Table>
      {fleet.map(ship => 
        <Ship
          key={`ship-${[...ship]}`}
          ship={ship}
          length={ship.length}
          orientation={
            ship.length === 1 || ship[0][1] === ship[1][1] ? "horizontal" : "vertical"
          }
          top={rows.findIndex(letter => letter === ship[0][0]) + 1}
          left={ship[0][1]}
          moves={moves}
          saveShip={saveShipFounded}
        />)}
      {locked && 
        <BoardLocked>
          {!scoreSaved &&
            <div>
              <ContentXLarge>YOU {winner ? "WIN" : "LOSE"} !</ContentXLarge>
              <ContentRegular>Save score?</ContentRegular>
              <ContentXSmall>Enter your name:</ContentXSmall>
              <Input type="text" value={userName} onChange={handleChangeName} />
              <Button onClick={handleSubmitScore}>
                <SaveIcon />
                <ContentRegular>SAVE</ContentRegular>
              </Button>
            </div>
          }
        </BoardLocked>
      }
    </BoardContainer>
  )
}