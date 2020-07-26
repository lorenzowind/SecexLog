import React from 'react';

import { Container } from './styles';

import logoTce from '../../assets/ManualSearch/logo-tce.png';

const Header: React.FC = () => {
  return (
    <Container>
      <button type="button">Dê sua Opinião</button>

      <button type="button">Login</button>

      <img src={logoTce} alt="TCE" />
    </Container>
  );
};

export default Header;
