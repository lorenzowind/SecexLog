import styled, { keyframes } from 'styled-components';

const appearFromTop = keyframes`
  from {
    transform: translateY(-100px);
  }
  to {
    transform: translateX(0);
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  z-index: 2;
  width: 100%;
  height: 100px;
  position: absolute;
  padding: 20px 70px 0 0;

  animation: ${appearFromTop} 1s;

  a {
    text-decoration: none;
    color: #818181;
  }

  > button {
    border: 0;
    height: max-content;
    font-size: 20px;
    color: #818181;
    margin: 0 70px 0 0;
    background: transparent;
  }
`;
