import React, { useCallback } from 'react';
import Select from 'react-select';

import { Container } from './styles';

export interface Option {
  value: string;
  label: string;
}

interface Props {
  options: Option[];
  setSelectedOptions(options: Option[]): void;
}

const MultiSelect: React.FC<Props> = ({ options, setSelectedOptions }) => {
  const handleChange = useCallback(
    selectedOptions => {
      setSelectedOptions(selectedOptions);
    },
    [setSelectedOptions],
  );

  return (
    <Container>
      <Select isMulti options={options} onChange={handleChange} />
    </Container>
  );
};

export default MultiSelect;
