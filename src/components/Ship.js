import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const ShipContainer = styled.div`
  position: absolute;
  top: ${props => props.top * 40}px;
  left: ${props => props.left * 40}px;  
  ${props => props.orientation === "horizontal" ?
  `
    width: 40px;
    height: ${props.length * 40}px;  
  ` : 
  `
    width: ${props.length * 40}px;
    height: 40px;
  `}
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Armor = styled.div`
  background-color: #E7E3E0;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  ${props => props.orientation === "horizontal" ?
  `
    width: 20px;
    height: ${props.length * 35}px;  
  ` : 
  `
    width: ${props.length * 35}px;
    height: 20px;
  `}
  flex-wrap: wrap;
  border: 1px solid black;
  box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.75);

  div {
    width: 9px;
    height: 9px;
    background-color: #8B8B8A;
    border: 1px solid black;
    border-radius: 50%;
    box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.75);
  }
`;

export default function Ship ({ship, length, orientation, top, left, moves}) {
  const [isFound, setIsFound] = useState(false);

  useEffect(() => {
    const verifyMoves = {};
    moves.forEach(move => verifyMoves[move] = true);
    if (ship.every(coord => verifyMoves[coord])) {
      setIsFound(true);
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