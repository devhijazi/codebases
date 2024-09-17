import { environment } from './environment';

export const asaasConfig = {
  mode: environment.asaasMode,

  marinetesApiKey: environment.asaasMarinetesApiKey,
  marinetesWebhookAuthToken: environment.asaasMarinetesWebhookAuthToken,
} as const;
