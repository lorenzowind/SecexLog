import React from 'react';
import Switch from '@material-ui/core/Switch';

interface Props {
  isChecked: boolean;
  setIsChecked(isChecked: boolean): void;
}

const SwitchInput: React.FC<Props> = ({ isChecked, setIsChecked }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <Switch
      checked={isChecked}
      onChange={handleChange}
      color="primary"
      name="checkedB"
      inputProps={{ 'aria-label': 'primary checkbox' }}
    />
  );
};

export default SwitchInput;
