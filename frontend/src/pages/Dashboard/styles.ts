import styled, { keyframes } from 'styled-components';

interface ModalIconsDivProps {
  color: string;
}

interface FeedbacksDivProps {
  color: string;
}

const appearFromTop = keyframes`
  from {
    transform: translateY(-200px);
  }
  to {
    transform: translateX(0);
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  nav {
    display: flex;
    flex-direction: row;
  }

  padding-top: 100px;

  animation: ${appearFromTop} 1s;
`;

export const ModalIconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  width: 880px;
`;

export const ModalIcon = styled.div<ModalIconsDivProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 200px;
  height: 190px;
  margin: 0 20px 20px 0px;
  border-radius: 35px;
  background: ${props => props.color};

  &:hover {
    transform: translateY(-5px);
  }

  img {
    height: 65px;
    margin: 0 0 10px 0;
  }

  h1 {
    font-size: 40px;
    color: #fff;
    font-weight: 600;
    margin: 0 0 10px 0;
  }

  strong {
    font-size: 20px;
    color: #fff;
    font-weight: 400;
  }
`;

export const FeedbacksContainer = styled.div`
  width: 420px;
  height: 400px;
  border-radius: 35px;
  background-color: #ffffff;
  overflow-y: auto;
  padding: 20px 30px 20px 30px;
  margin: 10px 10px 0 0;

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

  h1 {
    color: #292eec;
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  hr {
    margin-bottom: 10px;
  }
`;

export const Feedbacks = styled.div<FeedbacksDivProps>`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;

  h2 {
    color: ${props => props.color};
    font-size: 24px;
    font-weight: 500;
    word-break: break-all;
    margin-bottom: 10px;
  }

  section {
    display: flex;

    button {
      border: 0;
      background: transparent;
      height: 100%;

      h3 {
        color: #ff2d2d;
        font-size: 18px;
        font-weight: 600;
      }
    }

    strong {
      color: #818181;
      font-size: 18px;
      font-weight: 400;
      margin-bottom: 5px;
      margin-left: 20px;
    }
  }
`;

export const ProgressBarsContainer = styled.div`
  width: 420px;
  height: 400px;
  border-radius: 35px;
  background-color: #ffffff;
  overflow-y: auto;
  margin-top: 20px;
  padding: 50px 30px 0px 30px;
  margin: 10px 0 0 10px;

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
    h1 {
      padding: 20px 0 35px 0;
      margin-top: -50px;
      color: #818181;
      font-size: 18px;
      font-weight: 400;
    }
  }
`;
