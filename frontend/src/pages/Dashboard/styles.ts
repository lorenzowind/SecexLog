import styled, { keyframes } from 'styled-components';

interface ModalIconsDivProps {
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

  padding-top: 100px;
  padding-left: 200px;

  animation: ${appearFromTop} 1s;
`;

export const ModalIconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  width: 480px;
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
    margin-bottom: 10px;
  }

  h1 {
    font-size: 40px;
    color: #fff;
    font-weight: 600;
    margin-bottom: 10px;
  }

  strong {
    font-size: 20px;
    color: #fff;
    font-weight: 400;
  }
`;
