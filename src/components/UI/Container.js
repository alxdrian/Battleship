import styled from "@emotion/styled";

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
`;

export const GameContainer = styled.div`
  padding: 30px;
  background-color: #f6f6f9a1;
  box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  display: flex;
  gap: 20px;
  margin: auto auto;
  align-items: center;
  max-height: 85vh;
  overflow: scroll;
  position: relative;

  &::-webkit-scrollbar {
    display: none;
    
  }

  @media (max-width: 768px) {
    width: 80%;
    flex-direction: column;
  }
`;

export const DefaultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const InfoContainer = styled(DefaultContainer)`
  padding: 5px 10px;
  flex-direction: row;
  justify-content: space-around;
  background-color: #f6f6f9c9;
  border-radius: 10px;
  color: #9595dd;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
`;
