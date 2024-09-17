import { mergeClassNames } from '@hitechline/reactools';
import { useField } from '@unform/core';
import {
  useEffect,
  useCallback,
  useMemo,
  useState,
  FocusEventHandler,
} from 'react';
import { useIMask } from 'react-imask';

import { generateRandomString } from '@/modules/utils/generateRandomString';

import { BaseInputProps } from '../types';
import { Container, Content, Group, InputElement, Error } from './styles';

export type MainInputProps = Omit<BaseInputProps, 'basedClassName'>;

export const BaseInput = ({
  name,
  label,
  mask,
  className,
  basedClassName,
  icon: Icon,
  disabled,
  onFocus,
  onBlur,
  ...rest
}: BaseInputProps): JSX.Element => {
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

  const id = useMemo(() => generateRandomString(), []);

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
      setUnmaskedValue(String(defaultValue));
    }
  }, [maskRef, setUnmaskedValue, defaultValue]);

  useEffect(() => {
    registerField({
      ref: inputRef,
      name: fieldName,
      getValue: () => maskRef.current.unmaskedValue ?? '',
      setValue: (_, inputValue) => {
        setUnmaskedValue(String(inputValue));
      },
      clearValue: () => {
        if (maskRef.current?.unmaskedValue) {
          setUnmaskedValue('');
        }
      },
    });
  }, [
    registerField,
    inputRef,
    maskRef,
    fieldName,
    setUnmaskedValue,
    unmaskedValue,
  ]);

  return (
    <Container
      className={mergeClassNames(basedClassName, className, {
        'disabled': Boolean(disabled),
        'error': Boolean(error),
        'focused': isFocused,
        'with-icon': Boolean(Icon),
      })}
      data-disabled={disabled}
    >
      <Content>
        {Icon && (
          <div className="icon">
            <Icon />
          </div>
        )}

        <Group withIcon={Boolean(Icon)}>
          {label && <label htmlFor={id}>{label}</label>}

          <InputElement
            ref={inputRef as any}
            name={name}
            disabled={disabled}
            defaultValue={defaultValue}
            onBlur={handleBlur}
            onFocus={handleFocus}
            {...rest}
          />
        </Group>
      </Content>

      {error && (
        <Error>
          <span>{error}</span>
        </Error>
      )}
    </Container>
  );
};
