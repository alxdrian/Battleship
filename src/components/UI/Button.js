import styled from "@emotion/styled";

export const Button = styled.button`
  display: flex;
  gap: 10px;
  padding: 5px 15px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 20px;
  background-color: #9595dd;
  color: #ffff;
  cursor: pointer;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  
  svg {
    width: 30px;
    height: 30px;
  }
`;

export const IconButton = styled(Button)`
  width: 40px;
  height: 40px;
  position: absolute
  align-items: center;
  justify-content: center;
  padding: 0;
`;

export const HomeButton = styled(IconButton)`
  top: 10px;
  right: 10px;
`;
