import styled from 'styled-components';

export const Background = styled.div`
  position: fixed;
  z-index: 3;
  background-color: rgba(255, 255, 255, 0.2);
  width: 100%;
  height: 100%;
`;

export const FullContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  border: solid 1px #707070;
  border-radius: 35px;
  background-color: #ffffff;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 40px;
  width: 500px;

  > button {
    &:first-child {
      right: 0;
      top: 0;
      margin: 16px 20px 0 0;
      position: absolute;
      border: 0;
      background: transparent;
    }
  }

  h1 {
    color: #707070;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 10px;
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

  strong {
    color: #707070;
    font-size: 20px;
    font-weight: 400;
  }

  form {
    > div {
      > section {
        max-height: 100px;
        overflow-y: auto;
        margin-bottom: 20px;

        &::-webkit-scrollbar {
          width: 7px;
        }

        &::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        &::-webkit-scrollbar-thumb {
          background: #888;
        }

        &::-webkit-scrollbar-thumb:hover {
          background: #555;
        }

        article {
          display: flex;

          button {
            margin-right: 10px;
          }
        }
      }
    }

    > nav {
      display: flex;
      justify-content: space-between;
      align-items: center;

      > img {
        margin: 10px 0 20px 0;
      }

      > div {
        width: 185px;

        > div {
          height: 50px;
          margin: 10px 0 20px 0;

          select {
            width: 145px;
          }
        }
      }
    }

    > aside {
      display: flex;
      align-items: center;

      > button {
        border: 0;
        background: transparent;
      }

      > div {
        width: 165px;
        margin-right: 15px;

        > div {
          height: 50px;
          margin: 10px 0 20px 0;
        }
      }
    }

    > section {
      display: flex;
      justify-content: space-between;
      align-items: center;

      > div {
        width: 125px;

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type='number'] {
          -moz-appearance: textfield;
        }

        > div {
          height: 50px;
          margin: 10px 0 20px 0;
        }
      }
    }

    > footer {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      strong {
        margin-right: 20px;
      }

      div {
        display: flex;
        flex-direction: row;
      }
    }

    button {
      &:first-child {
        border: 0;
        background: transparent;
        color: #707070;
        font-size: 20px;

        img {
          width: 45px;
          height: 45px;
        }
      }

      &:nth-child(2) {
        width: 150px;
      }
    }
  }
`;
