import React from 'react';

import { Container } from './styles';

import Header from '../../components/Header';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Header isAuthenticated />

      <h1>Dashboard</h1>
    </Container>
  );
};

export default Dashboard;
