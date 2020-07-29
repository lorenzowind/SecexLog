import React from 'react';

import { Container } from './styles';

interface Props {
  imageModal: string;
  isSelected: boolean;
}

const ImageModal: React.FC<Props> = ({ imageModal, isSelected, ...rest }) => {
  return (
    <Container isSelected={isSelected} {...rest}>
      <img src={imageModal} alt="Modal" />
    </Container>
  );
};

export default ImageModal;
