import React, { useCallback } from 'react';
import Select from 'react-select';

import { Container } from './styles';

export interface Option {
  value: string;
  label: string;
}

interface Props {
  placeholder: string;
  options: Option[];
  defaultValues?: Option[];
  setSelectedOptions(options: Option[]): void;
}

const MultiSelect: React.FC<Props> = ({
  placeholder,
  options,
  defaultValues,
  setSelectedOptions,
}) => {
  const handleChange = useCallback(
    selectedOptions => {
      setSelectedOptions(selectedOptions);
    },
    [setSelectedOptions],
  );

  return (
    <Container>
      <Select
        isMulti
        options={options}
        onChange={handleChange}
        placeholder={placeholder}
        defaultValue={defaultValues}
      />
    </Container>
  );
};

export default MultiSelect;
