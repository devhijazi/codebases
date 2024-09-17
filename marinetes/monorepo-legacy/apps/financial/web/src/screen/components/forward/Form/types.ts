import type {
  FormProps as UnformProps,
  FormHandles as UnformHandles,
  FormHelpers as UnformHelpers,
} from '@unform/core';
import type { RefObject } from 'react';
import type { BaseSchema } from 'yup';

export type FormSubmit<T = any> = (data: T, helpers: UnformHelpers) => any;

export interface FormProps extends Omit<UnformProps, 'onSubmit'> {
  schema?: BaseSchema<any, any>;
  onSubmit: FormSubmit;
}

export interface FormHandles {
  getUnformRef(): RefObject<UnformHandles>;
  getData(): Record<string, any>;
  resetErrors(): void;
  safeSubmit(): Promise<void>;
  validate(): Promise<boolean>;
}

export interface FormState {
  loading: boolean;
}

export interface FormContextData extends FormState, FormHandles {}

// Reducer

type CreateAction<T extends string, P = undefined> = P extends undefined
  ? {
      type: T;
    }
  : {
      type: T;
      payload: P;
    };

export enum FormReducerType {
  AllEdit = 'ALL_EDIT',
  StopLoading = 'STOP_LOADING',
  StartLoading = 'START_LOADING',
}

export type FormReducerAction =
  | CreateAction<FormReducerType.AllEdit, Partial<FormState>>
  | CreateAction<FormReducerType.StopLoading>
  | CreateAction<FormReducerType.StartLoading>;
