import styled from "@emotion/styled";

const Table = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 40px);
  grid-template-rows: repeat(10, 40px);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`;

export function Board ({children}) {
  return (
    <Table>
      {children}
    </Table>
  )
}