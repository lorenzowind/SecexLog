import styled from 'styled-components';

export const Container = styled.button`
  background: linear-gradient(to right, #3dbec6 3%, #292eec);
  height: 53px;
  border-radius: 13px;
  border: 0;
  padding: 0 16px;
  color: #fff;
  width: 100%;
  font-size: 20px;

  &:active {
    background: linear-gradient(
      to right,
      #292eec 4%,
      #653ff5 50%,
      #a752fe,
      #ae54ff
    );
  }
`;
