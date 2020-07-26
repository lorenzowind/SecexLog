import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  width: 100%;
  position: absolute;
  padding: 20px 70px 0 0;

  > button {
    border: 0;
    height: max-content;
    font-size: 20px;
    color: #818181;
    margin: 0 70px 0 0;
  }
`;
