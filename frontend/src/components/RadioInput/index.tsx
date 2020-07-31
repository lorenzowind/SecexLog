import React from 'react';
import clsx from 'clsx';
import Radio, { RadioProps } from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import { useStyles } from './styles';

interface Props {
  name: string;
  options: string[];
  defaultValue?: string;
  onChangeValue: React.Dispatch<React.SetStateAction<string>>;
}

function StyledRadio(props: RadioProps) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

const RadioInput: React.FC<Props> = ({
  name,
  options,
  onChangeValue,
  defaultValue,
}) => {
  return (
    <FormControl component="fieldset">
      <RadioGroup name={name} defaultValue={defaultValue}>
        {options.map(option => (
          <FormControlLabel
            key={String(option)}
            value={option}
            control={
              <StyledRadio
                onChange={e => onChangeValue(e.currentTarget.value)}
              />
            }
            label={option}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioInput;
