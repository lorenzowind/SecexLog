import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  border-radius: 35px;
  padding: 8px 16px;
  width: 100%;

  border: 1px solid #707070;
  color: #666360;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #6c6c80;
    font-size: 18px;

    &::placeholder {
      color: #666360;
    }
  }

  img {
    margin-right: 16px;
  }
`;
