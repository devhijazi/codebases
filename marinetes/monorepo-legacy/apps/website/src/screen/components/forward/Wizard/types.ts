import { RefObject } from 'react';

import { WizardEmitter } from './WizardEmitter';

export type WizardEvent = 'next' | 'previous';

export type WizardListener = () => any;

export interface WizardContextData {
  loading: boolean;
  emitter: RefObject<WizardEmitter>;
  updateLoading(loading: boolean): void;
  addListener(event: WizardEvent, listener: WizardListener): void;
  removeListener(event: WizardEvent, listener: WizardListener): void;
}
