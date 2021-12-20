import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const ShipContainer = styled.div`
  position: absolute;
  top: ${props => props.top * 40 + 10}px;
  left: ${props => props.left * 40 + 10}px;

  @media (max-width: 540px) {
    top: ${props => props.top * 25 + 10}px;
    left: ${props => props.left * 25 + 10}px;
  }

  ${props => props.orientation === "horizontal" ?
  `
    width: 40px;
    height: ${props.length * 40}px;

    @media (max-width: 540px) {
      width: 25px;
      height: ${props.length * 25}px;
    }
  ` : 
  `
    width: ${props.length * 40}px;
    height: 40px;

    @media (max-width: 540px) {
      height: 25px;
      width: ${props.length * 25}px;
    }
  `}
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Armor = styled.div`
  background-color: #f0863d;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #aa2b46;
  ${props => props.orientation === "horizontal" ?
  `
    width: 20px;
    height: ${props.length * 35}px;

    @media (max-width: 540px) {
      width: 12px;
      height: ${props.length * 22}px;
    }
  ` : 
  `
    width: ${props.length * 35}px;
    height: 20px;

    @media (max-width: 540px) {
      height: 12px;
      width: ${props.length * 22}px;
      line-height: 14px;
      font-size: 12px;
    }
  `}
  flex-wrap: wrap;
  border: 2px solid #aa2b46;
  box-shadow: 0px 0px 15px 0px #F47D11;

  div {
    width: 9px;
    height: 9px;
    background-color: #aa2b46;
    border: 1px solid black;
    border-radius: 50%;
    box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.75);

    @media (max-width: 540px) {
      width: 5px;
      height: 5px;
    }
  }
`;

export default function Ship ({ship, length, orientation, top, left, moves, saveShip}) {
  const [isFound, setIsFound] = useState(false);

  useEffect(() => {
    const verifyMoves = {};
    moves.forEach(move => verifyMoves[move] = true);
    if (ship.every(coord => verifyMoves[coord])) {
      setIsFound(true);
      saveShip(ship);
    }
  }, [moves, ship]);
    

  return (
    <>
      {isFound &&
      <ShipContainer length={length} orientation={orientation} top={top} left={left}>
        <Armor length={length} orientation={orientation}>
          <div></div>
          <div></div>
        </Armor>
      </ShipContainer>
      }
    </>
  );
}