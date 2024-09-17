import { FormReducerType, FormState, FormReducerAction } from './types';

export function reducer(
  state: FormState,
  action: FormReducerAction,
): FormState {
  switch (action.type) {
    case FormReducerType.StartLoading: {
      return {
        ...state,
        loading: true,
      };
    }
    case FormReducerType.StopLoading: {
      return {
        ...state,
        loading: false,
      };
    }
    case FormReducerType.AllEdit: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
