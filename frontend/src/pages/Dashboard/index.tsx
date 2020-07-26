import React from 'react';

import { Container } from './styles';

import Header from '../../components/Header';
import Menu from '../../components/Menu';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Header isAuthenticated />

      <Menu />
    </Container>
  );
};

export default Dashboard;
