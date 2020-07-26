import styled from 'styled-components';

export const Background = styled.div`
  position: absolute;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.2);
  width: 100%;
  height: 100%;
`;

export const Container = styled.div`
  position: absolute;
  z-index: 1;
  right: 0;
  top: 0;
  margin: 90px 190px 0 0;
  overflow: hidden;
  border: solid 1px #707070;
  border-radius: 35px;
  background-color: #ffffff;
`;

export const Content = styled.div`
  padding: 45px 30px 10px 30px;

  strong {
    position: absolute;
    top: 0;
    padding: 30px 0 0 20px;
    color: #ff2d2d;
  }

  > button {
    right: 0;
    top: 0;
    margin: 16px 20px 0 0;
    position: absolute;
    border: 0;
    background: transparent;
  }

  div {
    margin: 20px 0;
  }
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  button {
    margin: 20px 20px 0 20px;
    height: max-content;

    &:first-child {
      border: 0;
      background: transparent;
      color: #707070;
      font-size: 18px;
      white-space: nowrap;
    }

    &:nth-child(2) {
      padding: 6px 24px;
    }
  }
`;
