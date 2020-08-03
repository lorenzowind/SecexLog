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

  h2 {
    color: #707070;
    font-size: 18px;
    font-weight: 400;
    margin: 5px 0;
  }

  h3 {
    color: #707070;
    font-size: 36px;
    font-weight: 600;
  }

  h4 {
    color: #707070;
    font-size: 24px;
    font-weight: 500;
  }

  hr {
    margin: 5px 0 35px 0;
  }

  form {
    > aside {
      display: flex;
      justify-content: flex-end;

      button {
        width: 30%;
      }
    }
  }
`;

export const InputsContainer = styled.div`
  strong {
    font-size: 20px;
    font-weight: 600;
  }

  form {
    div {
      > nav {
        margin: 10px 0 30px 0;

        > nav {
          display: flex;
          flex-direction: row;

          > button {
            border: 0;
            background: transparent;
            margin-right: 10px;
          }
        }
      }

      > div {
        margin: 10px 0 30px 0;
        height: 50px;
      }

      aside {
        display: flex;

        > div {
          margin: 10px 20px 0 0;
          height: 50px;
          width: 220px;
        }

        > button {
          border: 0;
          background: transparent;
        }
      }

      section {
        margin: 10px 0 30px 0;
        display: flex;
        align-items: center;

        span {
          font-size: 18px;
          font-weight: 400;
        }

        > img {
          height: 38px;
        }

        div {
          display: flex;
          flex-direction: row;
          height: 50px;
          width: 310px;

          select {
            width: 270px;
          }
        }
      }
    }

    > nav {
      > div {
        margin: 10px 0 30px 0;
        height: 50px;
      }
    }

    section {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      nav {
        width: 220px;

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type='number'] {
          -moz-appearance: textfield;
        }

        > div {
          margin: 10px 0 30px 0;
          height: 50px;
        }
      }
    }
  }
`;
