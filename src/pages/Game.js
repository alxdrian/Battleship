import { Board } from "../components/Board";

export default function Game () {
  const columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const rows = ["A","B","C","D","E","F","G","H","I","J"];
  const coords = [];
  rows.forEach(row => { columns.forEach(column => { coords.push([row, column]) }) });

  const fleet = [];
  const usedCords = {};

  function randomPosition(length) {
    const random = Math.floor(Math.random() * 11) - length + 1 ;
    if (random < 1) {
      return randomPosition(length);
    } else { 
      return random;
    }
  }

  function createShipCoords(length) {
    const ship = [];
    const vertical = Math.random() >= 0.5;
    const randomRow = rows[Math.floor(Math.random() * 10)];
    const randomColumn = columns[Math.floor(Math.random() * 10)];
    const randomInit = randomPosition(length);
    for (let i = 0; i < length; i++) {
      if (vertical) {
        createShipCoords.push([rows[randomInit + i - 1], randomColumn]);
      } else {
        ship.push([randomRow, randomInit + i]);
      }
    }
    if (ship.some(coords => usedCords[coords])) {
      return createShipCoords(length);
    } else {
      ship.forEach(coords => usedCords[coords] = true);
      fleet.push(ship);
    }
  }

  return (
    <div>
      <Board coordinates={coords}></Board>
    </div>
  )
}