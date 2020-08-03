import React from 'react';

import { Container } from './styles';

import { Header, Menu } from '../../components';

const Dashboard: React.FC = () => {
  return (
    <>
      <Header isAuthenticated />

      <Menu />

      <Container />
    </>
  );
};

export default Dashboard;
