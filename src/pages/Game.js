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
    if (ship.some(coords => usedCords[coords])) {
      return createShip(length);
    } else {
      ship.forEach(coords => usedCords[coords] = true);
      fleet.push(ship);
    }
  }

  function createFleet() {
    createShip(4);
    for (let i = 0; i < 2; i++) {
      createShip(3);
    }
    for (let i = 0; i < 3; i++) {
      createShip(2);
    }
    for (let i = 0; i < 4; i++) {
      createShip(1);
    }
  }

  function createGame() {
    createFleet();
    console.log(fleet);
  }

  return (
    <div>
      <div onClick={createGame}>Start</div>
      <Board coordinates={coords} fleet={fleet}></Board>
    </div>
  )
}