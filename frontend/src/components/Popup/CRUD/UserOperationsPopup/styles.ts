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
    margin-bottom: 20px;
  }

  strong {
    color: #707070;
    font-size: 20px;
    font-weight: 400;
  }

  div {
    margin: 10px 0;
    height: 40px;
    width: 300px;
  }

  section {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 20px;

    button {
      &:first-child {
        border: 0;
        background: transparent;

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
