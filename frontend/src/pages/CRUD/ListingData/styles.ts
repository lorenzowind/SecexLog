import styled, { keyframes } from 'styled-components';

const appearFromTop = keyframes`
  from {
    transform: translateY(-200px);
  }
  to {
    transform: translateX(0);
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  animation: ${appearFromTop} 1s;

  padding-top: 100px;
`;

export const DataSection = styled.div`
  h1 {
    color: #292eec;
    font-size: 24px;
    font-weight: 600;
  }

  hr {
    margin: 5px 0 35px 0;
  }

  strong {
    color: #707070;
    font-size: 24px;
    font-weight: 600;
  }

  > div {
    form {
      margin: 20px 0 40px 0;
      display: flex;
      justify-content: center;

      width: max-content;
      border-radius: 13px;
      border: solid 1px #707070;
      background-color: #ffffff;

      div {
        border: 0;
        padding: 8px 8px 8px 16px;
        background: transparent;
      }

      button {
        border: 0;
        background: transparent;
        padding: 8px 16px 8px 8px;
      }
    }
  }

  section {
    display: flex;
    align-items: center;

    button {
      border: 0;
      background: transparent;
      font-size: 40px;
      color: #707070;
      font-weight: 500;
      margin-left: 24px;
    }
  }

  table {
    margin: 20px 0 80px 0;
    padding: 10px 10px;
    height: 250px;
  }
`;
