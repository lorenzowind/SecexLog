import styled, { keyframes } from 'styled-components';

export interface Props {
  zIndex: number;
}

const appearWithFade = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Container = styled.div<Props>`
  position: fixed;
  z-index: ${props => props.zIndex};
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);

  // animation: ${appearWithFade} 0.5s;

  display: flex;
  justify-content: center;
  align-items: center;
`;
