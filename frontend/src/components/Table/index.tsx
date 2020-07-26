import React from 'react';

import { Container } from './styles';

const Table: React.FC = ({ children, ...rest }) => (
  <Container {...rest}>{children}</Container>
);

export default Table;
