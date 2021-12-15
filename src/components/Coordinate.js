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
  box-shadow: 0px 0px 15px 0px #F47D11;

  &:hover {
    border-color: #F47D11;
`;

const LosePin = styled(CoordinatePin)`
  border: 5px solid #A8A39F;
  background-color: #636362;
  cursor: none;
  box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.75);

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