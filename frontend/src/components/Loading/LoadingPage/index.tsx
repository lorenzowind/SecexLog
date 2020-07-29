import React from 'react';

import { Container, Content } from './styles';

import loadingGif from '../../../assets/loading.gif';

const LoadingPage: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={loadingGif} alt="Loading" />
      </Content>
    </Container>
  );
};

export default LoadingPage;
