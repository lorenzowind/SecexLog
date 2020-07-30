import React from 'react';

import { Container } from './styles';

interface Props {
  imageModal: string;
  isSelected: boolean;
  imageSize: number;
}

const ImageModal: React.FC<Props> = ({
  imageModal,
  isSelected,
  imageSize,
  ...rest
}) => {
  return (
    <Container isSelected={isSelected} imageSize={imageSize} {...rest}>
      <img src={imageModal} alt="Modal" />
    </Container>
  );
};

export default ImageModal;
