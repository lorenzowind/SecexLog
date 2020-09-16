import styled, { css } from 'styled-components';
import { Props } from './index';

export const Container = styled.table<Props>`
  border-radius: 35px;
  border: solid 1px #707070;
  background-color: #ffffff;

  overflow-y: auto;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  ${props =>
    props.name === 'HOLIDAY' &&
    css`
      border: 0;
      border-radius: 0;
    `}

  th {
    text-align: left;
    font-size: 20px;
    padding: 0 10px 5px 10px;

    ${props => {
      switch (props.name) {
        case 'USER':
          return css`
            max-width: 120px;
            min-width: 120px;

            &:last-child {
              max-width: 60px;
              min-width: 60px;
            }
          `;
        case 'CITY':
        case 'MODAL':
          return css`
            max-width: 170px;
            min-width: 170px;

            &:nth-child(2) {
              max-width: 50px;
              min-width: 50px;
            }

            &:nth-child(4) {
              max-width: 50px;
              min-width: 50px;
            }

            &:nth-child(6) {
              max-width: 50px;
              min-width: 50px;
            }
          `;
        case 'HOLIDAY':
          return css`
            max-width: 280px;
            min-width: 280px;

            &:nth-child(2) {
              max-width: 50px;
              min-width: 50px;
            }
          `;
        case 'PROVIDER':
        case 'PATH':
          return css`
            max-width: 150px;
            min-width: 150px;

            &:last-child {
              max-width: 60px;
              min-width: 60px;
            }
          `;
        default:
      }
    }}
  }

  td {
    font-size: 18px;
    padding: 0 10px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    ${props => {
      switch (props.name) {
        case 'USER':
          return css`
            max-width: 120px;
            min-width: 120px;

            &:last-child {
              max-width: 60px;
              min-width: 60px;
            }
          `;
        case 'CITY':
        case 'MODAL':
          return css`
            max-width: 170px;
            min-width: 170px;

            &:nth-child(2) {
              max-width: 50px;
              min-width: 50px;
            }

            &:nth-child(4) {
              max-width: 50px;
              min-width: 50px;
            }

            &:nth-child(6) {
              max-width: 50px;
              min-width: 50px;
            }
          `;
        case 'HOLIDAY':
          return css`
            max-width: 280px;
            min-width: 280px;

            &:nth-child(2) {
              max-width: 50px;
              min-width: 50px;
            }
          `;
        case 'PROVIDER':
        case 'PATH':
          return css`
            max-width: 150px;
            min-width: 150px;

            &:last-child {
              max-width: 60px;
              min-width: 60px;
            }
          `;
        default:
      }
    }}
  }

  button {
    border: 0;
    background: transparent;
  }
`;
