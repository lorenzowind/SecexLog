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
  justify-content: center;
  align-items: center;
  padding: 30px 60px;

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

  strong {
    text-align: center;
    color: #818181;
    line-height: 55px;
    font-size: 50px;
    font-weight: 500;
    margin: 20px 0;
    width: 350px;
  }

  section {
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      &:first-child {
        border: 0;
        background: transparent;
        color: #707070;
        font-size: 20px;
        margin-right: 20px;
      }

      &:nth-child(2) {
        width: 150px;
        margin-left: 20px;
      }
    }
  }
`;
