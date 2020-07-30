import styled from 'styled-components';

interface Props {
  isSelected: boolean;
  imageSize: number;
}

export const Container = styled.div<Props>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${props => props.imageSize}px;
  height: ${props => props.imageSize}px;
  border-radius: 50%;
  background: ${props => (props.isSelected ? '#292eec' : 'transparent')};

  img {
    width: ${props => props.imageSize}px;
    height: ${props => props.imageSize}px;
    padding: 2px;
    border-radius: 50%;
  }
`;
