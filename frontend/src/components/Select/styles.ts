import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  border-radius: 35px;
  padding: 20px;
  width: 100%;

  border: 1px solid #707070;

  display: flex;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #292eec;
    `}

  img {
    margin: 0 16px 0 0;
  }

  select {
    flex: 1;
    background: transparent;
    border: 0;
    color: #fff;
    font-size: 18px;
    appearance: none;
    padding: 16px 0;
    color: #6c6c80;

    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
`;
