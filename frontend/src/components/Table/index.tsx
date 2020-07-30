import React from 'react';

import { Container } from './styles';

export interface Props {
  module: 'usuário' | 'cidade' | 'feriado' | 'prestador' | 'modal' | 'trajeto';
}

const Table: React.FC<Props> = ({ module, children, ...rest }) => (
  <Container module={module} {...rest}>
    {children}
  </Container>
);

export default Table;
