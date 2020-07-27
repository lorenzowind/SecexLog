import styled from 'styled-components';

export const Container = styled.table`
  border-radius: 25px;
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

  th {
    text-align: left;
    font-size: 20px;
    padding: 0 10px 10px 10px;
    width: 120px;
  }

  td {
    font-size: 18px;
    padding: 0 10px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 120px;
    min-width: 120px;

    &:last-child {
      max-width: 60px;
      min-width: 60px;
    }
  }

  button {
    border: 0;
    background: transparent;
  }
`;
