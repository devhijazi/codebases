import { useField } from '@unform/core';
import { ButtonHTMLAttributes, useEffect, useState } from 'react';

import { Button } from '@/screen/components/ui/Button';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  title: string;
  checked?: boolean;
}

export const ActivateDiarist = ({
  name,
  title,
  ...rest
}: Props): JSX.Element => {
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
    <Button
      checked={checked}
      onClick={() => updateChecked(!checked)}
      type="submit"
      {...rest}
    >
      {title}
    </Button>
  );
};
