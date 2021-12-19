import styled from "@emotion/styled"

export const Input = styled.input`
    height: 40px;
    background: #f6f6f987;
    border: none;
    border-bottom: 2px solid #9595dd;
    box-sizing: border-box;
    border-radius: 20px;
    padding: 8px 16px;
    color: #9595dd;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);

    &:focus {
      outline: none;
      background: #9595dd;
      color: #ffff;
    }
`;