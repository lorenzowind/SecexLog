import styled, { keyframes } from 'styled-components';

const appearFromLeft = keyframes`
  from {
    transform: translateX(50px);
  }
  to {
    transform: translateX(0);
  }
`;

const handleAppearSection = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
  overflow-x: hidden;

  // animation: ${appearFromLeft} 1s;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  margin: 100px 0;

  > img {
    margin-bottom: 50px;

    &:first-child {
      height: 100px;
      margin-left: -55px;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
  }
`;

export const InputsContainer = styled.div`
  margin-bottom: 25px;

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

  section {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;

    // animation: ${handleAppearSection} 1s;

    & + section {
      margin-top: 15px;
    }

    strong {
      margin: 0 20px;
      font-size: 20px;
    }

    div {
      height: 57px;
      margin: 0 15px;
      width: max-content;

      select {
        width: 220px;
      }
    }
  }
`;

export const CalendarInput = styled.div`
  background: #fff;
  border-radius: 35px;
  padding: 16px 16px 16px 0;
  border: 1px solid #707070;

  display: flex;
  align-items: center;

  img {
    margin: 0;
  }

  input {
    flex: 1;
    width: 100px;
    background: transparent;
    border: 0;
    color: #6c6c80;
    font-size: 18px;
    padding: 0;

    cursor: pointer;
  }
`;

export const OptionsContainer = styled.div`
  margin-bottom: 25px;
  margin-left: 30%;

  ul {
    display: flex;
    flex-direction: row;

    list-style: none;

    li {
      button {
        display: flex;
        align-items: center;
        background: transparent;

        margin-right: 40px;
        font-size: 20px;
        color: #818181;
        border: 0;

        b {
          margin-right: 10px;
          color: #cccccc;
          font-size: 30px;
        }
      }
    }
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  button {
    margin-left: 30px;
  }
`;
