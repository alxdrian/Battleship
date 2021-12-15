import styled from "@emotion/styled";
import Coordinate from "./Coordinate";

const Table = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 40px);
  grid-template-rows: repeat(10, 40px);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`;

export function Board ({coordinates, children}) {
  return (
    <Table>
      {coordinates.map(coordinate => 
        <Coordinate key={`${coordinate[0]}${coordinate[1]}`} x={coordinate[0]} y={coordinate[1]} />
      )}
    </Table>
  )
}