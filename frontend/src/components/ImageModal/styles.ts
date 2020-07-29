import styled from 'styled-components';

interface Props {
  isSelected: boolean;
}

export const Container = styled.div<Props>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 75px;
  height: 75px;
  border-radius: 50%;
  background: ${props => (props.isSelected ? '#292eec' : 'transparent')};

  img {
    width: 75px;
    height: 75px;
    padding: 2px;
    border-radius: 50%;
  }
`;
