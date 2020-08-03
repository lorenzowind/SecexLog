import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
  isDisabled?: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  border-radius: 13px;
  padding: 8px 16px;
  width: 100%;

  border: 1px solid #707070;
  color: #666360;

  display: flex;
  align-items: center;

  ${props =>
    props.isDisabled &&
    css`
      background: #d8d7d7;
    `}

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

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #6c6c80;
    font-size: 18px;

    &::placeholder {
      color: #666360;
    }
  }

  img {
    margin-right: 16px;
  }
`;
