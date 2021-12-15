import styled from "@emotion/styled";
import { useState } from "react";

const CoordinateBlock = styled.div`
  width: 40px;
  height: 40px;
  background-color: #1C69B4;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoordinatePin = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 5px solid #57A0E7;
  cursor: pointer;
  color: white;

  &:hover {
    border-color: white;
  }
`;

const WinPin = styled(CoordinatePin)`
  border: 5px solid #F5B82A;
  background-color: #F47D11;
  cursor: none;

  &:hover {
    border-color: #F47D11;
`;

const LosePin = styled(CoordinatePin)`
  border: 5px solid #9B978F;
  background-color: #A8A39F;
  cursor: none;

  &:hover {
    border-color: #A8A39F;
  }
`;

export default function Coordinate({ x, y, saveCoord, ship}) {
  const [isHit, setIsHit] = useState(false);

  function handleClick() {
    setIsHit(true);
    saveCoord([x, y]);
  }

  return (
    <CoordinateBlock>
      {isHit ? (ship ? <WinPin/> : <LosePin/>) : <CoordinatePin onClick={handleClick} />}
    </CoordinateBlock>
  );
}