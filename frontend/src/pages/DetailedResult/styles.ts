import styled, { keyframes } from 'styled-components';

const appearFromRight = keyframes`
  from {
    transform: translateX(100px);
  }
  to {
    transform: translateX(0);
  }
`;

export const Container = styled.div`
  // animation: ${appearFromRight} 1s;
  flex-direction: row;
  height: 100vh;
`;

export const PathDetailed = styled.div`
  position: absolute;
  height: 100vh;
  min-width: 700px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #fff;

  padding: 20px 20px 20px 120px;

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
`;

export const PathDetailedClosed = styled.div`
  position: absolute;
  height: 100vh;
  max-width: 160px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #fff;

  padding: 20px 10px 20px 90px;

  > button {
    width: 60px;
    height: 60px;
    border-radius: 13px;
    border: solid 1px #e6dfdf;
    background-color: rgba(255, 255, 255, 0);

    h1 {
      font-size: 18px;
      font-weight: 500;
      color: #c5c5c5;
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
    display: flex;
    justify-content: center;
    align-items: center;

    width: 80px;
    height: 80px;
    border-radius: 21px;
    border: solid 1px #e6dfdf;
    background-color: rgba(255, 255, 255, 0);

    &:first-child {
      left: 0;
    }
    &:last-child {
      right: 0;
    }

    h1 {
      font-size: 24px;
      font-weight: 500;
      color: #c5c5c5;
    }

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

export const PeriodContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 30px 20px 0 23px;

  div {
    position: absolute;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 30px;
      height: 30px;
    }
  }

  strong {
    font-size: 24px;
    font-weight: 500;
    color: #c5c5c5;
  }

  b {
    font-size: 24px;
    font-weight: 700;
    margin: 0 10px;
  }
`;

export const PathsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 40px 20px 20px 20px;
`;

export const UniquePathContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-left: 2px solid #f1f1f1;
  padding-bottom: 29px;

  &:last-child {
    border-left: 0;
  }

  > nav {
    margin-left: -16px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #2327f3;
    margin-right: 20px;
  }

  > section {
    margin-left: -16px;
    margin-right: 20px;
    position: relative;

    img {
      width: 30px;
    }

    strong {
      position: absolute;
      margin-left: -20px;
      margin-top: 5px;
      font-size: 18px;
      font-weight: 500;
      color: #707070;
    }
  }

  article {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 40px;

    h3 {
      margin: 0;
      color: #6ae8e5;
      font-size: 32px;
      font-weight: 700;
    }
  }
`;

export const PathInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CitiesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  img {
    height: 50px;
    margin-right: 20px;
  }

  strong {
    font-size: 24px;
    font-weight: 700;
  }
`;

export const ModalInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 13px;

  strong {
    font-size: 20px;
    font-weight: 500;
    b {
      font-weight: 700;
    }
  }
`;

export const TimeInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 7px;

  strong {
    font-size: 24px;
    font-weight: 700;
  }

  section {
    display: flex;
    flex-direction: column;
    margin-left: 25px;

    h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 500;
    }
  }
`;

export const ObservationsContainer = styled.div`
  > h4 {
    margin: 0;
    font-weight: 300;
    font-size: 16px;
    color: #fc0e0e;

    &:last-child {
      margin-bottom: 10px;
    }
  }
`;

export const OptionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 40px;

  button {
    border: 0;
    background: none;

    & + button {
      margin-left: 22px;
    }

    img {
      height: 45px;
    }
  }
`;

export const MapContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100vh;

  section {
    img {
      height: 900px;
    }
  }
`;
