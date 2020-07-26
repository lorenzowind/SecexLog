import styled from 'styled-components';

export const Background = styled.div`
  position: fixed;
  z-index: 1;
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
  padding: 40px 80px;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    button {
      width: max-content;
      height: max-content;
      padding: 8px 24px;
    }
  }

  button {
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
    color: #818181;
    font-size: 50px;
    font-weight: 500;
    margin-bottom: 15px;
  }

  h2 {
    color: #818181;
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 30px;
  }

  div {
    height: 60px;
    width: 400px;
    margin-bottom: 30px;
  }
`;
