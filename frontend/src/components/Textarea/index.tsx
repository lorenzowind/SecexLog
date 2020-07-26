import React, { TextareaHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { Container } from './styles';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
}

const Textarea: React.FC<TextareaProps> = ({ name, ...rest }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textareaRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return <Container defaultValue={defaultValue} ref={textareaRef} {...rest} />;
};

export default Textarea;
