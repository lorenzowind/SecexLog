import React from 'react';

import { Container } from './styles';

import logoSecex from '../../assets/logo-secex.png';

const NotFound: React.FC = () => (
  <Container>
    <img src={logoSecex} alt="Secex" />
    <h1>Erro 404!</h1>
    <strong>Página não encontrada.</strong>
  </Container>
);

export default NotFound;
