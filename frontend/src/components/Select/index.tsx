import React, { SelectHTMLAttributes } from 'react';

import { Container } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  icon?: string;
}

const Select: React.FC<SelectProps> = ({ name, icon, children, ...rest }) => (
  <Container>
    {icon && <img src={icon} alt="Icon" />}
    <select {...rest}>{children}</select>
  </Container>
);

export default Select;
