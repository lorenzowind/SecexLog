import styled, { keyframes } from 'styled-components';

const appearFromRight = keyframes`
  from {
    transform: translateX(-100px);
  }
  to {
    transform: translateX(0);
  }
`;

export const Container = styled.div`
  animation: ${appearFromRight} 1s;
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

  padding: 20px 20px 20px 20px;
`;

export const UniquePathContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  > nav {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #2327f3;
    margin-right: 20px;
  }

  > section {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;

    img {
      width: 30px;
    }

    strong {
      position: absolute;
      margin-top: -15px;
    }
  }
`;

export const PathInfoContainer = styled.div``;

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

export const ModalInfoContainer = styled.div``;

export const TimeInfoContainer = styled.div``;

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
