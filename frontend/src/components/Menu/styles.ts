import styled, { keyframes } from 'styled-components';

const appearFromLeft = keyframes`
  from {
    transform: translateX(-200px);
  }
  to {
    transform: translateX(0);
  }
`;

const appearFromRight = keyframes`
  from {
    transform: translateX(200px);
  }
  to {
    transform: translateX(0);
  }
`;

export const ContainerClosed = styled.div`
  position: absolute;
  z-index: 2;
  width: 80px;
  height: 100%;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.5);
  border: solid 1px #707070;
  background-image: linear-gradient(to bottom, #292eec, #6ae8e5);

  animation: ${appearFromRight} 1s;
`;

export const ContainerOpened = styled.div`
  position: absolute;
  z-index: 2;
  width: 400px;
  height: 100%;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.5);
  border: solid 1px #707070;
  background-image: linear-gradient(to bottom, #292eec, #6ae8e5);

  animation: ${appearFromLeft} 1s;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  overflow-y: auto;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  height: 100%;
  width: 100%;

  aside {
    width: 100%;

    button {
      display: flex;
      justify-content: center;

      width: 100%;
      padding-left: 0;

      img {
        align-self: center;

        margin: 20px 0;
        width: auto;
        height: auto;
        cursor: pointer;
      }
    }
  }

  a {
    text-decoration: none;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    border: 0;
    background: transparent;
    width: 100%;
    padding-left: 20px;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    img {
      width: 35px;
      height: 35px;
    }

    strong {
      font-size: 20px;
      color: #fff;
      padding-left: 20px;
    }
  }

  nav {
    width: 100%;
    height: 100%;

    button {
      padding: 20px;

      &:first-child {
        margin-top: 50px;
      }
    }

    section {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: column;

      border: 0;
      background: transparent;
      width: 100%;
      padding-top: 10px;

      img {
        width: 35px;
        height: 35px;
      }

      strong {
        font-size: 20px;
        color: #fff;
        padding-left: 20px;
      }

      nav {
        display: flex;
        align-items: center;
        padding: 10px 0 20px 20px;
      }
    }
  }
`;
