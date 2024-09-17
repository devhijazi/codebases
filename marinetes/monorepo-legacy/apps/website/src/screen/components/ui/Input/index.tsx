import { mergeClassNames } from '@hitechline/reactools';
import { useField } from '@unform/core';
import {
  useState,
  useEffect,
  useCallback,
  InputHTMLAttributes,
  FocusEventHandler,
  RefObject,
} from 'react';
import { useIMask } from 'react-imask';

import styles from './styles.module.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  mask?: any;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
}

export const Input = ({
  name,
  label,
  mask,
  disabled,
  className,
  onBlur,
  onFocus,
  ...rest
}: Props): JSX.Element => {
  const {
    ref: inputRef,
    maskRef,
    unmaskedValue,
    setUnmaskedValue,
  } = useIMask({
    name,
    mask: mask ?? String,
  });

  const {
    error,
    fieldName,
    clearError,
    defaultValue = '',
    registerField,
  } = useField(name);

  const [isFocused, setIsFocused] = useState(false);

  const handleBlur: FocusEventHandler<HTMLInputElement> = useCallback(
    (...props) => {
      setIsFocused(false);

      onBlur?.(...props);
    },
    [onBlur],
  );

  const handleFocus: FocusEventHandler<HTMLInputElement> = useCallback(
    (...props) => {
      clearError();

      onFocus?.(...props);
    },
    [onFocus, clearError],
  );

  useEffect(() => {
    if (maskRef.current && defaultValue) {
      setUnmaskedValue(defaultValue);
    }
  }, [maskRef, setUnmaskedValue, defaultValue]);

  useEffect(() => {
    registerField({
      ref: maskRef.current?.unmaskedValue,
      name: fieldName,
      getValue: () => unmaskedValue ?? '',
      setValue: () => {
        setUnmaskedValue(unmaskedValue);
      },
      clearValue: () => {
        if (maskRef.current?.unmaskedValue) {
          setUnmaskedValue('');
        }
      },
    });
  }, [registerField, maskRef, fieldName, setUnmaskedValue, unmaskedValue]);

  return (
    <div
      className={mergeClassNames(styles.wrapper, className, {
        disabled: Boolean(disabled),
        error: Boolean(error),
        focused: isFocused,
      })}
      data-disabled={disabled}
    >
      <div
        className={mergeClassNames(styles.content, {
          error: Boolean(error),
        })}
      >
        {label && <span className="font-normal text-gray-500">{label}</span>}

        <input
          ref={inputRef as RefObject<HTMLInputElement>}
          className="w-full h-wai text-gray-700 border-0 outline-none bg-transparent"
          name={name}
          disabled={disabled}
          defaultValue={defaultValue}
          onBlur={handleBlur}
          onFocus={handleFocus}
          {...rest}
        />
      </div>

      {error && (
        <span className="block text-sm text-red-500 uppercase">{error}</span>
      )}
    </div>
  );
};
