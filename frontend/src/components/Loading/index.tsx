import React from 'react';

import { Container, Content } from './styles';

import loadingGif from '../../assets/loading.gif';

const Loading: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={loadingGif} alt="Loading" />
      </Content>
    </Container>
  );
};

export default Loading;
