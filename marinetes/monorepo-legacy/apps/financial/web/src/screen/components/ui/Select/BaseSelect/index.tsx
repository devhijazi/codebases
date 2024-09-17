import {
  useOutClick,
  useForceUpdate,
  mergeClassNames,
} from '@hitechline/reactools';
import { useField } from '@unform/core';
import { useState, useRef, useEffect, useCallback } from 'react';

import type { BaseSelectProps, SelectOption } from '../types';
import { Container, Button, Title, ArrowIcon, Options, Error } from './styles';

export type MainSelectProps = Omit<BaseSelectProps, 'basedClassName'>;

export const BaseSelect = ({
  name,
  className,
  basedClassName,
  label,
  title,
  options,
  onChange,
  icon: Icon,
  disabled,
  ...props
}: BaseSelectProps): JSX.Element => {
  const forceUpdate = useForceUpdate();
  const selectRef = useRef<SelectOption>();

  const [optionsVisible, setOptionsVisible] = useState(false);

  const { error, fieldName, defaultValue, registerField } = useField(name);
  const {
    addListener,
    removeListener,
    ref: outClick,
  } = useOutClick<HTMLDivElement>();

  const openOptions = useCallback(() => {
    setTimeout(() => {
      setOptionsVisible(true);
    }, 0);
  }, []);

  const closeOptions = useCallback(() => {
    setOptionsVisible(false);
  }, []);

  const getOptionByValue = useCallback(
    (value: any) =>
      options.find(({ value: currentValue }) => currentValue === value),
    [options],
  );

  const setValue = useCallback(
    (value: any, close = false) => {
      const option = getOptionByValue(value);

      if (!option) {
        return;
      }

      selectRef.current = { ...option };

      if (close) {
        closeOptions();
      }

      forceUpdate();

      if (typeof onChange === 'function') {
        onChange(selectRef.current);
      }
    },
    [selectRef, onChange, forceUpdate, closeOptions, getOptionByValue],
  );

  const renderTitle = (() => {
    if (selectRef.current?.label) {
      return selectRef.current.label;
    }

    return defaultValue
      ? getOptionByValue(defaultValue)?.label
      : props.placeholder ?? title;
  })();

  useEffect(() => {
    setValue(defaultValue);
  }, [setValue, defaultValue]);

  useEffect(() => {
    registerField({
      ref: selectRef,
      name: fieldName,
      path: 'current.value',
    });
  }, [selectRef, fieldName, registerField]);

  useEffect(() => {
    addListener(closeOptions);

    return () => {
      removeListener(closeOptions);
    };
  }, [closeOptions, addListener, removeListener]);

  return (
    <Container
      {...props}
      ref={outClick}
      className={mergeClassNames(basedClassName, className, {
        disabled: Boolean(disabled),
      })}
    >
      <Button
        type="button"
        disabled={disabled}
        onClick={optionsVisible ? closeOptions : openOptions}
      >
        {Icon && (
          <div className="icon">
            <Icon />
          </div>
        )}

        <Title>
          {label && <span>{label}</span>}

          <p>{renderTitle}</p>
        </Title>

        <ArrowIcon open={optionsVisible} />
      </Button>

      {error && (
        <Error>
          <span>{error}</span>
        </Error>
      )}

      {optionsVisible && (
        <Options>
          {options.length > 1 &&
            options.map(({ value, label: text }) => (
              <button
                key={value}
                type="button"
                onClick={() => setValue(value, true)}
              >
                {text}
              </button>
            ))}
        </Options>
      )}
    </Container>
  );
};
