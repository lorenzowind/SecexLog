import styled from 'styled-components';

export const Background = styled.div`
  position: absolute;
  z-index: 3;
  background-color: rgba(255, 255, 255, 0.2);
  width: 100%;
  height: 100%;
`;

export const FullContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;

  border: solid 1px #707070;
  border-radius: 35px;
  background-color: #ffffff;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
  width: 75%;

  > button {
    width: 50%;

    &:first-child {
      width: auto;
      right: 0;
      top: 0;
      margin: 16px 20px 0 0;
      position: absolute;
      border: 0;
      background: transparent;
    }
  }

  strong {
    color: #818181;
    font-size: 40px;
    font-weight: 500;
    margin-bottom: 30px;
  }
`;
