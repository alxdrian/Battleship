import styled from "@emotion/styled";

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

  &:hover {
    border-color: white;
  }
`;

export default function Coordinate({ x, y }) {
  return (
    <CoordinateBlock>
      <CoordinatePin />
    </CoordinateBlock>
  );
}