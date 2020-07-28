import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.textarea<ContainerProps>`
  color: #6c6c80;
  font-size: 18px;
  resize: none;
  border-radius: 35px;
  margin-bottom: 30px;
  padding: 16px;

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

  &::placeholder {
    color: #666360;
  }
`;
