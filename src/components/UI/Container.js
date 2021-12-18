import styled from "@emotion/styled";

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
`;

export const GameContainer = styled.div`
  padding: 30px 0;
  background-color: #f6f6f9a1;
  box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  width: 60%;
  gap: 20px;
  margin: auto auto;
  align-items: center;
  max-height: 80vh;
  overflow: scroll;
  position: relative;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    width: 95%;
  }
`;

export const DefaultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;