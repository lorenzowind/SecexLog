import styled, { keyframes } from 'styled-components';

const appearWithFade = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Container = styled.div`
  position: fixed;
  z-index: 4;
  width: 100%;
  height: 100%;
  background: #fcfcff;

  animation: ${appearWithFade} 0.5s;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
