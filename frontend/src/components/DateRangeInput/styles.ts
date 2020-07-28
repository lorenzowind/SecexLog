import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;

export const Content = styled.div`
  border: solid 1px #707070;
  border-radius: 35px;
  background-color: #ffffff;
  padding: 0 20px;

  > div {
    .DayPicker-Day--today {
      color: #292eec;
    }
  }
`;
