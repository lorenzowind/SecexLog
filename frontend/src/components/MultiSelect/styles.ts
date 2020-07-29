import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  div {
    font-size: 18px;
    color: #6c6c80;
    padding: 2px;

    > div {
      border-color: #707070;
      border-radius: 20px;

      &:nth-child(3) {
        border-radius: 10px;
      }
    }
  }
`;
