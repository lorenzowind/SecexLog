import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import InputMask from 'react-input-mask';
import { useField } from '@unform/core';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: string;
  isDisabled?: boolean;
  mask?: string;
  type: string;
  onChangeValue?: React.Dispatch<React.SetStateAction<string>>;
}

const Input: React.FC<InputProps> = ({
  name,
  icon,
  isDisabled,
  mask,
  type,
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
      {mask ? (
        <InputMask
          mask={mask || ''}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={e => {
            if (onChangeValue) {
              onChangeValue(e.target.value);
            }
          }}
          defaultValue={defaultValue}
          {...rest}
        >
          {() => <input ref={inputRef} type={type} />}
        </InputMask>
      ) : (
        <input
          ref={inputRef}
          type={type}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={e => {
            if (onChangeValue) {
              onChangeValue(e.target.value);
            }
          }}
          defaultValue={defaultValue}
          {...rest}
        />
      )}
    </Container>
  );
};

export default Input;
