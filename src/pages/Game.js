import { Board } from "../components/Board";
import { useState } from "react";

export default function Game () {
  const [isPlaying, setIsPlaying] = useState(false);
  const [ships, setShips] = useState([]);
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
    console.log(usedCoordinates);
  }

  function endGame() {
    setIsPlaying(false);
    setShips([]);
    usedCoordinates = {};
  }

  return (
    <div>
      {isPlaying ?
        <>
          <Board fleet={ships} columns={columns} rows={rows} />
          <div onClick={endGame}>End</div>
        </> : 
        <div onClick={createGame}>Start</div>
      }
    </div>
  )
}