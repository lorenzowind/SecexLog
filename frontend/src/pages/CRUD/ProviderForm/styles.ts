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

  // animation: ${appearFromTop} 1s;

  padding-top: 100px;
  padding-bottom: 100px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;

  > img {
    position: absolute;
    margin-left: -80px;
  }

  h1 {
    color: #292eec;
    font-size: 24px;
    font-weight: 600;
    margin-top: 10px;
  }

  hr {
    margin: 5px 0 35px 0;
  }

  aside {
    display: flex;
    justify-content: flex-end;

    button {
      width: 30%;
    }
  }
`;

export const InputsContainer = styled.div`
  strong {
    font-size: 20px;
    font-weight: 600;
  }

  form {
    > div {
      > div {
        margin: 10px 0 30px 0;
        height: 50px;
      }
    }

    > section {
      display: flex;
      flex-direction: row;

      > div {
        > div {
          margin: 10px 0 30px 0;
          height: 50px;
          width: 340px;
          margin-right: 20px;
        }
      }
    }
  }
`;
