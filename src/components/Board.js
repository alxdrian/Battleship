import styled from "@emotion/styled";
import Coordinate from "./Coordinate";
import { useEffect, useState } from "react";
import Ship from "./Ship";

const BoardContainer = styled.div`
  position: relative;
`;

const Table = styled.div`
  display: grid;
  grid-template-columns: repeat(11, 40px);
  grid-template-rows: repeat(11, 40px);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`;

const ColumnTitle = styled.div`
  width: 40px;
  height: 40px;
  background-color: #1C69B4;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`; 

const RowTitle = styled(ColumnTitle)`
`;

export function Board ({fleet, columns, rows, playTurn, turns, endGame}) {
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
    <BoardContainer>
      <Table>
        <div></div>
        {columns.map(column => <ColumnTitle key={`column-${column}`}>{column}</ColumnTitle>)}
        {rows.map(row => 
          <>
            <RowTitle key={`row-${row}`}>{row}</RowTitle>
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
    </BoardContainer>
  )
}