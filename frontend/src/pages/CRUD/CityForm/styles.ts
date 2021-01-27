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

  h2 {
    font-size: 18px;
  }

  select {
    width: 100%;
  }

  form {
    > div {
      display: flex;
      align-items: center;
      width: 100%;
      margin: 0 0 30px 0;

      img {
        margin-left: 20px;
      }

      nav {
        div {
          margin-top: 10px;
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type='number'] {
          -moz-appearance: textfield;
        }

        &:first-child {
          margin-right: 40px;
        }
        &:nth-child(2) {
          margin-left: 40px;
        }
      }

      section {
        white-space: nowrap;
        margin-left: 20px;

        section {
          display: flex;
          justify-content: flex-start center;

          h2 {
            &:first-child {
              margin-bottom: 10px;
            }
            &:nth-child(2) {
              margin-top: 10px;
            }
          }
        }
      }
    }

    > section {
      > div {
        justify-content: center;
        padding: 20px 0 30px 0;
      }
    }

    > nav {
      > div {
        margin: 10px 0 30px 0;
      }
    }
  }

  textarea {
    margin-top: 10px;
    width: 100%;
    height: 150px;
  }
`;
