import {
  FormHandles as UnformHandles,
  FormHelpers as UnformHelpers,
} from '@unform/core';
import { Form as Unform } from '@unform/web';
import {
  useRef,
  useMemo,
  useReducer,
  forwardRef,
  useCallback,
  useImperativeHandle,
  Ref,
} from 'react';

import { FormContext } from './Context';
import { reducer } from './reducer';
import { FormReducerType, FormProps, FormHandles, FormState } from './types';
import { parseInnerErrors } from './utils/parseInnerErrors';
import { validateSchemaAndGetData } from './utils/validateSchemaAndGetData';

const INITIAL_DATA: FormState = {
  loading: false,
};

export const Form = forwardRef(
  (
    { schema, children, onSubmit, initialData = {}, ...rest }: FormProps,
    ref: Ref<FormHandles>,
  ): JSX.Element => {
    const unformRef = useRef<UnformHandles>(null);
    const [state, dispatch] = useReducer(reducer, INITIAL_DATA);

    const resetErrors = useCallback(() => {
      unformRef.current?.setErrors({});
    }, []);

    const getUnformRef = useCallback(() => {
      return unformRef;
    }, []);

    const getData = useCallback(() => {
      return unformRef.current?.getData() || {};
    }, []);

    const validate = useCallback(async (): Promise<boolean> => {
      const data = unformRef.current?.getData() ?? {};
      const validatedInfo = await validateSchemaAndGetData(data, schema);

      if (validatedInfo.error) {
        const errors = parseInnerErrors(validatedInfo.error.inner);

        unformRef.current?.setErrors(errors);
        return false;
      }

      return true;
    }, [schema]);

    const handleSubmit = useCallback(
      async (
        data: Record<string, any>,
        helpers: UnformHelpers,
      ): Promise<void> => {
        if (state.loading) {
          return;
        }

        // Reset all form errors
        unformRef.current?.setErrors({});

        dispatch({
          type: FormReducerType.StartLoading,
        });

        try {
          const validatedInfo = await validateSchemaAndGetData(data, schema);

          if (validatedInfo.error) {
            const errors = parseInnerErrors(validatedInfo.error.inner);

            unformRef.current?.setErrors(errors);
            return;
          }

          await onSubmit(validatedInfo.data, helpers);
        } finally {
          dispatch({
            type: FormReducerType.StopLoading,
          });
        }
      },
      [schema, state.loading, onSubmit],
    );

    const safeSubmit = useCallback(async (): Promise<void> => {
      const data = getData();

      await handleSubmit(data, unformRef.current as UnformHelpers);
    }, [getData, handleSubmit]);

    useImperativeHandle<FormHandles, FormHandles>(
      ref,
      () => ({
        getUnformRef,
        getData,
        resetErrors,
        safeSubmit,
        validate,
      }),
      [getUnformRef, getData, resetErrors, safeSubmit, validate],
    );

    const contextValue = useMemo(
      () => ({
        ...state,
        getUnformRef,
        getData,
        resetErrors,
        safeSubmit,
        validate,
      }),
      [state, getUnformRef, getData, resetErrors, safeSubmit, validate],
    );

    return (
      <FormContext.Provider value={contextValue}>
        <Unform
          {...rest}
          ref={unformRef}
          onSubmit={handleSubmit}
          initialData={initialData}
        >
          {children}
        </Unform>
      </FormContext.Provider>
    );
  },
);

Form.displayName = 'Form';
