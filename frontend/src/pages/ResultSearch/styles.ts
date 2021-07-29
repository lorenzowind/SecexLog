import styled, { keyframes } from 'styled-components';

const appearFromTop = keyframes`
  from {
    transform: translateY(-100px);
  }
  to {
    transform: translateY(0);
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  z-index: 2;
  width: 100%;
  height: 100px;
  position: absolute;
  padding: 20px 70px 0 0;

  // animation: ${appearFromTop} 1s;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  // animation: ${appearFromTop} 1s;

  padding-top: 100px;
  padding-bottom: 100px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;

  > section {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 60px;
  }

  > footer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 100px;

    > strong {
      font-size: 32px;
      line-height: 50px;
      color: #707070;
    }
  }
`;

export const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 0;

  button {
    position: absolute;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 80px;
    height: 80px;
    border-radius: 21px;
    border: solid 1px #e6dfdf;
    background-color: rgba(255, 255, 255, 0);

    img {
      height: 50px;
    }
  }

  div {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    strong {
      font-size: 42px;
      font-weight: 600;
      color: #707070;
    }

    img {
      margin-top: 23px;
    }
  }
`;

export const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-top: 37px;

  nav {
    button {
      border: 0;
      background: transparent;

      & + button {
        margin-left: 50px;
      }
    }
  }

  strong {
    border-radius: 24px;
    border: solid 1px #cecece;
    background-color: #e8e8eb;
    padding: 10px 16px;
    max-width: 220px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const ModalsImages = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 10%;

  img {
    width: 40px;
    height: 40px;

    & + img {
      margin-top: 20px;
    }
  }
`;

export const PathCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 38px;
  border: solid 1px #3dbec6;
  background-color: #ffffff;
  width: 90%;

  section {
    width: 75%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-right: 1px solid rgba(0, 0, 0, 0.1);

    aside {
      display: flex;
      flex-direction: row;
      margin: 20px 0;

      div {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin: 0 20px;

        &:first-child {
          align-items: flex-end;
          margin: 0;
          margin-right: 20px;
        }

        &:last-child {
          align-items: flex-start;
          margin: 0;
          margin-left: 20px;
        }

        strong {
          color: #818181;
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 10px;
        }

        h2 {
          margin: 0;
          font-size: 16px;
          font-weight: 400;
        }
      }
    }

    > h3 {
      margin: 0;
      margin-bottom: 10px;
      font-weight: 300;
      font-size: 16px;
      color: #818181;
    }

    > h4 {
      margin: 0;
      font-weight: 300;
      font-size: 16px;
      color: #fc0e0e;

      &:last-child {
        margin-bottom: 10px;
      }
    }
  }

  div {
    width: 25%;
  }
`;

export const PathSelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;

  strong {
    margin: 0;
    font-size: 36px;
    font-weight: 600;
    color: #707070;
  }

  h1 {
    margin: 0;
    margin-top: 10px;
    font-size: 22px;
    font-weight: 500;
    color: #707070;
  }

  button {
    margin-top: 10px;
  }
`;

export const LoadButtonContainer = styled.div`
  width: 100%;
  height: 53px;
  margin-top: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  button {
    background: none;
    border: 0;
    font-size: 28px;
    font-weight: 600;
    color: #707070;
  }
`;
