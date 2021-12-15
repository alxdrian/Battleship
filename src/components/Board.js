import styled from "@emotion/styled";
import Coordinate from "./Coordinate";

const Table = styled.div`
  display: grid;
  grid-template-columns: repeat(11, 40px);
  grid-template-rows: repeat(11, 40px);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`;

const ColumnTitle = styled.div`
  width: 40px;
  height: 40px;
  background-color: #1C69B4;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`; 

const RowTitle = styled(ColumnTitle)`
`;

export function Board ({fleet, columns, rows}) {

  return (
    <Table>
      <div></div>
      {columns.map(column => <ColumnTitle key={`column-${column}`}>{column}</ColumnTitle>)}
      {rows.map(row => 
        <>
        <RowTitle key={`row-${row}`}>{row}</RowTitle>
        {columns.map(column => 
          <Coordinate key={`coordinate-${row}-${column}`} x={row} y={column} fleet={fleet}/>
        )}
        </>
      )}
    </Table>
  )
}