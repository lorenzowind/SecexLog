import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
  overflow: hidden;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  margin: 50px 0;

  > img {
    margin-bottom: 50px;
  }
`;

export const InputsContainer = styled.div`
  margin-bottom: 50px;
  overflow-y: auto;

  section {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex-wrap: wrap;
    margin: 25px 0;

    strong {
      margin: 0 20px;
    }

    div {
      height: 57px;
      margin: 0 15px;
      width: max-content;
    }
  }
`;

export const CalendarInput = styled.div`
  background: #fff;
  border-radius: 35px;
  padding: 20px;
  border: 1px solid #707070;

  display: flex;
  align-items: center;

  img {
    margin: 0;
  }

  input {
    flex: 1;
    width: 95px;
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

  a {
    display: flex;
    flex-direction: row;
    align-items: center;

    border: 0;
    color: #707070;
    text-decoration: none;
    font-size: 20px;
    white-space: nowrap;
    margin-right: 30px;

    svg {
      margin-right: 8px;
    }
  }

  button {
    margin-left: 30px;
  }
`;
