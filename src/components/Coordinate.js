import styled from "@emotion/styled";
import { useState } from "react";

const CoordinateBlock = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 540px) {
    width: 25px;
    height: 25px;
  }
`;

const CoordinatePin = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 5px solid #87d5d9;
  cursor: pointer;
  color: white;

  &:hover {
    border-color: white;
  }

  @media (max-width: 540px) {
    width: 9px;
    height: 9px;
    border: 2px solid #87d5d9;
  }
`;

const WinPin = styled(CoordinatePin)`
  border: 5px solid #F5B82A;
  background-color: #F47D11;
  cursor: not-allowed;
  box-shadow: 0px 0px 15px 2px #F47D11;

  &:hover {
    border-color: #F5B82A;
  }

  @media (max-width: 540px) {
    border: 2px solid #F5B82A;
    box-shadow: 0px 0px 7px 1px #F47D11;
  }
`;

const LosePin = styled(CoordinatePin)`
  border: 5px solid #A8A39F;
  background-color: #636362;
  cursor: not-allowed;
  box-shadow: 0px 0px 9px 2px rgba(0,0,0,0.75);

  &:hover {
    border-color: #A8A39F;
  }

  @media (max-width: 540px) {
    border: 2px solid #A8A39F;
    box-shadow: 0px 0px 7px 1px rgba(0,0,0,0.75);
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