import React, {
  SelectHTMLAttributes,
  useRef,
  useEffect,
  useState,
} from 'react';
import { useField } from '@unform/core';

import { Container } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  icon?: string;
}

const Select: React.FC<SelectProps> = ({ name, icon, children, ...rest }) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  const [isFocused, setIsFocused] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrored={!!error} isFocused={isFocused}>
      {icon && <img src={icon} alt="Icon" />}
      <select
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        ref={selectRef}
        defaultValue={defaultValue}
        {...rest}
      >
        {children}
      </select>
    </Container>
  );
};

export default Select;
