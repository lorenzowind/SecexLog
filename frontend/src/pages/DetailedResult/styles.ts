import styled, { css, keyframes } from 'styled-components';

interface CityPinProps {
  cityName: string;
}

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
  overflow: hidden;
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
  align-items: flex-start;

  padding: 40px 20px 20px 40px;
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
    position: relative;
    margin-left: -16px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #2327f3;
    margin-right: 20px;

    &::before {
      content: '';
      border-style: solid;
      border-color: #2327f3 transparent;
      border-width: 6px 6px 0 6px;
      top: 95%;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
    }
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
    width: 50px;
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
    position: relative;
    z-index: -1;

    > img {
      height: 700px;
    }
  }
`;

export const CityPin = styled.span<CityPinProps>`
  position: absolute;

  > img {
    height: 30px;
  }

  > nav {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #2327f3;
    margin-left: -5px;

    &::before {
      content: '';
      border-style: solid;
      border-color: #2327f3 transparent;
      border-width: 6px 6px 0 6px;
      top: 95%;
      position: absolute;
      margin-left: -2.5px;
      left: 50%;
      transform: translate(-50%);
    }
  }

  ${props => {
    switch (props.cityName) {
      case 'Alvarães':
        return css`
          left: 480px;
          top: 315px;
        `;
      case 'Amaturá':
        return css`
          left: 305px;
          top: 300px;
        `;
      case 'Anamã':
        return css`
          left: 695px;
          top: 305px;
        `;
      case 'Anori':
        return css`
          left: 690px;
          top: 325px;
        `;
      case 'Apuí':
        return css`
          left: 820px;
          top: 555px;
        `;
      case 'Atalaia do Norte':
        return css`
          left: 105px;
          top: 450px;
        `;
      case 'Autazes':
        return css`
          left: 820px;
          top: 315px;
        `;
      case 'Barcelos':
        return css`
          left: 580px;
          top: 180px;
        `;
      case 'Barreirinha':
        return css`
          left: 950px;
          top: 280px;
        `;
      case 'Benjamin Constant':
        return css`
          left: 210px;
          top: 360px;
        `;
      case 'Beruri':
        return css`
          left: 690px;
          top: 365px;
        `;
      case 'Boa Vista do Ramos':
        return css`
          left: 930px;
          top: 275px;
        `;
      case 'Boca do Acre':
        return css`
          left: 325px;
          top: 615px;
        `;
      case 'Borba':
        return css`
          left: 835px;
          top: 390px;
        `;
      case 'Caapiranga':
        return css`
          left: 685px;
          top: 275px;
        `;
      case 'Canutama':
        return css`
          left: 560px;
          top: 510px;
        `;
      case 'Carauari':
        return css`
          left: 360px;
          top: 405px;
        `;
      case 'Careiro':
        return css`
          left: 785px;
          top: 315px;
        `;
      case 'Careiro da Várzea':
        return css`
          left: 820px;
          top: 290px;
        `;
      case 'Coari':
        return css`
          left: 555px;
          top: 370px;
        `;
      case 'Codajás':
        return css`
          left: 635px;
          top: 305px;
        `;
      case 'Eirunepé':
        return css`
          left: 210px;
          top: 500px;
        `;
      case 'Envira':
        return css`
          left: 215px;
          top: 540px;
        `;
      case 'Fonte Boa':
        return css`
          left: 435px;
          top: 240px;
        `;
      case 'Guajará':
        return css`
          left: 60px;
          top: 525px;
        `;
      case 'Humaitá':
        return css`
          left: 640px;
          top: 530px;
        `;
      case 'Ipixuna':
        return css`
          left: 120px;
          top: 525px;
        `;
      case 'Iranduba':
        return css`
          left: 745px;
          top: 270px;
        `;
      case 'Itacoatiara':
        return css`
          left: 875px;
          top: 295px;
        `;
      case 'Itamarati':
        return css`
          left: 310px;
          top: 495px;
        `;
      case 'Itapiranga':
        return css`
          left: 875px;
          top: 240px;
        `;
      case 'Japurá':
        return css`
          left: 290px;
          top: 220px;
        `;
      case 'Juruá':
        return css`
          left: 410px;
          top: 320px;
        `;
      case 'Jutaí':
        return css`
          left: 325px;
          top: 355px;
        `;
      case 'Lábrea':
        return css`
          left: 470px;
          top: 580px;
        `;
      case 'Manacapuru':
        return css`
          left: 740px;
          top: 305px;
        `;
      case 'Manaquiri':
        return css`
          left: 740px;
          top: 325px;
        `;
      case 'Manaus':
        return css`
          left: 790px;
          top: 275px;
        `;
      case 'Manicoré':
        return css`
          left: 715px;
          top: 445px;
        `;
      case 'Maraã':
        return css`
          left: 515px;
          top: 245px;
        `;
      case 'Maués':
        return css`
          left: 915px;
          top: 375px;
        `;
      case 'Nhamundá':
        return css`
          left: 940px;
          top: 220px;
        `;
      case 'Nova Olinda do Norte':
        return css`
          left: 870px;
          top: 325px;
        `;
      case 'Novo Airão':
        return css`
          left: 720px;
          top: 240px;
        `;
      case 'Novo Aripuanã':
        return css`
          left: 780px;
          top: 445px;
        `;
      case 'Parintins':
        return css`
          left: 985px;
          top: 250px;
        `;
      case 'Pauini':
        return css`
          left: 345px;
          top: 560px;
        `;
      case 'Presidente Figueiredo':
        return css`
          left: 790px;
          top: 200px;
        `;
      case 'Rio Preto da Eva':
        return css`
          left: 815px;
          top: 255px;
        `;
      case 'Santa Isabel do Rio Negro':
        return css`
          left: 460px;
          top: 150px;
        `;
      case 'Santo Antônio do Içá':
        return css`
          left: 250px;
          top: 280px;
        `;
      case 'São Gabriel da Cachoeira':
        return css`
          left: 330px;
          top: 100px;
        `;
      case 'São Paulo de Olivença':
        return css`
          left: 260px;
          top: 315px;
        `;
      case 'São Sebastião do Uatumã':
        return css`
          left: 225px;
          top: 335px;
        `;
      case 'Silves':
        return css`
          left: 880px;
          top: 260px;
        `;
      case 'Tabatinga':
        return css`
          left: 870px;
          top: 220px;
        `;
      case 'Tapauá':
        return css`
          left: 470px;
          top: 470px;
        `;
      case 'Tefé':
        return css`
          left: 470px;
          top: 355px;
        `;
      case 'Tonantins':
        return css`
          left: 355px;
          top: 250px;
        `;
      case 'Uarini':
        return css`
          left: 475px;
          top: 285px;
        `;
      case 'Urucará':
        return css`
          left: 830px;
          top: 140px;
        `;
      case 'Urucurituba':
        return css`
          left: 920px;
          top: 260px;
        `;
      default:
    }
  }}
`;
