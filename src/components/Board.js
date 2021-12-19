import styled from "@emotion/styled";
import Coordinate from "./Coordinate";
import { useEffect, useState } from "react";
import Ship from "./Ship";
import { ContentXSmall } from "./UI/Text";

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
`;

const RowTitle = styled(ColumnTitle)`
`;

export function Board ({fleet, columns, rows, playTurn, turns, endGame, locked}) {
  const [moves, setMoves] = useState([]);
  const [shipsFound, setShipsFound] = useState([]);

  useEffect(() => {
    if (shipsFound.length === fleet.length) {
      console.log("You win!");
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
      {locked && <BoardLocked />}
    </BoardContainer>
  )
}