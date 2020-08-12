import styled, { keyframes } from 'styled-components';

const appearFromLeft = keyframes`
  from {
    transform: translateX(-50px);
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
  overflow: hidden;

  animation: ${appearFromLeft} 1s;
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
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    overflow-y: auto;
    width: 100%;
  }
`;

export const InputsContainer = styled.div`
  margin-bottom: 30px;
  overflow-y: auto;

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

  aside {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > div {
      height: 57px;
      margin: 15px 0;
      width: max-content;
      animation: ${handleAppearSection} 1s;

      select {
        width: 280px;
      }
    }
  }

  section {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    width: 100%;
    flex-wrap: wrap;
    margin-top: 15px;

    strong {
      margin: 0 20px;
    }

    div {
      height: 57px;
      margin: 0 15px;
      animation: ${handleAppearSection} 1s;
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
    width: 75px;
    background: transparent;
    border: 0;
    color: #818181;
    font-size: 18px;
    padding: 0;

    cursor: pointer;
  }
`;

export const OptionsContainer = styled.div`
  margin-bottom: 70px;
  margin-left: 20%;

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

  a {
    display: flex;
    flex-direction: row;
    align-items: center;

    border: 0;
    color: #707070;
    text-decoration: none;
    font-size: 20px;
    white-space: nowrap;
    margin-left: 30px;

    svg {
      margin-left: 8px;
    }
  }

  button {
    margin-right: 30px;
  }
`;
