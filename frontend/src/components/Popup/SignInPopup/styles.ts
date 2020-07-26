import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin: 90px 190px 0 0;
  overflow: hidden;
  border: solid 1px #707070;
  border-radius: 35px;
  background-color: #ffffff;
`;

export const Content = styled.div`
  padding: 45px 30px 10px 30px;

  > button {
    right: 0;
    top: 0;
    margin: 16px 20px 0 0;
    position: absolute;
    border: 0;
    background: transparent;
  }

  div {
    margin: 20px 0;
  }
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  button {
    margin: 20px 20px 0 20px;
    height: max-content;

    &:first-child {
      border: 0;
      background: transparent;
      color: #707070;
      font-size: 18px;
      white-space: nowrap;
    }

    &:nth-child(2) {
      padding: 6px 24px;
    }
  }
`;
