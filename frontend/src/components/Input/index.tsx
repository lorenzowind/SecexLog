import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: string;
  isDisabled?: boolean;
  onChangeValue?: React.Dispatch<React.SetStateAction<string>>;
}

const Input: React.FC<InputProps> = ({
  name,
  icon,
  isDisabled,
  onChangeValue,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      isErrored={!!error}
      isFocused={isFocused}
      isDisabled={isDisabled}
    >
      {icon && <img src={icon} alt="Icon" />}
      <input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        defaultValue={defaultValue}
        ref={inputRef}
        onChange={e => {
          if (onChangeValue) {
            onChangeValue(e.target.value);
          }
        }}
        {...rest}
      />
    </Container>
  );
};

export default Input;
