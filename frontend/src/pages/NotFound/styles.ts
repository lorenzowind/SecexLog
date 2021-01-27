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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 100%;
  background: #f1f1f1;

  // animation: ${appearWithFade} 0.5s;

  img {
    margin-bottom: 100px;
  }

  h1 {
    color: #818181;
    font-size: 68px;
    font-weight: 700;
    margin-bottom: 20px;
  }

  strong {
    color: #818181;
    font-size: 48px;
    font-weight: 500;
  }
`;
