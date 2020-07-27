import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import { Container } from './styles';

const LoadingPartial: React.FC = () => (
  <Container>
    <ClipLoader size={150} color="#123abc" loading />
  </Container>
);

export default LoadingPartial;
