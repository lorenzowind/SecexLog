import styled, { keyframes } from 'styled-components';

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
  justify-content: flex-end;
  align-items: center;

  width: 100%;
  position: absolute;
  padding: 20px 70px 0 0;

  animation: ${appearFromTop} 1s;

  > button {
    border: 0;
    height: max-content;
    font-size: 20px;
    color: #818181;
    margin: 0 70px 0 0;
  }
`;
