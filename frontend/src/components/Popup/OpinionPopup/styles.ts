import styled from 'styled-components';
import { shade } from 'polished';

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
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px 120px;

    > button {
      &:first-child {
        right: 0;
        top: 0;
        margin: 16px 20px 0 0;
        position: absolute;
        border: 0;
        background: transparent;
      }

      &:last-child {
        background: #6ae8e5;
        border-radius: 50%;
        border: 0;
        padding: 8px 16px;
        align-self: flex-end;
        margin-right: -80px;

        &:hover {
          background: ${shade(0.1, '#6ae8e5')};
        }
      }
    }

    strong {
      color: #818181;
      font-size: 40px;
      line-height: 55px;
      font-weight: 500;
      margin: 20px 20px;
    }

    div {
      height: 60px;
      margin-bottom: 30px;
    }

    section {
      display: flex;
      width: 140%;

      textarea {
        width: 100%;
        height: 200px;
      }
    }
  }
`;
