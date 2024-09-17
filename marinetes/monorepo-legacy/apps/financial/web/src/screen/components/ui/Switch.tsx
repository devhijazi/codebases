import { useField } from '@unform/core';
import { useEffect, useState } from 'react';
import ReactSwitch, { ReactSwitchProps } from 'react-switch';

interface Props extends Omit<ReactSwitchProps, 'checked' | 'onChange'> {
  name: string;
}

export const Switch = ({ name, ...rest }: Props): JSX.Element => {
  const { fieldName, defaultValue, registerField } = useField(name);

  const [checked, updateChecked] = useState(defaultValue ?? false);

  useEffect(() => {
    registerField({
      ref: checked,
      name: fieldName,
      getValue: () => checked ?? false,
      setValue: () => {
        updateChecked(!checked);
      },
    });
  }, [registerField, checked, fieldName, updateChecked]);

  return (
    <ReactSwitch
      width={60}
      height={30}
      checkedIcon={false}
      uncheckedIcon={false}
      offColor="#E2E2E2"
      onColor="#E2E2E2"
      onHandleColor="#7FBD3B"
      offHandleColor="#E26868"
      borderRadius={10}
      boxShadow="inset 0px 4px 4px rgba(0, 0, 0, 0.25)"
      checked={checked}
      onChange={() => updateChecked(!checked)}
      {...rest}
    />
  );
};
