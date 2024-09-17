import { EventEmitter } from 'events';

import type { WizardEvent, WizardListener } from './types';

export class WizardEmitter extends EventEmitter {
  public emit(event: WizardEvent): boolean {
    return super.emit(event);
  }

  public addListener(event: WizardEvent, listener: WizardListener): this {
    return super.addListener(event, listener);
  }

  public removeListener(event: WizardEvent, listener: WizardListener): this {
    return super.removeListener(event, listener);
  }
}
