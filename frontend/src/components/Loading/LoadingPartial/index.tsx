import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import { Container, Props } from './styles';

const LoadingPartial: React.FC<Props> = ({ zIndex }) => (
  <Container zIndex={zIndex}>
    <ClipLoader size={150} color="#123abc" loading />
  </Container>
);

export default LoadingPartial;
