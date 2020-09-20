import React from 'react';

import { ModuleName } from '../../pages/CRUD/ListingData';

import { Container } from './styles';

export type Props = ModuleName;

const Table: React.FC<Props> = ({ name, children, ...rest }) => (
  <Container name={name} {...rest}>
    {children}
  </Container>
);

export default Table;
