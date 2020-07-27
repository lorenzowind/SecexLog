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
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);

  animation: ${appearWithFade} 0.5s;

  display: flex;
  justify-content: center;
  align-items: center;
`;
